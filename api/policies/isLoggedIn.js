module.exports = function isLoggedIn(req, res, next) {

    if (req.session.me) {
        return next();
    }

    //  Если пользовательский агент хочет Json, ответьте кодом состояния и сообщением JSON
    if (req.wantsJSON) {
        return res.forbidden('isLoggedIn: Вам не разрешено выполнять это действие.');
    }

    return res.redirect('/');
};

