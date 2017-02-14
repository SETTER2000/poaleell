/**
 * AttendanceController
 *
 * @description :: Server-side logic for managing attendances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function (req,res) {
       Attendance.find()
           //.populate('employees')
           .exec(function (err, attendances) {
               if (err) {
                   return res.json(err);
               }
               return res.view(attendances);
           });
    }
};

