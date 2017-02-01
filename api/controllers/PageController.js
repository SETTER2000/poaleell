/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showHomePage: function (req, res) {
        if (!req.session.me) {
            return res.view('public/header', {layout: 'homepage'});
        }
        User.findOne(req.session.me, function (err, user) {
            if (err) {
                return res.negotiate(err);
            }
            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('public/header', {layout: 'homepage'});
            }
            // return res.view({
            //     me: user
            // });
            return   res.view({
                me:{
                    id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    patronymicName:user.patronymicName,
                    birthday:user.birthday,
                    email:user.email,
                    login:user.login,
                    subdivision:user.subdivision,
                    isAdmin:!!user.admin,
                    gravatarUrl:user.gravatarUrl,
                    lastLoggedIn:user.lastLoggedIn
                }
            });
            //res.view('dashboard/index', {layout:'dashboard'});
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
