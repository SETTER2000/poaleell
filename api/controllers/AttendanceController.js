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

