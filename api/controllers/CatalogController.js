/**
 * CatalogController
 *
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
var error = {
    date: moment().format('LLLL'),
    name: 'Имя не заполнено.',
    kennel: 'Питомник не заполнен. backend',
    gender: 'Пол не заполнен.',
    birthday: 'ДР не заполнен.',
    death: 'Дата смерти не число.',
    weight: 'Вес не заполнен.',
    growth: 'Рост не заполнен.',
    variety: 'Тип не заполнен.',
    color: 'Окрас не может отсутствовать.',
    colorBad: 'Окрас не соответствует стандарту.',
    breeder: 'Заводчик не заполнен.',
    owner: 'Владелец не заполнен.',
};

var price = [
        {
            "how": 1000,
            "max": 200000,
            "min": 1000,
            "step": 1000,
            "name": "rub",
            "title": "рубль",
            "isDisabled": false
        },
        {
            "how": 10,
            "max": 3000,
            "min": 10,
            "step": 10,
            "name": "usd",
            "title": "dollar",
            "isDisabled": false
        },
        {
            "how": 10,
            "max": 2500,
            "min": 10,
            "step": 10,
            "name": "euro",
            "title": "euro",
            "isDisabled": false
        }
    ];
module.exports = {
    /**
     * Получить объект
     * @param req
     * @param res
     */
    get: function (req, res) {
        "use strict";
        // if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // console.log("REQUEST BODY CATALOG:", req.body);
        // console.log("REQUEST BODY CATALOG:", req.param('char'));
        // console.log("REQUEST where CATALOG:", req.param('where'));
        // console.log("REQUEST sort CATALOG:", req.param('sort'));
        // console.log("REQUEST limit CATALOG:", req.param('limit'));
        let q = {
            limit: req.param('limit'),
            sort: req.param('sort')
        };

        if (!_.isUndefined(req.param('where')) && req.param('char').length > 1) {
            let y = {};
            y[req.param('property')] = {'like': req.param('char')};
            q.where = y;
            console.log('Запрос1: ', q);

            Department.find(q)
                .populate('catalogs')
                .exec((err, findDepartment) => {
                    if (err) return res.negotiate;
                    if (!findDepartment) return res.notFound();
                    // console.log('findDepartment:', findDepartment);

                    let array = [];
                    _.forEach(findDepartment, function (val, key) {
                        console.log('VALLLLLLLLLLLL: ', val.catalogs[0].id);
                        _.forEach(val.catalogs, function (v, k) {
                            array.push({id: v.id});
                        });

                    });
                    console.log('ARRAY', array);
                    Catalog.find(array)
                        .populate('titles')
                        .populate('kennels')
                        .populate('owners')
                        .populate('breeders')
                        .populate('photos')
                        .populate('reactions')
                        .populate('sires')
                        .populate('dams')
                        .populate('diarys')
                        .exec((err, finds) => {
                            if (err) return res.negotiate;
                            if (!finds) return res.notFound();
                            console.log('FINDS CATALOG', finds.name);
                            // return res.redirect('/admin/users/edit/' + req.param('id'));
                            // return res.backToHomePage();
                            //return res.redirect('/admin/users/edit/' + req.param('id'));


                            (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                        });
                });
        } else {
            if (req.param('id')) {
                q.id = req.param('id');
                // console.log('Запрос2: ', q);
                Catalog.find(q)
                    .populate('titles')
                    .populate('kennels')
                    .populate('owners')
                    .populate('breeders')
                    .populate('photos')
                    .populate('reactions')
                    .populate('sires')
                    .populate('dams')
                    .populate('diarys')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
                        (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                    });
            } else {
                Catalog.find(q)
                    .populate('titles')
                    .populate('kennels')
                    .populate('owners')
                    .populate('breeders')
                    .populate('photos')
                    .populate('reactions')
                    .populate('sires')
                    .populate('dams')
                    .populate('diarys')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
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



        obj = {
            action: (req.param('action')) ? req.param('action') : false,
            sales: req.param('sales'),
            salesDescription: req.param('salesDescription'),
            price: price,
            section: 'Каталог',
            sections: 'Каталоги',
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
        Department.findOne(req.param('kennels'))
            .populate('catalogs', {
                where: {
                    name: name
                },
                limit: 1
            })
            .exec((err, findDepartment) => {
                "use strict";
                if (err) return res.serverError(err);
                if (findDepartment.catalogs.length) return res.badRequest('Объект уже существует.');
                Catalog.create(obj)
                    .exec(function (err, createCatalog) {
                    if (err) return res.serverError(err);
                    console.log('Собаку создал:', req.session.me);
                    console.log('Собака новая:', createCatalog);
                    console.log('ALLS', req.params.all());

                        return res.send(createCatalog);
                });
            });
    },


    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // if (!_.isString(req.param('name'))) {
        //     console.log(error.date, error.name);
        //     return res.badRequest(error.name);
        // }
        // if (!_.isString(req.param('kennel'))) {
        //     console.log(error.date, error.kennel);
        //     return res.badRequest(error.kennel);
        // }
        // if (!_.isString(req.param('birthday'))) {
        //     console.log(error.date, error.birthday);
        //     return res.badRequest(error.birthday);
        // }
        // if (!_.isString(req.param('gender'))) {
        //     console.log(error.date, error.gender);
        //     return res.badRequest(error.gender);
        // }
        // if (!_.isNumber(req.param('weight'))) {
        //     console.log('req.paramw', req.param('weight'));
        //     console.log(error.date, error.weight);
        //     return res.badRequest(error.weight);
        // }
        // if (!_.isNumber(req.param('growth'))) {
        //     console.log(error.date, error.growth);
        //     return res.badRequest(error.growth);
        // }
        // if (!_.isString(req.param('variety'))) {
        //     console.log(error.date, error.variety);
        //     return res.badRequest(error.variety);
        // }
        // let i = 0;
        // if (_.isString(req.param('color'))) {
        //     _.forEach(objectColor, function (value, key) {
        //         if (key == req.param('color')) i++;
        //     });
        //     if (!i) return res.badRequest(error.colorBad);
        // } else {
        //     console.log(error.date, error.color);
        //     return res.badRequest(error.color);
        // }
        // if (!_.isString(req.param('breeder'))) {
        //     console.log(error.date, error.breeder);
        //     return res.badRequest(error.breeder);
        // }
        // let alias = req.param('alias');
        // if (!_.isString(alias)) {
        //     console.log('ALIAS no staring: ', req.param('alias'));
        //     return res.badRequest(error.owner);
        //     alias = '"' + req.param('alias') + '"';
        // }
        // console.log('UPDATE: ', req.body);


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
            price: req.param('price'),
            section: 'Каталог',
            sections: 'Каталоги',
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
        //                 Catalog.destroy(createCatalog.id, (err) => {
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
        // let pediID= req.param('pedigrees')['id'];
        // if(pediID) {
        //     Pedigree.update({id:pediID},req.param('pedigrees'))
        //         .exec(function (err, pedigreeUpdate) {
        //             "use strict";
        //             if (err) console.log('Ошибка! Pedigree update...'); return res.negotiate(err);
        //         });
        // }else{
        //     if(req.param('pedigrees')){
        //         Pedigree.create(req.param('pedigrees'))
        //             .exec(function (err, createPedigree) {
        //                 "use strict";
        //                 if (err) {console.log('Ошибка! Pedigree create...'); return res.negotiate(err);}
        //                 obj.pedigrees = createPedigree.id;
        //             });
        //     }
        // }

        Catalog.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            // if (err) return res.redirect('/admin/catalogs/edit/' + req.param('id'));
            if (err) return res.negotiate(err);
            // console.log('Каталог обновил:', req.session.me);
            // console.log('Собака обновление:', obj);
            // console.log('req.body: ', req.body);
            Catalog.findOne(req.param('id'))
                .populate('titles')
                .populate('sires')
                .populate('dams')
                .populate('kennels')
                .populate('photos')
                .populate('reactions')
                .populate('owners')
                .populate('breeders')
                .exec(function (err, catalog) {
                    if (err) return res.negotiate(err);
                    if (!catalog) return res.notFound('Не могу');



                    // console.log('positionRemove:', req.param('positionRemove'));
                    catalog.titles.add(req.param('titles'));

                    if (req.param('objRemove')) {
                        catalog.titles.remove(req.param('objRemove'));
                    }

                    if (req.param('objRisir')) {
                        catalog.titles.remove(req.param('objRisir'));
                    }
                    if (req.param('objRidam')) {
                        catalog.titles.remove(req.param('objRidam'));
                    }

                    if (req.param('objRk')) {
                        catalog.kennels.remove(req.param('objRk'));
                    }
                    if (req.param('objDelReaction')) {
                        catalog.reactions.remove(req.param('objDelReaction'));
                    }
                    if (req.param('objRd')) {
                        catalog.owners.remove(req.param('objRd'));
                    }
                    if (req.param('objRm')) {
                        catalog.breeders.remove(req.param('objRm'));
                    }


                    if (req.param('objDelete')) {
                        catalog.photos.remove(req.param('objDelete'));
                    }

                    catalog.save(function (err) {
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
        Catalog.findOne(req.param('id')).exec((err, finds) => {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Catalog.destroy(req.param('id'), (err) => {
                if (err) return next(err);
                console.log('Собаку удалил:', req.session.me);
                console.log('Собака удалён:', finds);
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
        let path = '/images/catalog/dogs';
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

                Catalog.update(req.body.id, {
                    avatarUrl: require('util').format(path + '/%s/%s', req.body.id, fileName),
                    avatarFd: files[0].fd,
                    fileNameAvatar: fileName
                })
                    .exec(function (err) {
                        if (err) return res.negotiate(err);
                        //console.log(' avatarUrl: ', dir);
                        //console.log(' avatarUrl2: ', require('util').format('/images/catalog/avatar/%s/%s', req.body.id, fileName));
                        return res.ok();
                    });
            });
    },


};

