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

                        collection.aggregate([{$match: {'children.id': {$gt: ""}}}, {
                            $project: {
                                _id: 0,
                                text: "$name",
                                id: "$_id",
                                children: "$children"
                            }
                        }]).toArray(function (err, results) {
                            if (err) return res.serverError(err);
                            return res.send(results);


                            //return res.json({
                            //    "id": 1,
                            //    "text": "Генеральный директор",
                            //    "type":"demo",
                            //    "children": [
                            //        {
                            //            "id": 2,
                            //            "text": "Департамент маркетинга",
                            //            "children": [
                            //                {
                            //                    "id": 11,
                            //                    "text":"Отдел маркетинга"
                            //                },{
                            //                    "id": 12,
                            //                    "text":"Отдел корпоративных коммуникаций"
                            //                }
                            //            ]
                            //        },
                            //        {
                            //            "id": 3,
                            //            "text": "Отдел по договорной и претензионной работе"
                            //        },
                            //        {
                            //            "id": 4,
                            //            "text": "Отдел по работе с персоналом"
                            //        },
                            //        {
                            //            "id": 5,
                            //            "text": "Административно-хозяйственны департаент",
                            //            "type":"ahd",
                            //            "children": [
                            //                {
                            //                    "id": 10,
                            //                    "text":"Секретариат"
                            //                }
                            //            ]
                            //        },
                            //        {
                            //            "id": 6,
                            //            "text": "Отдел сопровождения бизнес операций"
                            //        },
                            //        {
                            //            "id": 7,
                            //            "text": "Складской департамент"
                            //        },
                            //        {
                            //            "id": 8,
                            //            "text": "Финансовый департамент",
                            //            "type":"findep"
                            //        },
                            //        {
                            //            "id": 9,
                            //            "text": "Главный бухгалтер"
                            //        }
                            //    ]
                            //});

                        });
                    }
                )
                ;


            })
    }
}
;

