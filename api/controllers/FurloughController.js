/**
 * FurloughController
 *
 * @description :: Server-side logic for managing holidays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAll:function(req,res){
        "use strict";
        //if (!req.session.me) return res.view('public/header', {layout: 'homepage'});


        Furlough.find(req.param('id')).exec((err, furlough) => {
            if (err) return res.negotiate;
            if (!furlough) return res.notFound();

            // return res.redirect('/admin/users/edit/' + req.param('id'));
            // return res.backToHomePage();
            //return res.redirect('/admin/users/edit/' + req.param('id'));
            res.ok(furlough);
        });
    },

    createFur: function (req, res) {
        //if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //if (!_.isString( req.param('name') ) ) {
        //    //sails.log(req.param('name'));
        //    //sails.log('is not string');
        //    return res.badRequest('Наименование не заполнено.');
        //}
        //if (_.isNumber( req.param('name') ) ) {
        //    //sails.log(req.param('name'));
        //    //sails.log('is not string');
        //    return res.badRequest('Наименование не строка!');
        //}

        if(req.param('name').length < 2 || req.param('name').length > 200){
            return res.badRequest('Наименование должно быть от 2 до 200 знаков!');
        }

        Furlough.create(req.body).exec(function (err, finn) {
            if(err) {return res.serverError(err);}
            //sails.log('Finn\'s id is:', finn.id);
            return res.send(finn);
        });
    }
};

