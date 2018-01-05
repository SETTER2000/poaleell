/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        "use strict";
        // if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        console.log('req.body:', req.body);
        Photo.find(req.param('id'))
            .populate('titles')
            .populate('catalogs')
            .exec((err, title) => {
                if (err) return res.negotiate;
                if (!title) return res.notFound();

                // return res.redirect('/admin/users/edit/' + req.param('id'));
                // return res.backToHomePage();
                //return res.redirect('/admin/users/edit/' + req.param('id'));
                (req.param('id')) ? res.ok(title[0]) : res.ok(title);
            });
    },
    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        let obj = {
            action: req.param('action'),
            id: req.param('id'),
            section: req.param('section'),
            sections: req.param('sections'),
            name: req.param('name'),
            description: req.param('description'),
            descriptionEn: req.param('descriptionEn')
        };
        Photo.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            if (err) return res.negotiate(err);
            console.log('Фото обновил:', req.session.me);
            console.log('Фото обновление:', obj);
            res.ok();
        })
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
        console.log('SSSSSSxXXZZZ: ', req.body);
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
                        foundDog.save( function(err){
                            console.log('Catalog with ID '+getOneRecord.id+' now has name '+getOneRecord.name);
                        });

                        Photo.destroy({pedigrees:req.param('idPedigree')}).exec((err)=>{
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

