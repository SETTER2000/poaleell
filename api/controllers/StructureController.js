/**
 * StructureController
 *
 * @description :: Server-side logic for managing Structures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        User.findOne({id: req.session.me})
            .exec((err, foundUser) => {
                if (err) return res.negotiate;
                if (!foundUser) return res.notFound();
                Department.native(function (err, collection) {
                        if (err) return res.serverError(err);

                        //sails.log('Поисковая дата:', req.param('sd'));

                        collection.aggregate([
                            {$match:{'name':'Генеральный директор'}},
                            {
                                $graphLookup: {
                                    from: "department",
                                    startWith: "$childrenObj",
                                    connectFromField: "childrenObj",
                                    connectToField: "name",
                                    maxDepth :  5 ,
                                    as: "reportingHierarchy"
                                }
                            }])
                            .toArray(function (err, results) {
                                if (err) return res.serverError(err);
                                console.log(results);
                                //var obj = {id:22, type:"root", text:'Генеральный директор', children:results};
                                //return res.send(obj);
                                return res.send(results);
                            });
                    }
                )
                ;


            })
    }
}
;

