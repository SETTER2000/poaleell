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
var _ = require('lodash');
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
                        return res.forbidden("Ваша учетная запись удалена. " +
                            "Перейдите на страницу 'Восстановить профиль'.");
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

    /**
     * Создать нового пользователя
     * @param req
     * @param res
     */
    createUser: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});

        if (!_.isString( req.param('lastName') ) ) {return res.badRequest('Фамилия не заполнена.');}
        if (!_.isString( req.param('firstName') ) ) {return res.badRequest('Имя не заполнено.');}
        if (!_.isString( req.param('patronymicName') ) ) {return res.badRequest('Отчество не заполнено.');}
        if (!_.isString(req.param('login'))) {return res.badRequest('Логин не заполнен.');}
        if (!_.isString(req.param('email'))) {return res.badRequest('Email не заполнен.');}

        if(req.param('patronymicName').length < 2 || req.param('patronymicName').length > 15){
            return res.badRequest('Отчество должно быть от 2 до 15 знаков!');
        }
        if(req.param('firstName').length < 2 || req.param('firstName').length > 15){
            return res.badRequest('Имя должно быть от 2 до 15 знаков!');
        }
        if(req.param('lastName').length < 2 || req.param('lastName').length > 15){
            return res.badRequest('Фамилия должна быть от 2 до 15 знаков!');
        }

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
                    res.send({id:newUser.id});
                });
            }
        });
    },

    /**
     * Выход с сайта
     * @param req
     * @param res
     */
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

    /**
     *  Восстановление пароля
     * @param req
     * @param res
     * @returns {*}
     */
    generateRecoveryEmail: function (req, res) {

        // secondary check for email parameter
        if (_.isUndefined(req.param('email'))) {
            return res.badRequest('Необходимо указать адрес электронной почты!');
        }

        // Find user by the incoming `email` parameter
        User.findOne({
            email: req.param('email')
        }).exec(function foundUser(err, user) {

            if (err) return res.negotiate(err);

            if (!user) return res.notFound();

            // Generate random alphanumeric string for the passwordRecoveryToken
            try {
                var randomString = Strings.random({}).execSync();
            } catch (err) {
                return res.serverError(err);
            }

            // Update user's paswordRecoveryToken attribute with the newly created alphanumeric string
            User.update({
                id: user.id
            }, {
                passwordRecoveryToken: randomString
            }).exec(function updateUser(err, updatedUser) {
                if (err) return res.negotiate(err);

                // email user with a URL which includes the password recovery token as a parameter

                // The Url that inclues the password recovery token as a parameter
                var recoverUrl = sails.config.mailgun.baseUrl + '/password-reset-form/' + updatedUser[0].passwordRecoveryToken;

                var messageTemplate = 'Восстановление пароля! \n' +
                    '\n' +
                    'Для сброса пароля, воспользуйтесь следующей ссылкой: \n' +
                    recoverUrl + '\n' +
                    '\n' +
                    'Удачи.';

                // Send a simple plaintext email.
                Mailgun.sendPlaintextEmail({
                    apiKey: sails.config.mailgun.apiKey,
                    domain: sails.config.mailgun.domain,
                    toEmail: updatedUser[0].email,
                    subject: '[KADR] Сброс пароля',
                    message: messageTemplate,
                    fromEmail: sails.config.admin.email,
                    fromName: sails.config.admin.name
                }).exec({
                    // An unexpected error occurred.
                    error: function (err) {
                        return res.negotiate(err);
                    },
                    success: function () {
                        return res.ok();
                    }
                });
            });
        });
    },

    /**
     * Сброс пароля при восстановлении
     * @param req
     * @param res
     * @returns {*}
     */
    resetPassword: function (req, res) {

        // check for token parameter
        if (!_.isString(req.param('passwordRecoveryToken'))) {
            return res.badRequest('A password recovery token is required!');
        }

        // secondary check for password parameter
        if (!_.isString(req.param('password'))) {
            return res.badRequest('A password is required!');
        }

        // Fallback to client-side length check validation
        if (req.param('password').length < 6) {
            return res.badRequest('Password must be at least 6 characters!');
        }

        // Try to find user with passwordRecoveryToken
        User.findOne({
            passwordRecoveryToken: req.param('passwordRecoveryToken')
        }).exec(function foundUser(err, user) {
            if (err) return res.negotiate(err);

            // If this token doesn't correspond with a real user record, it is invalid.
            // We send a 404 response so that our front-end code can show an
            // appropriate error message.
            if (!user) {
                return res.notFound();
            }

            // Encrypt new password
            Passwords.encryptPassword({
                password: req.param('password'),
            }).exec({
                error: function (err) {
                    return res.serverError(err);
                },
                success: function (encryptedPassword) {

                    User.update(user.id, {
                        encryptedPassword: encryptedPassword,
                        passwordRecoveryToken: null
                    }).exec(function (err, updatedUsers) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        // Log the user in
                        req.session.userId = updatedUsers[0].id;

                        // If successful return updatedUsers
                        return res.json({
                            username: updatedUsers[0].username
                        });
                    });
                }
            });
        });
    },

    /**
     * Получить конкретного пользователя
     * @param req
     * @param res
     */
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

    /**
     * Получить всех пользователей системы
     * @param req
     * @param res
     */
    findUsers: function (req, res) {
        //sails.log(req.body);
        //sails.log(req.params);
        //sails.log(req.param);
        //sails.log(req.query);
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
            if (!_.isUndefined(req.param('where')) && req.param('char').length > 0) {
                sails.log('ПРОШЁЛ ЗАПРОС');
                sails.log(req.param('where'));
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

    /**
     * Показать пользователя
     * @param req
     * @param res
     * @param next
     */
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

    /**
     * Редактировать пользователя
     * @param req
     * @param res
     * @param next
     */
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

    /**
     * Обновить пользователя
     * @param req
     * @param res
     */
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

    /**
     * Удалить пользователя
     * @param req
     * @param res
     * @param next
     */
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

    /**
     * Удалить профиль
     * @param req
     * @param res
     */
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

    /**
     * Восстановить профиль
     * @param req
     * @param res
     */
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

    /**
     * Восстановить Gravatar
     * @param req
     * @param res
     * @returns {*}
     */
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

    /**
     * Обновить профиль
     * @param req
     * @param res
     */
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

    /**
     * Сменить пароль (функция для использования только админами)
     * @param req
     * @param res
     * @returns {*}
     */
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

    /**
     * Сменить пароль (функция для авторизованного пользователя)
     * @param req
     * @param res
     * @returns {*}
     */
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

    /**
     * Установка пользователю прав администратора
     * @param req
     * @param res
     */
    updateAdmin: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            admin: req.param('admin')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    /**
     * Установка пользователю прав кадровика
     * @param req
     * @param res
     */
    updateKadr: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            kadr: req.param('kadr')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    /**
     * Установка пользователю прав руководителя
     * @param req
     * @param res
     */
    updateLeader: function (req, res) {
        if(req.param('leader')) sails.log('TRUE');

        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            leader: req.param('leader')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    /**
     * Установка пользователю состояния активации (action)
     * @param req
     * @param res
     */
    updateAction: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.update(req.param('id'), {
            action: req.param('action')
        }).exec(function (err, update) {
            if (err) return res.negotiate(err);
            return res.ok();
        });
    },

    /**
     * Установка пользователю состояния удалён (deleted)
     * @param req
     * @param res
     */
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

