/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * res.negotiate() - является функцией, которая проверяет предоставленную ошибку (err) и
 * определяет соответствующее поведение обработки ошибок с помощью свойства status errors и
 * перенаправляет его в один из следующих ответов в словаре res: res.badRequest () [400 ошибок],
 * res.forbidden () [403 ошибки], res.notFound () [404 ошибки] или res.serverError () [500 ошибок].
 */
//var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');
var LdapStrategy = require('passport-ldapauth');
var Email = require('machinepack-email');
var OPTS = {
    server: {
        url: 'ldap://192.168.38.14:389',
        bindDn: 'cn=testuser',
        bindCredentials: 'P@ssw0rd',
        searchBase: 'ou=passport-ldapauth',
        //searchBase: 'ou=passport-ldapauth',
        searchFilter: '(uid={{username}})'
    }
};
//passport.use(new LdapStrategy(OPTS));
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
            or: [
                {email: req.param('email')},
                {login: req.param('email')}
            ]
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();
            Passwords.checkPassword({
                passwordAttempt: req.param('password'), encryptedPassword: user.encryptedPassword
            }).exec({
                error: function (err) {
                    return res.negotiate(err);
                },
                incorrect: function () {
                    return res.notFound();
                },
                success: function () {
                    if (user.deleted) {
                        return res.forbidden("'Ваша учетная запись удалена. " +
                            "Пожалуйста, посетите ... восстановить для восстановления вашей учетной записи.'");
                    }
                    if (!user.action) {
                        return res.forbidden("Ваша учетная запись заблокирована, " +
                            "пожалуйста свяжитесь с администратором: apetrov@landata.ru");
                    }

                    req.session.me = user.id;
                    req.session.admin = user.admin;
                    req.session.kadr = 11;
                    //req.session.me = user;
                    return res.ok();
                }
            });
        });
    },

    /**
     * Регистрация нового пользователя.
     */
    signup: function (req, res) {
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'), difficulty: 10
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                return res.negotiate(err);
            }, // OK.
            success: function (encryptedPassword) {
                Gravatar.getImageUrl({
                    emailAddress: req.param('email')
                }).exec({
                    error: function (err) {
                        return res.negotiate(err);
                    },

                    success: function (gravatarUrl) {
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
                            },

                            function userCreated(err, newUser) {
                                if (err) {
                                    console.log('err:', err);
                                    //console.log('err.invalidAttributes: ', err.invalidAttributes);
                                    if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                        return res.emailAddressInUse();
                                    }
                                    if (err.invalidAttributes && err.invalidAttributes.login && err.invalidAttributes.login[0] && err.invalidAttributes.login[0].rule === 'unique') {

                                        //console.log('err.invalidAttributes: ', err.invalidAttributes);
                                        //console.log('ERRRRR:: ', err);
                                        return res.loginInUse();
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


                                return res.json(newUser);
                                //return res.json({
                                //    id: newUser.id
                                //});

                            });
                    }
                });
            }
        });

        // Send an email, either in plaintext or from an HTML template.
        //.where( actionUtil.parseCriteria(req) )
    },

    createUser: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Passwords.encryptPassword({
            password: req.param('password'), difficulty: 10
        }).exec({
            error: function (err) {
                return res.negotiate(err);
            },
            success: function (encryptedPassword) {
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
                    lastLoggedIn: new Date()
                    //gravatarUrl: gravatarUrl
                }, function (err, newUser) {
                    if (err) return res.negotiate(err);
                    sails.log('Создан новый пользователь с логином:' + newUser.login);
                    res.ok();
                });
            }
        });
    },

    logout: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.session.me, function foundUser(err, user) {
            //if (err) return res.view('public/header', {layout: 'homepage'});
            if (err) return res.negotiate(err);
            if (!user) {
                sails.log.verbose('Сессия относится к пользователю, который больше не существует/');
                return res.backToHomePage();
            }
            req.session.me = null;
            return res.backToHomePage();
        });
    },

    findOne: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.param('id'))
            .exec(function foundUser(err, user) {
                if (err) return res.serverError(err);
                if (!user) return res.notFound();
                res.ok(user);
                // res.view({
                //     user: user,
                //     me: req.session.me
                // });
            });
    },

    findUsers: function (req, res) {
        //sails.log(req.body);
        //sails.log(req.params);
        //sails.log(req.param);
        sails.log(req.query);
        sails.log(req.param('where'));

        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if (req.param('id')) {
            User.findOne(req.param('id'))
                .exec(function foundUser(err, user) {
                    if (err) return res.serverError(err);
                    if (!user) return res.notFound();
                    res.ok(user);

                });
        } else {
            if (req.param('where').length > 0 && req.param('char').length > 0) {
                var q = {
                    limit: req.params.limit,
                    sort: req.params.sort
                };
                var y = {};
                y[req.param('property')] = {'like': req.param('char')};
                q.where = y;


                User.find(q)
                    .exec(function foundUser(err, users) {
                        if (err) return res.serverError(err);
                        if (!users) return res.notFound();
                        return res.ok(users);
                    });
            } else {
                User.find()
                    .exec(function foundUser(err, users) {
                        if (err) return res.serverError(err);
                        if (!users) return res.notFound();
                        res.ok(users);
                    });
            }
        }
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

            //res.ok();
        });
    },

    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
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

    removeProfile: function (req, res) {

        //if (!req.param('id')) {
        //    return res.badRequest('id is a required parameter.');
        //}

        User.update({
            id: req.session.me
        }, {
            deleted: true
        }, function (err, removedUser) {

            if (err) return res.negotiate(err);
            if (removedUser.length === 0) {
                return res.notFound();
            }
            req.session.me = null;
            return res.ok();
        });
    },

    restoreProfile: function (req, res) {

        User.findOne({
            email: req.param('email')
        }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            Passwords.checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: user.encryptedPassword
            }).exec({

                error: function (err) {
                    return res.negotiate(err);
                },

                incorrect: function () {
                    return res.notFound();
                },

                success: function () {
                    User.update({
                        id: user.id
                    }, {
                        deleted: false
                    }).exec(function (err, updatedUser) {
                        req.session.me = user.id;
                        return res.json(updatedUser);
                    });
                }
            });
        });
    },

    restoreGravatarURL: function (req, res) {

        try {

            var restoredGravatarURL = gravatarUrl = Gravatar.getImageUrl({
                emailAddress: req.param('email')
            }).execSync();

            return res.json(restoredGravatarURL);

        } catch (err) {
            return res.serverError(err);
        }
    },

    updateProfile: function (req, res) {

        User.update({
            id: req.session.me
        }, {
            gravatarUrl: req.param('gravatarUrl')
        }, function (err, updatedUser) {

            if (err) return res.negotiate(err);

            return res.json(updatedUser);

        });
    },

    changePassword: function (req, res) {

        if (_.isUndefined(req.param('password'))) {
            return res.badRequest('A password is required!');
        }

        if (req.param('password').length < 6) {
            return res.badRequest('Password must be at least 6 characters!');
        }

        Passwords.encryptPassword({
            password: req.param('password')
        }).exec({
            error: function (err) {
                return res.serverError(err);
            },
            success: function (encryptedPassword) {

                User.update({id: req.param('id')}, {encryptedPassword: encryptedPassword})
                    .exec(function (err, updatedUser) {
                        if (err) {
                            return res.negotiate(err);
                        }
                        return res.json(updatedUser);
                    });
            }
        });
    },

    changePasswordProfile: function (req, res) {

        if (_.isUndefined(req.param('password'))) {
            return res.badRequest('A password is required!');
        }

        if (req.param('password').length < 6) {
            return res.badRequest('Password must be at least 6 characters!');
        }

        Passwords.encryptPassword({
            password: req.param('password')
        }).exec({
            error: function (err) {
                return res.serverError(err);
            },
            success: function (encryptedPassword) {

                User.update({id: req.session.me}, {encryptedPassword: encryptedPassword})
                    .exec(function (err, updatedUser) {
                        if (err) {
                            return res.negotiate(err);
                        }
                        return res.json(updatedUser);
                    });
            }
        });
    },

    adminUsers: function (req, res) {

        User.find({limit: 1000, sort: 'lastName'}).exec(function (err, users) {

            if (err) return res.negotiate(err);

            return res.json(users);

        });
    },

    updateAdmin: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            admin: req.param('admin')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    updateKadr: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            kadr: req.param('kadr')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    updateAction: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            action: req.param('action')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    updateDeleted: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            deleted: req.param('deleted')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    }
};

