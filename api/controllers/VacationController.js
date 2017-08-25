/**
 * VacationController
 *
 * @description :: Server-side logic for managing vacations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Получить объект
     * @param req
     * @param res
     */
    get: function (req, res) {
        "use strict";
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Vacation.find(req.param('id')).exec((err, finds) => {
            if (err) return res.negotiate;
            if (!finds) return res.notFound();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            (req.param('id')) ? res.ok(finds[0]) : res.ok(finds);
        });
    },
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

        //console.log('Action', req.param('action'));
        var obj = {
            section: 'Отпуск',
            sections: 'Отпуска',
            name: req.param('name'),
            whomCreated: req.session.me,
            whomUpdated: null,
            //tip: req.param('tip'),
            action: (req.param('action')) ? req.param('action') : false
        };

        User.findOne({id: req.session.me})
            .populate('furloughs')
            .exec((err, findParam)=> {
                "use strict";
                if (err) return res.serverError(err);
                if (!findParam) return res.notFound();

                console.log('findParam', findParam);

                obj.users = findParam.id;
                //if(findParam) return res.badRequest(req.param('name')+' - дубликат.');
                Vacation.create(obj).exec(function (err, finn) {
                    if (err) return res.serverError(err);
                    console.log('Отпуск создал:', req.session.me);
                    console.log('Отпуск новый:',finn);
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
        var obj = {
            id:req.param('id'),
            section: req.param('section'),
            sections: req.param('sections'),
            name: req.param('name'),
            tip: req.param('tip'),
            whomCreated: req.param('whomCreated'),
            whomUpdated: req.session.me,
            action: req.param('action')
        };
        Vacation.update(req.param('id'),obj).exec(function updateObj(err, objEdit) {
            console.log('Отпуск обновил:', req.session.me);
            console.log('Отпуск обновление:',obj);
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
        Vacation.findOne(req.param('id')).exec((err, finds)=> {
            "use strict";
            if (err) return res.serverError(err);
            if (!finds) return res.notFound();

            Vacation.destroy(req.param('id'), (err) => {
                if (err)return next(err);
                console.log('Отпуск удалил:', req.session.me);
                console.log('Отпуск удалён:', finds);
                res.ok();
            });
        });

        // res.redirect('/admin/users');


    }
};

