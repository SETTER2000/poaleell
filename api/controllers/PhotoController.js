/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Получить
     * @param req
     * @param res
     */
    get: function (req, res) {
        "use strict";
        // if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        console.log('req.body:', req.body);
        Photo.find(req.param('id'))
            .populate('titles')
            .populate('catalogs')
            .populate('pedigrees')
            .populate('reactions')
            .exec((err, findItems) => {
                if (err) return res.negotiate;
                if (!findItems) return res.notFound();
                console.log('GET photo:', findItems);
                // return res.redirect('/admin/users/edit/' + req.param('id'));
                // return res.backToHomePage();
                //return res.redirect('/admin/users/edit/' + req.param('id'));
                (req.param('id')) ? res.ok(findItems[0]) : res.ok(findItems);
            });
    },


    /**
     * Создать
     * @param req
     * @param res
     */
    create: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        let obj = {
            action: req.param('action'),
            section: 'Фотография',
            sections: 'Фотографии',
            name: req.param('name'),
            photoUrl: '',
            photoFd: '',
            fileNamePhoto: '',

            catalogs: req.param('catalogs'),
            description: req.param('description'),
            descriptionEn: req.param('descriptionEn')
        };
        Photo.create(obj).exec(function updateObj(err, objEdit) {
            if (err) return res.negotiate(err);
            console.log('Фото создал:', req.session.me);
            console.log('Фото созданное:', obj);
            res.ok();
        })
    },


    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});

        console.log('ALL params: ', req.params.all());


        /**
         * Поднимаем все первые буквы имени в верхний регистр
         */
            // let name = '';
            // if (_.isString(req.param('name'))) {
            //     name = req.param('name')
            //         .toLowerCase()
            //         .split(' ')
            //         .map(function (el) {
            //             return el.charAt(0).toUpperCase() + el.slice(1);
            //         })
            //         .join(' ');
            // }
            // console.log('req.params all', req.params.all());
            // if(!_.isUndefined(req.param('pedigreeNumber')) && req.param('pedigreeNumber').length <2) return res.badRequest('Photo не корректно введён.');

        let obj = {
                id: req.param('id'),
                action: (req.param('action') && (req.param('action') !== 'undefined')) ? req.param('action') : false,
                sales: req.param('sales'),
                salesDescription: req.param('salesDescription'),
                name: req.param('name'),
                // birthday: req.param('birthday'),
                // nickname: req.param('nickname'),
                // sires: req.param('sires'),
                catalogs: req.param('catalogs'),
                // gender: req.param('gender'),
                // weight: req.param('weight'),
                // growth: req.param('growth'),
                // variety: req.param('variety'),
                // color: req.param('color'),
                // breeders: req.param('breeders'),
                // owners: req.param('owners'),
                reactions: req.param('reactions'),
                titles: req.param('titles'),
                description: req.param('description'),
                descriptionEn: req.param('descriptionEn'),
                // death: req.param('death'),
                // rkf: req.param('rkf'),
                // pll: req.param('pll'),
                // pra: req.param('pra'),
                // dm: req.param('dm'),
                // chip: req.param('chip'),
                // stamp: req.param('stamp'),
                // symbol: req.param('symbol'),
                alias: '' + req.param('alias'),
                // timeBirthday: req.param('timeBirthday'),
                inlinePanel: req.param('inlinePanel'),
                // dateWeight: req.param('dateWeight'),
            };

        function uploadFoto(object) {
            const mediaFile = req.file('file');
            if (!mediaFile._files[0]) {
                sails.log.warn('No file uploaded');
                clearTimeout(mediaFile.timeouts.untilMaxBufferTimer);
                clearTimeout(mediaFile.timeouts.untilFirstFileTimer);
                return res.send('no file given!');
            }
            let path = '/images/photos';
            const dir = require('util').format('%s' + path + '/%s', sails.config.appUrl.rootDir, object.id);
            let fileName = req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
            if(!fileName) return res.badRequest('Нет имени файла картинки.');
            // console.log('fileName', fileName);
            // console.log('dir', dir);
            req.file('file').upload({
                    dirname: dir,
                    saveAs: fileName
                },
                function (err, files) {
                    if (err) return res.serverError(err);
                    if (_.isUndefined(files[0])) return res.notFound('Нет файла!');
                    // console.log('*********** updatePhoto' , updatePhoto);
                    object.photoUrl = require('util').format(path + '/%s/%s', object.id, fileName);
                    object.photoFd = files[0].fd;
                    object.fileNamePhoto = fileName;
                    object.save((err) => {
                        "use strict";
                        if (err) return res.serverError();
                        // console.log('Обновлено.', createPhoto);
                        return res.ok();
                    });
                });
        }

        if (req.param('id')) {
            Photo.update(req.param('id'), obj)
                .exec((err, updatePhoto) => {
                    if (err) return res.negotiate(err);
                    if (!updatePhoto.length) return res.badRequest('Не смог добавить фото.');
                    console.log('*++++++++++++++++ updatePhoto[0]', updatePhoto[0]);
                    uploadFoto(updatePhoto[0]);
                });
        } else {
            Catalog.findOne({id: obj.catalogs})
                .populate('photos')
                .exec((err, findItem) => {
                "use strict";
                if (err) return res.negotiate(err);
                if (!findItem) return res.badRequest('Не найдена собака в каталоге, для привязки фото. Привяжите фото к какому-то объекту.');
                Photo.create(obj).exec((err, createPhoto) => {
                    "use strict";
                    if (err) return res.negotiate(err);
                    // console.log('*------------- createPhoto', createPhoto);

                    findItem.photos.add(createPhoto.id);
                    findItem.save((err) => {
                        if (err) return res.negotiate(err);
                        uploadFoto(createPhoto);
                    });
                });
            });
        }
    },

    /**
     * Удалить
     * @param req
     * @param res
     * @param next
     */
    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Photo.findOne(req.param('id')).exec((err, finds) => {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Photo.destroy(req.param('id'), (err) => {
                if (err) return next(err);
                console.log('Фото удалил:', req.session.me);
                console.log('Фото удалено:', finds);
                res.ok();
            });
        });

        // res.redirect('/admin/users');
    },

    /**
     * Загрузка фото титулов на сервер
     * @param req
     * @param res
     */
    uploadTitlePhoto: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        console.log('REG PARAMS ALL: ', req.params.all());
        const dir = require('util').format('%s/images/catalog/titles/%s', sails.config.appUrl.rootDir, req.body.id);
        let fileName = req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
        req.file('file').upload({
                dirname: dir,
                saveAs: fileName
            },
            function (err, files) {
                if (err) return res.serverError(err);
                if (_.isUndefined(files[0])) return res.notFound('Нет файла!');
                Catalog.findOne({
                    id: req.param('id')
                }).exec(function (err, foundDog) {
                    if (err) return res.negotiate;
                    if (!foundDog) return res.notFound();
                    Title.findOne({
                        id: req.param('idTitle')
                    }).exec(function (err, foundTitle) {
                        if (err) return res.negotiate;
                        if (!foundTitle) return res.notFound();
                        Photo.create({
                            photoUrl: require('util').format('/images/catalog/titles/%s/%s', foundDog.id, fileName),
                            photoFd: files[0].fd,
                            fileNamePhoto: fileName,
                            titles: foundTitle.id,
                            catalogs: foundDog.id
                            // name: req.param('name')
                        }).exec(function (err, createPhoto) {
                            if (err) return res.negotiate(err);
                            console.log('Фото создано', createPhoto);
                            return res.send(createPhoto);
                        });
                    });
                });
                // Catalog.update(req.body.id, {
                //     avatarUrl: require('util').format('/images/catalog/titles/%s/%s', req.body.id, fileName),
                //     avatarFd: files[0].fd,
                //     fileNameAvatar: fileName
                // })
                //     .exec(function (err) {
                //         if (err) return res.negotiate(err);
                //         //console.log(' avatarUrl: ', dir);
                //         //console.log(' avatarUrl2: ', require('util').format('/images/catalog/avatar/%s/%s', req.body.id, fileName));
                //         return res.ok();
                //     });
            });
    },


    /**
     * Загрузка фото тестов на сервер
     * @param req
     * @param res
     */
    uploadReactionPhoto: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // console.log('RRRRRRRRRRRRRRRRRRRR: ', req.file('file'));

        const dir = require('util').format('%s/images/catalog/reactions/%s', sails.config.appUrl.rootDir, req.body.id);
        let fileName = req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
        // console.log('fileName', fileName);
        // console.log('dir', dir);
        req.file('file').upload({
                dirname: dir,
                saveAs: fileName
            },
            function (err, files) {
                // console.log('err', err);
                // console.log('files', files);
                if (err) return res.serverError(err);
                if (_.isUndefined(files[0])) return res.notFound('Нет файла!');
                //if (files.length === 0) {
                //    return res.badRequest('Файл не загружен');
                //}
                //console.log("files: ", files);

                Catalog.findOne({
                    id: req.param('id')
                }).exec(function (err, foundDog) {
                    if (err) return res.negotiate;
                    if (!foundDog) return res.notFound();


                    Reaction.findOne({
                        id: req.param('idReaction')
                    }).exec(function (err, foundReaction) {
                        if (err) return res.negotiate;
                        if (!foundReaction) return res.notFound();

                        Photo.create({
                            photoUrl: require('util').format('/images/catalog/reactions/%s/%s', foundDog.id, fileName),
                            photoFd: files[0].fd,
                            fileNamePhoto: fileName,
                            catalogs: foundDog.id,
                            reactions: foundReaction.id
                        }).exec(function (err, createPhoto) {
                            if (err) return res.negotiate(err);

                            return res.ok();
                        });
                    });

                });
                // Catalog.update(req.body.id, {
                //     avatarUrl: require('util').format('/images/catalog/titles/%s/%s', req.body.id, fileName),
                //     avatarFd: files[0].fd,
                //     fileNameAvatar: fileName
                // })
                //     .exec(function (err) {
                //         if (err) return res.negotiate(err);
                //         //console.log(' avatarUrl: ', dir);
                //         //console.log(' avatarUrl2: ', require('util').format('/images/catalog/avatar/%s/%s', req.body.id, fileName));
                //         return res.ok();
                //     });
            }
        )
        ;
    },

    /**
     * Загрузка фото родословной на сервер
     * @param req
     * @param res
     */
    uploadPedigreePhoto: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // console.log('req.file(file).: ', req.file('file'));
        console.log('uploadPedigreePhoto: ', req.params.all());
        const dir = require('util').format('%s/images/catalog/pedigrees/%s', sails.config.appUrl.rootDir, req.body.id);
        let fileName = req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
        req.file('file').upload({
                dirname: dir,
                saveAs: fileName
            },
            function (err, files) {
                if (err) return res.serverError(err);
                if (_.isUndefined(files[0])) return res.notFound('Нет файла!');
                Catalog.findOne({id: req.param('id')})
                    .populate('pedigrees')
                    .exec(function (err, foundDog) {
                        if (err) return res.negotiate;
                        if (!foundDog) return res.notFound();
                        console.log('FFFFFFFFFFFFF', foundDog);

                        foundDog.pedigrees.add(req.param('idPedigree'));
                        foundDog.save(function (err) {
                            console.log('Catalog with ID ' + getOneRecord.id + ' now has name ' + getOneRecord.name);
                        });

                        Photo.destroy({pedigrees: req.param('idPedigree')}).exec((err) => {
                            if (err) return res.serverError(err);
                            "use strict";
                            Photo.create({
                                photoUrl: require('util').format('/images/catalog/pedigrees/%s/%s', foundDog.id, fileName),
                                photoFd: files[0].fd,
                                fileNamePhoto: fileName,
                                catalogs: foundDog.id,
                                pedigrees: req.param('idPedigree')
                            }).exec(function (err, createPhoto) {
                                if (err) return res.negotiate(err);
                                return res.ok();
                            });
                        });
                    });
            }
        );
    }
};

