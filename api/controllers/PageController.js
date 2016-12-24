/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showHomePage: function (req, res) {
        if (!req.session.me) {
            return res.view('homepage');
        }
        User.findOne(req.session.me, function (err, user) {
            if(err){
                return res.negotiate(err);
            }
            if(!user){
                sails.log.verbose('Session refers to a user who no longer exists- ' +
                    'did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
                return res.view('homepage');
            }
            return res.view('dashboard', {
                me:{
                    id:user.id,
                    first_name:user.first_name,
                    email:user.email,
                    login:user.login,
                    isAdmin:!!user.admin,
                    gravatarUrl:user.gravatarUrl
                }
            });
        });
    }
};

