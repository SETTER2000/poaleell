/**
 * CalendarController
 *
 * @description :: Server-side logic for managing calendars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    findOne: function (req, res, next) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        Calendar.findOne(req.param('id'), function foundCalendar(err, calendar) {
            if (err) return next(err);
            if (!calendar) return next();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            res.view({
                calendar: calendar, me: req.session.me
            });
        });

    },
    addCalendar: function (req, res, next) {
        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return next(err);

            // Queue up a new pet to be added and a record to be created in the join table
            user.calendars.add({name: 'Программисты'});

            // Save the user, creating the new pet and associations in the join table
            user.save(function (err) {
                if (err) return next(err);

                res.send('OK!!!!!');
            });

        })
    },

    update: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        var obj = {
            name: req.param('name'),
            type: req.param('type'),
            location: req.param('location'),
            action: req.param('action'),
            year: req.param('year')
        };
        Calendar.update(req.param('id'), obj).exec(function updateObj(err, objEdit) {
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
        Calendar.findOne(req.param('id'), function foundUser(err, user) {
            if (err)return next(err);
            if (!user)return next('Calendar doesn\'t exists.');
            Calendar.destroy(req.param('id'), function userDestroyed(err) {
                if (err)return next(err);
            });
            // res.redirect('/admin/users');
            res.ok();
        });
    }
};

