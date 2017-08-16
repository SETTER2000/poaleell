module.exports = function isAdminOrKadr(req, res, next) {

    if (!req.session.me) {
        if (req.wantsJSON) {
            return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
        }
        return res.redirect('/');
    }

    User.findOne(req.session.me).exec(function (err, foundUser) {

        if (err) return res.negotiate(err);

        if (!foundUser) {
            if (req.wantsJSON) {
                return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

        if (foundUser.admin || foundUser.kadr) {
            return next();
        } else {
            if (req.wantsJSON) {
                return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

    });
};