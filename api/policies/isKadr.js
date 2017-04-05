module.exports = function isAdmin(req, res, next) {

    if (!req.session.me) {
        if (req.wantsJSON) {
            return res.forbidden('isAdmin: Вам не разрешено выполнять это действие.');
        }
        return res.redirect('/');
    }

    User.findOne(req.session.me).exec(function(err, foundUser){

        if (err) return res.negotiate(err);

        if (!foundUser) {
            if (req.wantsJSON) {
                return res.forbidden('isKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

        if (foundUser.kadr) {
            return next();
        } else {
            if (req.wantsJSON) {
                return res.forbidden('isKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

    });
};