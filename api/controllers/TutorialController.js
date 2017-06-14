/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createTutorial: function (req, res) {
        User.findOne({
                id: req.session.me
            })
            .exec(function (err, foundUser) {
                if (err) return res.negotiate;
                if (!foundUser) return res.notFound();

                Tutorial.create({
                        title: req.param('title'),
                        description: req.param('description'),
                        owner: foundUser.id
                    })
                    .exec(function (err, createdTutorial) {
                        if (err) return res.negotiate(err);

                        return res.json({id: createdTutorial.id});
                    });
            });
    },
    editTutorial: function (req, res) {
        User.findOne({
                id: req.session.me
            })
            .exec(function (err, foundUser) {
                if (err) return res.negotiate;
                if (!foundUser) return res.notFound();
                Tutorial.findOne({
                        id: req.param('id')
                    })
                    .populate('owner')
                    .exec(function (err, foundTutorial) {
                        if (err) return res.negotiate(err);
                        if (req.session.me === foundTutorial.owner.id) {
                            sails.log(foundTutorial);
                            return res.ok(foundTutorial);
                        }

                        return res.notFound();
                    });
            });
    }
};

