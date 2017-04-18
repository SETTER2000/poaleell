module.exports = function isKadr(req, res, next) {

    if (!req.session.me) {
        if (req.wantsJSON) {
            return res.forbidden('isLeader: Вам не разрешено выполнять это действие.');
        }
        return res.redirect('/');
    }

    User.findOne(req.session.me).exec(function(err, foundUser){

        if (err) return res.negotiate(err);

        if (!foundUser) {
            if (req.wantsJSON) {
                return res.forbidden('isLeader: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

        if (foundUser.leader) {
            return next();
        } else {
            if (req.wantsJSON) {
                return res.forbidden('isLeader: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

    });
};