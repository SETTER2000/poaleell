module.exports = function isAdmin(req, res, next) {

    if (req.session.me.admin || req.session.me.kadr) {
        return next();
    }

    //  Если пользовательский агент хочет Json, ответьте кодом состояния и сообщением JSON
    if (req.wantsJSON) {
        return res.forbidden('Вам не разрешено выполнять это действие.');
    }

    return res.redirect('/');
};
