/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
module.exports = {
    go: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!file)) {
                res.status(403);
                return res.send({message: info.message});
            }
            req.session.authenticated = true;
            return res.ok();
        })(req, res);
    },
    upload: function (req, res) {
        console.log(req.method, req.url);

        //return res.view('dashboard');
        //res.end();
        req.file('file').upload({
            dirname: 'uploads/'
        }, function (err, files) {
            if (err)
                return res.serverError(err);
            return res.json({
                message: files.length + ' Выгрузка файл(ов) завершена!',
                files: files
            });
        });
    }
};
