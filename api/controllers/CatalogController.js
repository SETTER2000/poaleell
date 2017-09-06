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


module.exports = {
    /**
     * Получить объект
     * @param req
     * @param res
     */
    get: function (req, res) {
        "use strict";
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Catalog.find(req.param('id')).exec((err, finds) => {
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
        //if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //if (!_.isString( req.param('name') ) ) {
        //    //sails.log(req.param('name'));
        //    //sails.log('is not string');
        //    return res.badRequest('Наименование не заполнено.');
        //}
        //if (_.isNumber( req.param('name') ) ) {
        //    //sails.log(req.param('name'));
        //    //sails.log('is not string');
        //    return res.badRequest('Наименование не строка!');
        //}
        //if (req.param('name').length < 2 || req.param('name').length > 200) {
        //    return res.badRequest('Наименование должно быть от 2 до 200 знаков!');
        //}

        // console.log('Action', req.body);
        var obj = {
            section: 'Раздел',
            sections: 'Разделы',
            name: req.param('name'),
            kennel: req.param('kennel'),
            birthday: req.param('birthday'),
            avatarUrl: req.param('avatarUrl'),
            nickname: req.param('nickname'),
            //tip: req.param('tip'),
            action: (req.param('action')) ? req.param('action') : false
        };
        Catalog.create(obj).exec(function (err, finn) {
            if (err) return res.serverError(err);
            console.log('Отпуск создал:', req.session.me);
            console.log('Отпуск новый:', finn);
            return res.send(finn);
        });
        // Catalog.findOne({id: req.session.me})
        //     .exec((err, findParam)=> {
        //         "use strict";
        //         if (err) return res.serverError(err);
        //         if (!findParam) return res.notFound();
        //
        //         console.log('findParam', findParam);
        //
        //         obj.users = findParam.id;
        //         //if(findParam) return res.badRequest(req.param('name')+' - дубликат.');
        //       
        //     });

    },


    /**
     * Обновить
     * @param req
     * @param res
     */
    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        var obj = {
            id: req.param('id'),
            section: req.param('section'),
            sections: req.param('sections'),
            name: req.param('name'),
            action: req.param('action'),
            kennel: req.param('kennel'),
            nickname: req.param('nickname'),
            avatarUrl: req.param('avatarUrl'),
            birthday: req.param('birthday')
        };
        Catalog.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            console.log('Каталог обновил:', req.session.me);
            console.log('Собака обновление:', obj);
            if (err)return res.negotiate(err);
            res.ok();
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
        const dir = require('util').format('%s/images/user/dogs/%s', sails.config.appUrl.rootDir, req.body.id);
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
                    avatarUrl: require('util').format('/images/user/dogs/%s/%s', req.body.id, fileName),
                    avatarFd: files[0].fd,
                    fileNameAvatar: fileName
                })
                    .exec(function (err) {
                        if (err) return res.negotiate(err);
                        //console.log(' avatarUrl: ', dir);
                        //console.log(' avatarUrl2: ', require('util').format('/images/user/avatar/%s/%s', req.body.id, fileName));
                        return res.ok();
                    });
            });
    }
};

