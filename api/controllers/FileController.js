/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    upload: function  (req, res) {
        console.log(req.method, req.url);
        //return res.view('dashboard');
        //res.end();
        req.file('file').upload({
            dirname: 'uploads/'
        },function (err, files) {
            if (err)
                return res.serverError(err);
            return res.json({
                message: files.length + ' Выгрузка файл(ов) завершена!',
                files: files
            });
        });
    }
};
