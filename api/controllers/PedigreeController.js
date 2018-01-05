/**
 * PedigreeController
 * Родословные
 * @description :: Server-side logic for managing catalogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
moment.locale('ru');
module.exports = {
    /**
     * Получить объект
     * @param req
     * @param res
     */
    get: function (req, res) {
        console.log('REGGG', req.params.all());
        "use strict";
        let q = {
            limit: req.param('limit'),
            sort: req.param('sort')
        };
        if (!_.isUndefined(req.param('where')) && req.param('char').length > 1) {
            let y = {};
            y[req.param('property')] = {'like': req.param('char')};
            q.where = y;
            console.log('Запрос1: ', q);

                    Pedigree.find(q)
                        .populate('catalogs')
                        .exec((err, finds) => {
                            if (err) return res.negotiate;
                            if (!finds) return res.notFound();
                            console.log('FINDS CATALOG', finds.name);
                            (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                        });

        } else {
            if (req.param('id')) {
                q.id = req.param('id');
                console.log('Запрос2: ', q);
                Pedigree.find(q)
                    .populate('catalogs')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
                        (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                    });
            } else {
                Pedigree.find(q)
                    .populate('catalogs')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
                        console.log('ФИНДЫ', finds);
                        (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                    });
            }
        }
    },


    /**
     * Создать
     * @param req
     * @param res
     */
    create: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        /**
         * Поднимаем все первые буквы имени в верхний регистр
         */
        let name = '';
        if (_.isString(req.param('name'))) {
            name = req.param('name')
                .toLowerCase()
                .split(' ')
                .map(function (el) {
                    return el.charAt(0).toUpperCase() + el.slice(1);
                })
                .join(' ');
        }
        console.log('req.params all', req.params.all());
        if(!_.isUndefined(req.param('pedigreeNumber')) && req.param('pedigreeNumber').length <2) return res.badRequest('Pedigree не корректно введён.');

        obj = {
            action: (req.param('action')) ? req.param('action') : false,
            sales: req.param('sales'),
            salesDescription: req.param('salesDescription'),
            section: 'Родословная',
            sections: 'Родословные',
            name: name,
            avatarUrl: req.param('avatarUrl'),
            birthday: req.param('birthday'),
            nickname: req.param('nickname'),
            kennels: req.param('kennels'),
            sires: req.param('sires'),
            dams: req.param('dams'),
            gender: req.param('gender'),
            weight: req.param('weight'),
            growth: req.param('growth'),
            variety: req.param('variety'),
            color: req.param('color'),
            breeders: req.param('breeders'),
            owners: req.param('owners'),
            reactions: req.param('reactions'),
            titles: req.param('titles'),
            description: req.param('description'),
            death: req.param('death'),
            // pedigree: req.param('pedigree'),
            rkf: req.param('rkf'),
            pll: req.param('pll'),
            pra: req.param('pra'),
            dm: req.param('dm'),
            chip: req.param('chip'),
            stamp: req.param('stamp'),
            symbol: req.param('symbol'),
            alias: '' + req.param('alias'),
            timeBirthday: req.param('timeBirthday'),
            inlinePanel: req.param('inlinePanel'),
            dateWeight: req.param('dateWeight'),
            messages: [],
        };
                Pedigree.create(obj)
                    .exec(function (err, createCatalog) {
                    if (err) return res.serverError(err);
                    console.log('Собаку создал:', req.session.me);
                    console.log('Собака новая:', createCatalog);
                    console.log('ALLS', req.params.all());
                    
                    if(req.param('pedigrees')) {
                        Pedigree.create(req.param('pedigrees'))
                            .exec(function (err, createPedigree) {
                            if (err){
                                Pedigree.destroy(createCatalog.id, (err) => {
                                    if (err) return next(err);
                                    return res.serverError('Pedigree не сохранён!');
                                });
                            }else{
                                console.log('Pedigree создал:', req.session.me);
                                console.log('Pedigree новая:', createPedigree);
                                createCatalog.pedigrees= createPedigree.id;
                                createCatalog.save(function(err){
                                    if (err) { return res.serverError(err); }
                                    return res.send(createCatalog);
                                });
                            }

                        });
                    }else{
                        return res.send(createCatalog);
                    }
                });

    },


    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});

        /**
         * Поднимаем все первые буквы имени в верхний регистр
         */

        let name = '';
        if (_.isString(req.param('name'))) {
            name = req.param('name')
                .toLowerCase()
                .split(' ')
                .map(function (el) {
                    return el.charAt(0).toUpperCase() + el.slice(1);
                })
                .join(' ');
        }
        let obj = {
            id: req.param('id'),
            action: req.param('action'),
            sales: req.param('sales'),
            salesDescription: req.param('salesDescription'),
            section: 'Родословная',
            sections: 'Родословные',
            name: name,
            avatarUrl: req.param('avatarUrl'),
            birthday: req.param('birthday'),
            nickname: req.param('nickname'),
            gender: req.param('gender'),
            weight: req.param('weight'),
            growth: req.param('growth'),
            variety: req.param('variety'),
            color: req.param('color'),
            death: req.param('death'),
            // pedigrees: req.param('pedigrees'),
            rkf: req.param('rkf'),
            pll: req.param('pll'),
            pra: req.param('pra'),
            dm: req.param('dm'),
            chip: req.param('chip'),
            stamp: req.param('stamp'),
            titles: req.param('titles'),
            description: req.param('description'),
            // kennels: req.param('kennels'),
            reactions: req.param('reactions'),
            breeders: req.param('breeders'),
            owners: req.param('owners'),
            sires: req.param('sires'),
            dams: req.param('dams'),
            symbol: req.param('symbol'),
            alias: req.param('alias'),
            timeBirthday: req.param('timeBirthday'),
            inlinePanel: req.param('inlinePanel'),
            dateWeight: req.param('dateWeight'),
            messages: req.param('messages'),
        };
        // if(req.param('pedigrees')) {
        //     Pedigree.create(req.param('pedigrees')['0'])
        //         .exec(function (err, createPedigree) {
        //             if (err){
        //                 Pedigree.destroy(createCatalog.id, (err) => {
        //                     if (err) return next(err);
        //                     return res.serverError('Pedigree не сохранён!');
        //                 });
        //             }else{
        //                 console.log('Pedigree создал:', req.session.me);
        //                 console.log('Pedigree новая:', createPedigree);
        //                 createCatalog.pedigrees.add(createPedigree.id);
        //                 createCatalog.save(function(err){
        //                     if (err) { return res.serverError(err); }
        //                     return res.send(createCatalog);
        //                 });
        //             }
        //
        //         });
        // }else{
        //     return res.send(createCatalog);
        // }

        // Обновляем объект Pedigree

            // Pedigree.update({id:pediID},req.param('pedigrees'))
            //     .exec(function (err, pedigreeUpdate) {
            //         "use strict";
            //         if (err) console.log('Ошибка! Pedigree update...'); return res.negotiate(err);
            //     });
            //
            // if(req.param('pedigrees')){
            //     Pedigree.create(req.param('pedigrees'))
            //         .exec(function (err, createPedigree) {
            //             "use strict";
            //             if (err) {console.log('Ошибка! Pedigree create...'); return res.negotiate(err);}
            //             obj.pedigrees = createPedigree.id;
            //         });
            // }


        Pedigree.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            // if (err) return res.redirect('/admin/catalogs/edit/' + req.param('id'));
            if (err) return res.negotiate(err);



            Pedigree.findOne(req.param('id'))
                .exec(function (err, pedigree) {
                    if (err) return res.negotiate(err);
                    if (!pedigree) return res.notFound('Не могу');



                    // console.log('positionRemove:', req.param('positionRemove'));
                    pedigree.catalogs.add(req.param('catalog'));

                    if (req.param('objRemove')) {
                        pedigree.titles.remove(req.param('objRemove'));
                    }

                    if (req.param('objRisir')) {
                        pedigree.titles.remove(req.param('objRisir'));
                    }
                    if (req.param('objRidam')) {
                        pedigree.titles.remove(req.param('objRidam'));
                    }

                    if (req.param('objRk')) {
                        pedigree.kennels.remove(req.param('objRk'));
                    }
                    if (req.param('objDelReaction')) {
                        pedigree.reactions.remove(req.param('objDelReaction'));
                    }
                    if (req.param('objRd')) {
                        pedigree.owners.remove(req.param('objRd'));
                    }
                    if (req.param('objRm')) {
                        pedigree.breeders.remove(req.param('objRm'));
                    }


                    if (req.param('objDelete')) {
                        pedigree.photos.remove(req.param('objDelete'));
                    }

                    pedigree.save(function (err) {
                        if (err) return res.negotiate('ERR: ' + err);
                        res.ok();
                    });
                });
        });
        // });
    },


    /**
     * Удалить
     * @param req
     * @param res
     * @param next
     */
    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Pedigree.findOne(req.param('id')).exec((err, finds) => {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Pedigree.destroy(req.param('id'), (err) => {
                if (err) return next(err);
                console.log('Родословную удалил:', req.session.me);
                console.log('Родословная удалёна:', finds);
                res.ok();
            });
        });

        // res.redirect('/admin/users');
    },


    /**
     * Загрузка аватара на сервер
     * @param req
     * @param res
     */
    upload: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        let path = '/images/catalog/pedigrees';
        //console.log('formData: ', req.body);
        const dir = require('util').format('%s' + path + '/%s', sails.config.appUrl.rootDir, req.body.id);
        let fileName = req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
        console.log('fileName', fileName);
        console.log('dir', dir);
        req.file('file').upload({
                dirname: dir,
                saveAs: fileName
            },
            function (err, files) {
                console.log('err', err);
                console.log('files', files);
                if (err) return res.serverError(err);
                if (_.isUndefined(files[0])) return res.notFound('Нет файла!');

                Pedigree.update(req.body.id, {
                    avatarUrl: require('util').format(path + '/%s/%s', req.body.id, fileName),
                    avatarFd: files[0].fd,
                    fileNameAvatar: fileName
                })
                    .exec(function (err) {
                        if (err) return res.negotiate(err);
                        //console.log(' avatarUrl: ', dir);
                        //console.log(' avatarUrl2: ', require('util').format('/images/pedigree/avatar/%s/%s', req.body.id, fileName));
                        return res.ok();
                    });
            });
    },


};

