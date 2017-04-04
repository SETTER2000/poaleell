/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showHomePage: function (req, res) {
        if (!req.session.me) {
            return res.view('public/header', {layout: 'homepage', me: null});
        }
        User.findOne(req.session.me, function (err, user) {
            if (err) {
                return res.negotiate(err);
            }
            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('public/header', {layout: 'homepage', me: null});
            }
            // return res.view({
            //     me: user
            // });

           

            return res.view({
                me: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    patronymicName: user.patronymicName,
                    birthday: user.birthday,
                    email: user.email,
                    login: user.login,
                    subdivision: user.subdivision,
                    admin: user.admin,
                    kadr: user.kadr,
                    gravatarUrl: user.gravatarUrl,
                    lastLoggedIn: user.lastLoggedIn,
                    fullName: user.lastName + ' ' + user.firstName + ' ' + user.patronymicName
                }
            });
            //res.view('dashboard/index', {layout:'dashboard'});
        });
    },
    showAdminPage: function (req, res) {
       
        if (!req.session.me) {
            return res.view('public/header', {layout: 'homepage', me: null});
        }

        User.findOne(req.session.me, function (err, user) {

            if (err) {
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('public/header', {layout: 'homepage', me: null});
            }
           
            // if (!user.admin) return res.backToHomePage();
            if (!user.admin) {
                req.session.me = user.id;
                return res.forbidden("Нет прав для просмотра данной страницы.");

            }
        
                return res.view( {
                    me: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        patronymicName: user.patronymicName,
                        birthday: user.birthday,
                        email: user.email,
                        login: user.login,
                        subdivision: user.subdivision,
                        admin: user.admin,
                        kadr: user.kadr,
                        gravatarUrl: user.gravatarUrl,
                        lastLoggedIn: user.lastLoggedIn,
                        fullName: user.lastName + ' ' + user.firstName + ' ' + user.patronymicName
                    }
                });
         
            
                // return res.forbidden("У Вас нет прав для просмотра данной страницы, " +
                //     "пожалуйста свяжитесь с администратором: apetrov@landata.ru");
           
                // return res.view({
                //     me: {
                //         id: user.id,
                //         firstName: user.firstName,
                //         lastName: user.lastName,
                //         patronymicName: user.patronymicName,
                //         birthday: user.birthday,
                //         email: user.email,
                //         login: user.login,
                //         subdivision: user.subdivision,
                //         admin: user.admin,
                //         gravatarUrl: user.gravatarUrl,
                //         lastLoggedIn: user.lastLoggedIn,
                //         fullName: user.lastName + ' ' + user.firstName + ' ' + user.patronymicName
                //     }
                // });
              
            
        });
    },
    
    showVideosPage: function (req, res) {

        if (!req.session.me) {
            return res.view('videos', {
                me: null
            });
        }

        User.findOne(req.session.me, function (err, user) {
            if (err) {
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('videos', {
                    me: null
                });
            }

            return res.view('videos', {
                me: {
                    id: user.id,
                    email: user.email,
                    gravatarURL: user.gravatarURL,
                    admin: user.admin
                }
            });
        });
    },
    showProfilePage: function (req, res) {

        if (!req.session.me) {
            return res.redirect('/');
        }

        User.findOne(req.session.me, function (err, user) {
            if (err) {
                console.log('error: ', error);
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('homepage');
            }

            return res.view('profile', {
                me: {
                    id: user.id,
                    email: user.email,
                    gravatarURL: user.gravatarURL,
                    admin: user.admin
                }
            });
        });
    },
    showEditProfilePage: function (req, res) {

        if (!req.session.me) {
            return res.redirect('/');
        }

        User.findOne(req.session.me, function (err, user) {
            if (err) {
                console.log('error: ', error);
                return res.negotiate(err);
            }

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('homepage');
            }

            return res.view('edit-profile', {
                me: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    gravatarURL: user.gravatarURL,
                    admin: user.admin
                }
            });
        });
    },
    showRestorePage: function (req, res) {
        if (req.session.me) {
      return res.redirect('/');
        }

        return res.view('restore-profile', {
      me: null
    });
    }
};

/*
 {
 me:{
 id:user.id,
 firstName:user.firstName,
 lastName:user.lastName,
 patronymicName:user.patronymicName,
 email:user.email,
 login:user.login,
 isAdmin:!!user.admin,
 gravatarUrl:user.gravatarUrl,
 lastLoggedIn:user.lastLoggedIn
 }
 }*/
