/**
 * AttendanceController
 *
 * @description :: Server-side logic for managing attendances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //get: function (req,res) {
    //   Attendance.find()
    //       //.populate('employees')
    //       .exec(function (err, attendances) {
    //           if (err) {
    //               return res.json(err);
    //           }
    //           return res.view(attendances);
    //       });
    //},
    getQuery: function (req, res) {

        // var Promise = require('bluebird');
        //
        // var userQueryAsync = Promise.promisify(User.query);
        // userQueryAsync("SELECT email FROM user WHERE email = ?", [email])
        //     .then(function (user) {
        //         console.log(user);
        //     });
        Attendance.query(
            'SELECT * FROM attendance AS a ' +
            'LEFT JOIN attendance_employees AS ae ' +
            'ON a.id=ae.attendance_id ' +
            'LEFT JOIN  employees AS e ' +
            'ON e.id = ae.employees_id ' +
            'WHERE e.lname= ? AND e.fname=? AND e.pname=?',
            // Attendance.query('SELECT * FROM attendance WHERE attendance.id = ?',
            // ['1208']
            // {id: req.param('id'), limit: req.param('limit')}
            [req.param('lastName'),req.param('firstName'),req.param('patronymicName')]
            // [req.allParams()]
            , function (err, attendance) {
                if (err) {
                    return res.serverError(err);
                }
                // sails.log(req.allParams());
                //sails.log(attendance);
                return res.json(attendance);
            });
    },
    findOne: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Attendance.findOne(req.param('id'), function foundDepartment(err, attendance) {
            if (err) return next(err);
            if (!attendance) return next();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            res.view({
                attendance: attendance, me: req.session.me
            });
        });
    }
};

