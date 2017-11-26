/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
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
        "use strict";
        // if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // console.log("REQUEST BODY MESSAGE:", req.body);
        // console.log("REQUEST BODY MESSAGE:", req.param('char'));
        // console.log("REQUEST where MESSAGE:", req.param('where'));
        // console.log("REQUEST sort MESSAGE:", req.param('sort'));
        // console.log("REQUEST limit MESSAGE:", req.param('limit'));
        let q = {
            limit: req.param('limit'),
            sort: req.param('sort')
        };

        if (!_.isUndefined(req.param('where')) && req.param('char').length > 1) {
            let y = {};
            y[req.param('property')] = {'like': req.param('char')};
            q.where = y;
            console.log('Запрос1: ', q);

            Message.find(q)
                .populate('messages')
                .exec((err, findDepartment) => {
                    if (err) return res.negotiate;
                    if (!findDepartment) return res.notFound();
                    // console.log('findDepartment:', findDepartment);

                    let array = [];
                    _.forEach(findDepartment, function (val, key) {
                        _.forEach(val.messages, function (v, k) {
                            array.push({id: v.id});
                        });

                    });
                    console.log('ARRAY', array);
                    Message.find(array)
                        .populate('senderUsers')
                        .populate('recipientUsers')
                        .exec((err, finds) => {
                            if (err) return res.negotiate;
                            if (!finds) return res.notFound();
                            console.log('FINDS MESSAGE', finds.name);
                            // return res.redirect('/admin/users/edit/' + req.param('id'));
                            // return res.backToHomePage();
                            //return res.redirect('/admin/users/edit/' + req.param('id'));


                            (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                        });
                });
        } else {
            if (req.param('id')) {
                q.id = req.param('id');
                console.log('Запрос2: ', q);
                Message.find(q)
                    .populate('senderUsers')
                    .populate('recipientUsers')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
                        // console.log('FINDS MESSAGE', finds.name);
                        // return res.redirect('/admin/users/edit/' + req.param('id'));
                        // return res.backToHomePage();
                        //return res.redirect('/admin/users/edit/' + req.param('id'));


                        (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
                    });
            } else {
                Message.find(q)
                    .populate('senderUsers')
                    .populate('recipientUsers')
                    .exec((err, finds) => {
                        if (err) return res.negotiate;
                        if (!finds) return res.notFound();
                        // console.log('FINDS MESSAGE', finds.name);
                        // return res.redirect('/admin/users/edit/' + req.param('id'));
                        // return res.backToHomePage();
                        //return res.redirect('/admin/users/edit/' + req.param('id'));


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

        obj = {
            action: (req.param('action')) ? req.param('action') : false,
            section: 'Сообщение',
            sections: 'Сообщения',
            feedback: 'lphp@mail.ru',
            message: req.param('message'),
            senderUsers:  req.session.me,
            recipientUsers:  req.param('recipientUsers'),
        };

                Message.create(obj).exec(function (err, createMessage) {
                    if (err) return res.serverError(err);
                    console.log('Сообщение создал:', req.session.me);
                    console.log('Сообщение новое:', createMessage);
                    return res.send(createMessage);
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
        // console.log('KENNELS', req.param('kennels'));
        // console.log('BREEDER: ', req.param('breeder'));
        // console.log('OWNER: ', req.param('owner'));


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
            pedigree: req.param('pedigree'),
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


        Message.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            // if (err) return res.redirect('/admin/messages/edit/' + req.param('id'));
            if (err) return res.negotiate(err);
            console.log('Каталог обновил:', req.session.me);
            console.log('Собака обновление:', obj);
            console.log('inlinePanel: ', req.param('inlinePanel'));
            // console.log('req.body: ', req.body);
            Message.findOne(req.param('id'))
                .populate('senderUsers')
                .populate('recipientUsers')
                .exec(function (err, message) {
                    if (err) return res.negotiate(err);
                    if (!message) return res.notFound('Не могу');

                    // console.log('positionRemove:', req.param('positionRemove'));
                    message.titles.add(req.param('titles'));
                    // message.kennels.add(req.param('kennels'));
                    // message.furloughs.add(req.param('furloughs'));

                    // if (_.isEmpty(req.param('position'))) {
                    //     message.titles.add({})
                    // }
                    if (req.param('objRemove')) {
                        message.titles.remove(req.param('objRemove'));
                    }

                    if (req.param('objRisir')) {
                        message.titles.remove(req.param('objRisir'));
                    }
                    if (req.param('objRidam')) {
                        message.titles.remove(req.param('objRidam'));
                    }

                    if (req.param('objRk')) {
                        message.kennels.remove(req.param('objRk'));
                    }
                    if (req.param('objDelReaction')) {
                        message.reactions.remove(req.param('objDelReaction'));
                    }
                    if (req.param('objRd')) {
                        message.owners.remove(req.param('objRd'));
                    }
                    if (req.param('objRm')) {
                        message.breeders.remove(req.param('objRm'));
                    }


                    if (req.param('objDelete')) {
                        message.photos.remove(req.param('objDelete'));
                    }

                    message.save(function (err) {
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
        Message.findOne(req.param('id')).exec((err, finds) => {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Message.destroy(req.param('id'), (err) => {
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
        let path = '/images/message/dogs';
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

                Message.update(req.body.id, {
                    avatarUrl: require('util').format(path + '/%s/%s', req.body.id, fileName),
                    avatarFd: files[0].fd,
                    fileNameAvatar: fileName
                })
                    .exec(function (err) {
                        if (err) return res.negotiate(err);
                        //console.log(' avatarUrl: ', dir);
                        //console.log(' avatarUrl2: ', require('util').format('/images/message/avatar/%s/%s', req.body.id, fileName));
                        return res.ok();
                    });
            });
    },


};

