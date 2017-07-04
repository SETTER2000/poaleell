/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //test: function (req,res) {
    //
    //    Department.findOne(req.param('department')).exec(function(err, department) {
    //        if(err) return console.log('ERRROr! ', err);
    //
    //        // Queue up a record to be inserted into the join table
    //        department.subdivision.add(req.param('subdivision'));
    //
    //        // Save the user, creating the new associations in the join table
    //        department.save(function(err,response) {
    //            if(err) return console.log('Не сохранилась! ', err);
    //
    //            res.ok(response);
    //
    //        });
    //        res.ok(department);
    //    });
    //},
    getRootDepartment: function (req, res) {
        // if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        // sails.log(req.param('id'));
        Department.find({id: {'!': req.param('id')}, sort: 'name'}).exec(function (err, foundList) {
            if (err) return res.negotiate;
            if (!foundList) return res.notFound();

            return res.ok(foundList);
        });
    },


    findOne: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Department.findOne(req.param('id'), function foundDepartment(err, department) {
            if (err) return next(err);
            if (!department) return next();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            res.view({
                department: department, me: req.session.me
            });
        });

    },

    findDepartments: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        if (req.param('id')) {
            Department.findOne(req.param('id'))
                //.populate('subdivision')
                .exec(function foundUser(err, department) {
                    if (err) return res.serverError(err);
                    if (!department) return res.notFound();
                    res.ok(department);
                });
        } else {
            Department.find()
                //.populate('subdivision')
                .exec(function foundUser(err, departments) {
                    if (err) return res.serverError(err);
                    if (!departments) return res.notFound();
                    res.ok(departments);
                });
        }
    },

    createDepartment: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});

        if (!_.isString(req.param('name'))) {
            sails.log(req.param('name'));
            sails.log('is not string');
            return res.badRequest('Наименование не заполнено.');
        }
        if (req.param('name').length < 2 || req.param('name').length > 150) {
            return res.badRequest('Наименование должно быть от 2 до 35 знаков!');
        }
        Department.create(req.body).exec(function (err, finn) {
            if (err) {
                return res.serverError(err);
            }
            sails.log('Идентификатор department:', finn.id);
            return res.send({id: finn.id});

        });
    },

    addDepartment: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return next(err);

            // Queue up a new pet to be added and a record to be created in the join table
            user.departments.add({name: 'Программисты', type: 'IT', location: '2 этаж'});

            // Save the user, creating the new pet and associations in the join table
            user.save(function (err) {
                if (err) return next(err);

                res.send('OK!!!!!');
            });

        })
    },

    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //req.params.all()
        Department.update(req.param('id'))
            .set(
                // {
                //     name: req.param('name'),
                //     type: req.param('type'),
                //     location: req.param('location')
                //
                // }
                req.body
            )
            .exec(function (err) {
                if (err)return res.negotiate(err);
                //if (err) {
                //    return res.redirect('/admin/departments/edit/' + req.param('id'));
                //}
                //res.redirect('/admin/users/show/' + req.param('id'));
                // res.location('/home/admin/departments');
                res.ok();
            })
    },

    destroy: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Department.findOne(req.param('id'), function foundUser(err, user) {
            if (err)return next(err);
            if (!user)return next('Position doesn\'t exists.');
            Department.destroy(req.param('id'), function userDestroyed(err) {
                if (err)return next(err);
            });
            res.ok();
        });
    }
};

