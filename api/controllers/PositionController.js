'use strict';
/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    findOne: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Position.findOne(req.param('id'), function foundPosition(err, position) {
            if (err) return next(err);
            if (!position) return next();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            res.view({
                position: position, me: req.session.me
            });
        });

    },
    
    findPositions:function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if(req.param('id')){
            Position.findOne(req.param('id'))
                .exec(function foundPosition(err, position) {
                    if (err) return res.serverError(err);
                    if (!position) return res.notFound();
                    res.ok(position);

                });
        }else{
            Position.find({sort:'name'})
                .exec(function foundPosition(err, positions) {
                    if (err) return res.serverError(err);
                    if (!positions) return res.notFound();
                    res.ok(positions);
                });
        }

    },
    
    addPosition: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return next(err);

            // Queue up a new pet to be added and a record to be created in the join table
            user.positions.add({name: 'Программисты'});

            // Save the user, creating the new pet and associations in the join table
            user.save(function (err) {
                if (err) return next(err);

                res.send('OK!!!!!');
            });

        })
    },

    createPosition: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if (!_.isString( req.param('name') ) ) {
            sails.log(req.param('name'));
            sails.log('is not string');
            return res.badRequest('Наименование не заполнено.');
        }
        if (_.isNumber( req.param('name') ) ) {
            sails.log(req.param('name'));
            sails.log('is not string');
            return res.badRequest('Наименование не строка!');
        }

        if(req.param('name').length < 2 || req.param('name').length > 35){
            return res.badRequest('Наименование должно быть от 2 до 35 знаков!');
        }

        Position.create(req.body).exec(function (err, finn) {
            if(err) {return res.serverError(err);}
            sails.log('Finn\'s id is:', finn.id);
            return res.send({id: finn.id});
        });

        //Position.findOne(req.param('id')).exec(function (err, user) {
        //    if (err) return next(err);
        //
        //    // Queue up a new pet to be added and a record to be created in the join table
        //    user.positions.add({name: 'Программисты'});
        //
        //    // Save the user, creating the new pet and associations in the join table
        //    Position.save(function (err) {
        //        if (err) return next(err);
        //
        //        res.send('OK!!!!!');
        //    });
        //
        //})
    },

    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        var obj = {
            name: req.param('name'),
            type: req.param('type'),
            location: req.param('location'),
            action: req.param('action')
        };
        Position.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            if (err)return res.negotiate(err);
            //if (err) {
            //    return res.redirect('/admin/departments/edit/' + req.param('id'));
            //}
            //res.redirect('/admin/users/show/' + req.param('id'));
            // res.location('/home/admin/departments');
            res.ok();
        })
    },

    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Position.findOne(req.param('id'), function foundUser(err, user) {
            if (err)return next(err);
            if (!user)return next('Position doesn\'t exists.');
            Position.destroy(req.param('id'), function userDestroyed(err) {
                if (err)return next(err);
            });
            // res.redirect('/admin/users');
            res.ok();
        });
    }
};

