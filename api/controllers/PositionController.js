/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  findOne: function (req, res, next) {
    if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
    Position.findOne(req.param('id'), function foundPosition(err, position) {
      if (err) return next(err);
      if (!position) return next();

      // return res.redirect('/admin/users/edit/' + req.param('id'));
      // return res.backToHomePage();
      //return res.redirect('/admin/users/edit/' + req.param('id'));
      res.view({
        position: position, me: req.session.me
      });
    });

  },
  addPosition: function (req, res, next) {
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return next(err);

      // Queue up a new pet to be added and a record to be created in the join table
      user.positions.add({name: 'Программисты'});

      // Save the user, creating the new pet and associations in the join table
      user.save(function (err) {
        if (err) return next(err);

        res.send('OK!!!!!');
      });

    })
  },

  update: function (req, res) {
    //req.params.all()
    Position.update(req.param('id'))
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
  }
};

