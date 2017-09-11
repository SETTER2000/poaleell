/**
 * ReactionController
 *
 * @description :: Server-side logic for managing reactions
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
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // console.log('req.body:', req.body);
        Reaction.find(req.param('id'))
            .populate('photos')
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
     * Создать
     * @param req
     * @param res
     * @returns {*}
     */
    create: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if (_.isString( req.param('description') ) && req.param('description').length > 170 ) {
            return res.badRequest('Длинна строки не соответствует.');
        }
        if (_.isString( req.param('descriptionEn') ) && req.param('descriptionEn').length > 170 ) {
            return res.badRequest('Длинна строки не соответствует.');
        }
        //if (_.isNumber( req.param('name') ) ) {
        //    //sails.log(req.param('name'));
        //    //sails.log('is not string');
        //    return res.badRequest('Наименование не строка!');
        //}

        if (req.param('name').length < 2 || req.param('name').length > 150) {
            return res.badRequest('Наименование должно быть от 2 до 150 знаков!');
        }

        //console.log('Action', req.param('action'));
        var obj = {
            section: 'Тест',
            sections: 'Тесты',
            name: req.param('name'),
            description: req.param('description'),
            descriptionEn: req.param('descriptionEn'),
            tip: req.param('tip'),
            location: req.param('location'),
            action: (req.param('action')) ? req.param('action') : false,
        };

        Reaction.findOne({'name':req.param('name')}).exec((err, findParam)=> {
            "use strict";
            if (err)return res.serverError(err);

            console.log('findParam', findParam);
            if(findParam) return res.badRequest(req.param('name')+' - дубликат.');
            Reaction.create(obj).exec(function (err, finn) {
                if (err) return res.serverError(err);
                //sails.log('Finn\'s id is:', finn.id);
                return res.send(finn);
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
        if (_.isString( req.param('description') ) && req.param('description').length > 170 ) {
            return res.badRequest('Длинна строки не соответствует.');
        }
        if (_.isString( req.param('descriptionEn') ) && req.param('descriptionEn').length > 170 ) {
            return res.badRequest('Длинна строки не соответствует.');
        }
        if (req.param('name').length < 2 || req.param('name').length > 150) {
            return res.badRequest('Наименование должно быть от 2 до 150 знаков!');
        }

        var obj = {
            section: req.param('section'),
            sections: req.param('sections'),
            name: req.param('name'),
            tip: req.param('tip'),
            description: req.param('description'),
            descriptionEn: req.param('descriptionEn'),
            location: req.param('location'),
            action: req.param('action')
        };
        Reaction.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
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
        Reaction.findOne(req.param('id'), function foundUser(err, user) {
            if (err)return next(err);
            if (!user)return next('User doesn\'t exists.');
            Reaction.destroy(req.param('id'), function userDestroyed(err) {
                if (err)return next(err);
            });
            // res.redirect('/admin/users');
            res.ok();
        });
    }
    
};

