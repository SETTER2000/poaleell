/**
 * CatalogController
 *
 * @description :: Server-side logic for managing catalogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
moment.locale('ru');
var error = {
    date: moment().format('LLLL'),
    name: 'Имя не заполнено.',
    kennel: 'Питомник не заполнен.',
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
var objectColor = {
    'Бело-бронзовый': 'Бело-бронзовый',
    'Бело-голубой': 'Бело-голубой',
    'Бело-кремовый': 'Бело-кремовый',
    'Бело-черный': 'Бело-черный',
    'Бело-шоколадный': 'Бело-шоколадный',
    'Белый': 'Белый',
    'Бронзово-белый': 'Бронзово-белый',
    'Бронзовый': 'Бронзовый',
    'Голубо-белый': 'Голубо-белый',
    'Голубой': 'Голубой',
    'Кремово-белый': 'Кремово-белый',
    'Кремовый': 'Кремовый',
    'Муругий(соболинный)': 'Муругий(соболинный)',
    'Трёхцветный': 'Трёхцветный',
    'Чёрно-белый': 'Чёрно-белый',
    'Чёрно-подпалый': 'Чёрно-подпалый',
    'Чёрный': 'Чёрный',
    'Шоколадно-белый': 'Шоколадно-белый',
    'Шоколадно-подпалый': 'Шоколадно-подпалый',
    'Шоколадный': 'Шоколадный'
};
module.exports = {
    /**
     * Получить объект
     * @param req
     * @param res
     */
    get: function (req, res) {
        "use strict";
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Catalog.find(req.param('id'))
            .populate('titles')
            .exec((err, finds) => {
            if (err) return res.negotiate;
            if (!finds) return res.notFound();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
        });
    },


    /**
     * Создать
     * @param req
     * @param res
     */
    create: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});

        if (!_.isString(req.param('name'))) {
            console.log(error.date, error.name);
            return res.badRequest(error.name);
        }
        if (!_.isString(req.param('kennel'))) {
            console.log(error.date, error.kennel);
            return res.badRequest(error.kennel);
        }
        if (!_.isString(req.param('birthday'))) {
            console.log(error.date, error.birthday);
            return res.badRequest(error.birthday);
        }
        if (!_.isString(req.param('gender'))) {
            console.log(error.date, error.gender);
            return res.badRequest(error.gender);
        }
        if (!_.isNumber(req.param('weight'))) {
            console.log('req.paramw', req.param('weight'));
            console.log(error.date, error.weight);
            return res.badRequest(error.weight);
        }
        if (!_.isNumber(req.param('growth'))) {
            console.log(error.date, error.growth);
            return res.badRequest(error.growth);
        }
        if (!_.isString(req.param('variety'))) {
            console.log(error.date, error.variety);
            return res.badRequest(error.variety);
        }
        let i = 0;
        if (_.isString(req.param('color'))) {
            _.forEach(objectColor, function (value, key) {
                if (key == req.param('color')) i++;
            });
            if (!i) return res.badRequest(error.colorBad);
        } else {
            console.log(error.date, error.color);
            return res.badRequest(error.color);
        }
        if (!_.isString(req.param('breeder'))) {
            console.log(error.date, error.breeder);
            return res.badRequest(error.breeder);
        }
        if (!_.isString(req.param('owner'))) {
            console.log(error.date, error.owner);
            return res.badRequest(error.owner);
        }
        var obj = {
            action: (req.param('action')) ? req.param('action') : false,
            section: 'Каталог',
            sections: 'Каталоги',
            name: req.param('name'),
            avatarUrl: req.param('avatarUrl'),
            birthday: req.param('birthday'),
            nickname: req.param('nickname'),
            kennel: req.param('kennel'),
            gender: req.param('gender'),
            weight: req.param('weight'),
            growth: req.param('growth'),
            variety: req.param('variety'),
            color: req.param('color'),
            breeder: req.param('breeder'),
            owner: req.param('owner'),
            death: req.param('death'),
            pedigree: req.param('pedigree'),
            rkf: req.param('rkf'),
            pll: req.param('pll'),
            pra: req.param('pra'),
            dm: req.param('dm'),
            chip: req.param('chip'),
            stamp: req.param('stamp'),
        };

        Catalog.create(obj).exec(function (err, finn) {
            if (err) return res.serverError(err);
            console.log('Соаку создал:', req.session.me);
            console.log('Собака новая:', finn);
            return res.send(finn);
        });
    },


    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if (!_.isString(req.param('name'))) {
            console.log(error.date, error.name);
            return res.badRequest(error.name);
        }
        if (!_.isString(req.param('kennel'))) {
            console.log(error.date, error.kennel);
            return res.badRequest(error.kennel);
        }
        if (!_.isString(req.param('birthday'))) {
            console.log(error.date, error.birthday);
            return res.badRequest(error.birthday);
        }
        if (!_.isString(req.param('gender'))) {
            console.log(error.date, error.gender);
            return res.badRequest(error.gender);
        }
        if (!_.isNumber(req.param('weight'))) {
            console.log('req.paramw', req.param('weight'));
            console.log(error.date, error.weight);
            return res.badRequest(error.weight);
        }
        if (!_.isNumber(req.param('growth'))) {
            console.log(error.date, error.growth);
            return res.badRequest(error.growth);
        }
        if (!_.isString(req.param('variety'))) {
            console.log(error.date, error.variety);
            return res.badRequest(error.variety);
        }
        let i = 0;
        if (_.isString(req.param('color'))) {
            _.forEach(objectColor, function (value, key) {
                if (key == req.param('color')) i++;
            });
            if (!i) return res.badRequest(error.colorBad);
        } else {
            console.log(error.date, error.color);
            return res.badRequest(error.color);
        }
        if (!_.isString(req.param('breeder'))) {
            console.log(error.date, error.breeder);
            return res.badRequest(error.breeder);
        }
        if (!_.isString(req.param('owner'))) {
            console.log(error.date, error.owner);
            return res.badRequest(error.owner);
        }
        var obj = {
            id: req.param('id'),
            action: req.param('action'),
            section: 'Раздел',
            sections: 'Разделы',
            name: req.param('name'),
            avatarUrl: req.param('avatarUrl'),
            birthday: req.param('birthday'),
            nickname: req.param('nickname'),
            kennel: req.param('kennel'),
            gender: req.param('gender'),
            weight: req.param('weight'),
            growth: req.param('growth'),
            variety: req.param('variety'),
            color: req.param('color'),
            breeder: req.param('breeder'),
            owner: req.param('owner'),
            death: req.param('death'),
            pedigree: req.param('pedigree'),
            rkf: req.param('rkf'),
            pll: req.param('pll'),
            pra: req.param('pra'),
            dm: req.param('dm'),
            chip: req.param('chip'),
            stamp: req.param('stamp'),
            titles: req.param('titles'),
        };
        Catalog.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            if (err)return res.redirect('/admin/catalogs/edit/' + req.param('id'));
            console.log('Каталог обновил:', req.session.me);
            console.log('Собака обновление:', obj);
            Catalog.findOne(req.param('id'))
                .populate('titles')
                .exec(function (err, catalog) {
                    if (err) return res.negotiate(err);
                    if (!catalog) return res.notFound('Не могу');

                    // console.log('positionRemove:', req.param('positionRemove'));
                    catalog.titles.add(req.param('titles'));
                    // catalog.furloughs.add(req.param('furloughs'));

                    // if (_.isEmpty(req.param('position'))) {
                    //     catalog.titles.add({})
                    // }
                    if (req.param('objRemove')) {
                        catalog.titles.remove(req.param('objRemove'));
                    }
                    // if (req.param('furloughRemove')) {
                    //     catalog.furloughs.remove(req.param('furloughRemove'));
                    // }
                    catalog.save(function (err) {
                        if (err) return res.negotiate('ERR: ' + err);
                        res.ok();
                    });
                });
        })
    },


    /**
     * Удалить
     * @param req
     * @param res
     * @param next
     */
    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Catalog.findOne(req.param('id')).exec((err, finds)=> {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Catalog.destroy(req.param('id'), (err) => {
                if (err)return next(err);
                console.log('Отпуск удалил:', req.session.me);
                console.log('Отпуск удалён:', finds);
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
        //console.log('formData: ', req.body);
        const dir = require('util').format('%s/images/catalog/dogs/%s', sails.config.appUrl.rootDir, req.body.id);
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
                //if (files.length === 0) {
                //    return res.badRequest('Файл не загружен');
                //}
                //console.log("files: ", files);

                Catalog.update(req.body.id, {
                    avatarUrl: require('util').format('/images/catalog/dogs/%s/%s', req.body.id, fileName),
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
    }
};
