/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //findOne: function (req, res) {
    //    if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
    //
    //    Employee.find()
    //        //.populate('attendance_id')
    //        .exec(function (err, employees) {
    //            if (err) return res.negotiate(err);
    //
    //            res.view({
    //                employee: employees, me: req.session.me
    //            });
    //    });
    //}
    findOne: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        console.log('REGSESSIONME:');
        console.log(req.session.me);
        Employee.findOne(req.param('id'))
            .exec(function foundEmployee(err, employee) {
                if (err) return res.negotiate(err);
                if (!employee) return res.notFound();

                //Employee.message(employee.id, {count: 12, hairColor: 'red'});
                //sails.sockets.broadcast('artsAndEntertainment', { greeting: 'Hola!' });
                //res.view({
                //    employee: employee, me: req.session.me
                //});

                res.view({
                    employee: employee,
                    me: req.session.me
                });
            });
    },

    update: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //Employee.findOne(req.param('id')).exec(function (err, employee) {
        //    if (err)  return res.negotiate(err);
        //
        //    // Queue up a record to be inserted into the join table
        //    employee.departments.add(req.param('subdivision'));
        //
        //    // Save the employee, creating the new associations in the join table
        //    employee.save(function (err) {
        //        return res.negotiate(err);
        //    });
        //});
        var obj = {
            //login: req.param('login'),
            email: req.param('email'),
            firstName: req.param('fname'),
            lastName: req.param('lname'),
            patronymicName: req.param('pname'),
            description: req.param('description'),
            //birthday: req.param('birthday'),
            //fired: req.param('fired'),
            //dateInWork: req.param('dateInWork'),
            //position: req.param('position'),
            //contacts: req.param('contacts'),
            //firedDate: req.param('firedDate'),
            active: req.param('active'),
            //pfr: req.param('pfr')

        };
        Employee.update(req.param('id'), obj)
            .exec(function updateEmployee(err, employeeObjEdit) {
                if (err) {
                    return res.redirect('/admin/employees/edit/' + req.param('id'));
                }
                if (req.param('subdivision')) {
                    Employee.findOne(req.param('id')).exec(function (err, employee) {
                        employee.departments.add(req.param('subdivision'));
                        if (req.param('removeDivision')) {
                            employee.departments.remove(req.param('removeDivision'));
                        }
                        employee.save(function (err) {
                            if (err) return res.negotiate(err);
                            res.ok();
                        });
                    });
                }
                if (req.param('position')) {
                    Employee.findOne(req.param('id')).exec(function (err, employee) {
                        employee.positions.add(req.param('position'));
                        if (req.param('removePosition')) {
                            employee.positions.remove(req.param('removePosition'));
                        }
                        employee.save(function (err) {
                            if (err) return res.negotiate(err);
                            res.ok();
                        });
                    });
                }

                //res.ok();
                res.view({
                    employee: employeeObjEdit, me: req.session.me
                });
                // Employee.publishUpdate(bobs[0].id, {
                //     hairColor: 'red'
                // }, req, {
                //     previous: {
                //         hairColor: bobs[0].hairColor
                //     }
                // });
            });
    },
};

