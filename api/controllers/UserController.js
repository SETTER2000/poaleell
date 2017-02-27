/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var Sugar = require('sugar');
module.exports = {
    /**
     * Авторизация. Проверка логина и пароля.
     *
     * @param req - запрос от клиента к серверу
     * @param res - ответ сервера клиенту
     */
    login: function (req, res) {
        User.findOne({
            email: req.param('email')
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();
            require('machinepack-passwords').checkPassword({
                passwordAttempt: req.param('password'), encryptedPassword: user.encryptedPassword
            }).exec({
                error: function (err) {
                    return res.negotiate(err);
                }, incorrect: function () {
                    return res.notFound();
                }, success: function () {
                    req.session.me = user.id;
                    return res.ok();
                }
            });
        });
    }, /**
     * Регистрация нового пользователя.
     */
    signup: function (req, res) {
        var Email = require('machinepack-email');
        var Passwords = require('machinepack-passwords');

        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'), difficulty: 10
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                return res.negotiate(err);
            }, // OK.
            success: function (encryptedPassword) {
                require('machinepack-gravatar').getImageUrl({
                    emailAddress: req.param('email')
                }).exec({
                    error: function (err) {
                        return res.negotiate(err);
                    }, success: function (gravatarUrl) {

                        User.create({
                            login: req.param('login'),
                            email: req.param('email'),
                            firstName: req.param('firstName'),
                            lastName: req.param('lastName'),
                            patronymicName: req.param('patronymicName'),
                            encryptedPassword: encryptedPassword,
                            birthday: req.param('birthday'),
                            contacts: req.param('contacts'),
                            subdivision: req.param('subdivision'),
                            position: req.param('position'),
                            pfr: req.param('pfr'),
                            dateInWork: req.param('dateInWork'),
                            lastLoggedIn: new Date(),
                            gravatarUrl: gravatarUrl
                        }, function userCreated(err, newUser) {
                            if (err) {
                                //console.log('err:', err);
                                //console.log('err.invalidAttributes: ', err.invalidAttributes);
                                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                    return res.emailAddressInUse();
                                }
                                return res.negotiate(err);
                            }

                            req.session.me = newUser.id;
                            // res.redirect('/admin/users/edit/' + newUser.id);
                            // Отправка на email данных о регистрации
                            //Email.send(sails.config.sendMail).exec({
                            //    error: function (err) {
                            //        console.log(err);
                            //
                            //    }, success: function () {
                            //
                            //        console.log('Ok! Send mail.');
                            //    }
                            //});
                            return res.json({
                                id: newUser.id
                            });

                        });
                    }
                });
            }
        });

        // Send an email, either in plaintext or from an HTML template.
        //.where( actionUtil.parseCriteria(req) )
    },
    //find: function (req, res) {

    //    User.find()
    //        .limit(200)
    //        .where(req.allParams())
    //        .exec(function found(err, users) {
    //            console.log(users);
    //            console.log('METHOD FIND req.allParams():');
    //            console.log(req.allParams());
    //            console.log('METHOD FIND req.param("id"):');
    //            console.log(req.param('id'));
    //
    //            if (err)  return res.negotiate(err);
    //            if (!users)  return res.negotiate(err);
    //
    //            // return res.redirect('/admin/users/edit/' + req.param('id'));
    //            // return res.backToHomePage();
    //            //return res.redirect('/admin/users/edit/' + req.param('id'));
    //            //res.view({
    //            //    users: users, me: req.session.me
    //            //});
    //            //users.me=req.session.me;
    //            res.ok(users);
    //            //    res.view({
    //            //        user: user, me: req.session.me
    //            //    });
    //        });
    //
    //
    //    //return res.json(403, 'Single model lookup is denied.');
    //},
    //index: function (req, res, next) {
    //    if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
    //
    //    next();
    //    //return res.view('page/showHomePage', {layout: 'dashboard', user: user, me: req.session.me});
    //},
    findOne: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //console.log('REGSESSIONME:');
        //console.log(req.session.me);
        User.findOne(req.param('id'))
            .exec(function foundUser(err, user) {
                if (err) return res.serverError(err);
                if (!user) return res.notFound();

                //User.message(user.id, {count: 12, hairColor: 'red'});
                //sails.sockets.broadcast('artsAndEntertainment', { greeting: 'Hola!' });
                //res.view({
                //    user: user, me: req.session.me
                //});

                res.view({
                    user: user,
                    me: req.session.me
                });
            });
    },
    show: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({
                user: user, me: req.session.me
            });
        });
    },

    edit: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.param('id'), function foundUser(err, user) {

            if (err)return next(err);
            if (!user)return next('User doesn\'t exists.');
            //user.birthday = Sugar.Date.format(user.birthday, '%d.%m.%Y');
            res.view({
                user: user, me: req.session.me
            });
        });
    },

    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //User.findOne(req.param('id')).exec(function (err, user) {
        //    if (err)  return res.negotiate(err);
        //
        //    // Queue up a record to be inserted into the join table
        //    user.departments.add(req.param('subdivision'));
        //
        //    // Save the user, creating the new associations in the join table
        //    user.save(function (err) {
        //        return res.negotiate(err);
        //    });
        //});
        var obj = {
            login: req.param('login'),
            email: req.param('email'),
            firstName: req.param('firstName'),
            lastName: req.param('lastName'),
            patronymicName: req.param('patronymicName'),
            subdivision: req.param('subdivision'),
            birthday: req.param('birthday'),
            fired: req.param('fired'),
            dateInWork: req.param('dateInWork'),
            position: req.param('position'),
            contacts: req.param('contacts'),
            firedDate: req.param('firedDate'),
            action: req.param('action'),
            pfr: req.param('pfr')

        };
        User.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
            if (err) {
                return res.redirect('/admin/users/edit/' + req.param('id'));
            }
            if (req.param('subdivision')) {
                User.findOne(req.param('id')).exec(function (err, user) {
                    user.departments.add(req.param('subdivision'));
                    if (req.param('removeDivision')) {
                        user.departments.remove(req.param('removeDivision'));
                    }
                    user.save(function (err) {
                        if (err) return res.negotiate(err);
                        res.ok();
                    });
                });
            }
            if (req.param('position')) {
                User.findOne(req.param('id')).exec(function (err, user) {
                    user.positions.add(req.param('position'));
                    if (req.param('removePosition')) {
                        user.positions.remove(req.param('removePosition'));
                    }
                    user.save(function (err) {
                        if (err) return res.negotiate(err);
                        res.ok();
                    });
                });
            }

            res.ok();
            //res.view({
            //    user: user, me: req.session.me
            //});
            // User.publishUpdate(bobs[0].id, {
            //     hairColor: 'red'
            // }, req, {
            //     previous: {
            //         hairColor: bobs[0].hairColor
            //     }
            // });
        });
    },

    destroy: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err)return next(err);
            if (!user)return next('User doesn\'t exists.');
            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err)return next(err);
            });
            // res.redirect('/admin/users');
            res.ok();
        });
    },

    logout: function (req, res) {
        User.findOne(req.session.me, function foundUser(err, user) {
            if (err) return res.view('public/header', {layout: 'homepage'});
            if (!user) {
                sails.log.verbose('Сессия относится к пользователю, который больше не существует/');
                return res.backToHomePage();
            }
            req.session.me = null;
            return res.backToHomePage();
        });
    }

};

