'use strict';
/**
 * StructureController
 *
 * @description :: Server-side logic for managing Structures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');


module.exports = {
    get: function (req, res) {
        //if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
        //User.findOne({id: req.session.me})
        //    .exec((err, foundUser) => {
        //        if (err) return res.negotiate;
        //        if (!foundUser) return res.notFound();


        // ROOT уровень
        Department.find({name: "Генеральный директор"}).exec(function (err, foundRoot) {
            if (err) return res.negotiate;
            if (!foundRoot.length) return res.notFound();
            var root = {};
            root.children = [];
            root.pt = []; // Предки
            root.type = '';
            _.forEach(foundRoot, (value, key)=> {
                root.id = value.id;
                root.text = value.name;
                root.pt.push({parent: value.name});
            });


            // Первый уровень вложенности
            Department.find(root.pt)
                .exec((err, foundChildren1) =>{
                    if (err) return res.negotiate;
                    if (!foundChildren1.length)  return res.send(root);
                    let pt1 = []; // Предки
                    _.forEach(foundChildren1, (value, key1)=> {
                        let level = {};
                        level.children = [];
                        level.type = ''; // Предки
                        level.text = value.name;
                        level.id = value.id;
                        level.parent = value.parent;
                        pt1.push({parent: value.name});
                        root.children.push(level);
                    });


                    // Второй уровень вложенности
                    if (pt1.length > 0) {
                        Department.find(pt1)
                            .exec(function (err, foundChildren2) {
                                if (err) return res.negotiate;
                                if (!foundChildren2.length)  return res.send(root);
                                let pt2 = []; // Предки
                                _.forEach(foundChildren2, (value, key2)=> {
                                    let level2 = {};
                                    level2.children = [];
                                    level2.type = ''; // Предки
                                    level2.text = value.name;
                                    level2.id = value.id;
                                    level2.parent = value.parent;
                                    pt2.push({parent: value.name});
                                    _.forEach(root.children, (v, k)=> {
                                        if (v.text == level2.parent) {
                                            v.children.push(level2);
                                        }
                                    });
                                });

                                // Третий уровень вложенности
                                if (pt2.length > 0) {
                                    Department.find(pt2)
                                        .exec(function (err, foundChildren3) {
                                            if (err) return res.negotiate;
                                            if (!foundChildren3.length)  return res.send(root);
                                            //console.log('foundChildren3: ', foundChildren3);
                                            let pt3 = []; // Предки
                                            _.forEach(foundChildren3, (value, key)=> {
                                                let level3 = {};
                                                level3.children = [];
                                                level3.type = ''; // Предки
                                                level3.text = value.name;
                                                level3.id = value.id;
                                                level3.parent = value.parent;
                                                pt3.push({parent: value.name});

                                                //console.log('level3: ', level3);

                                                _.forEach(root.children, (v, k)=> {
                                                    _.forEach(v.children, (va, ke)=> {
                                                        if (va.text == level3.parent) {
                                                            va.children.push(level3);
                                                        }
                                                    });
                                                });
                                            });


                                            // Четвертый  уровень вложенности
                                            if (pt3.length > 0) {
                                                Department.find(pt3)
                                                    .exec(function (err, foundChildren4) {
                                                        if (err) return res.negotiate;
                                                        if (!foundChildren4.length)  return res.send(root);
                                                        //console.log('foundChildren4: ', foundChildren4);
                                                        let pt4 = []; // Предки
                                                        _.forEach(foundChildren4, (value, key)=> {
                                                            let level4 = {};
                                                            level4.children = [];
                                                            level4.type = ''; // Предки
                                                            level4.text = value.name;
                                                            level4.id = value.id;
                                                            level4.parent = value.parent;
                                                            pt4.push({parent: value.name});

                                                            //console.log('level4: ', level4);

                                                            _.forEach(root.children, (v, k)=> {
                                                                _.forEach(v.children, (va, ke)=> {
                                                                    _.forEach(va.children, (val, key)=> {
                                                                        if (val.text == level4.parent) {
                                                                            val.children.push(level4);
                                                                        }
                                                                    });
                                                                });
                                                            });


                                                        });

                                                        // Пятый  уровень вложенности
                                                        if (pt4.length > 0) {
                                                            Department.find(pt4)
                                                                .exec(function (err, foundChildren5) {
                                                                    if (err) return res.negotiate;
                                                                    if (!foundChildren5.length)  return res.send(root);
                                                                    //console.log('foundChildren5: ', foundChildren5);
                                                                    let pt5 = []; // Предки
                                                                    _.forEach(foundChildren5, (value, key)=> {
                                                                        let level5 = {};
                                                                        level5.children = [];
                                                                        level5.type = ''; // Предки
                                                                        level5.text = value.name;
                                                                        level5.id = value.id;
                                                                        level5.parent = value.parent;
                                                                        pt5.push({parent: value.name});

                                                                        //console.log('level5: ', level5);

                                                                        _.forEach(root.children, (v, k)=> {
                                                                            _.forEach(v.children, (va, ke)=> {
                                                                                _.forEach(va.children, (val, key)=> {
                                                                                    _.forEach(val.children, (valu, key)=> {
                                                                                        if (valu.text == level5.parent) {
                                                                                            valu.children.push(level5);
                                                                                        }
                                                                                    });
                                                                                });
                                                                            });
                                                                        });


                                                                        // Шестой  уровень вложенности
                                                                        if (pt5.length > 0) {


                                                                            Department.find(pt5)
                                                                                .exec(function (err, foundChildren6) {
                                                                                    if (err) return res.negotiate;
                                                                                    if (!foundChildren6.length)  return res.send(root);
                                                                                    console.log('foundChildren6: ', foundChildren6);
                                                                                    let pt6 = []; // Предки
                                                                                    _.forEach(foundChildren6, (value, key)=> {
                                                                                        let level6 = {};
                                                                                        level6.children = [];
                                                                                        level6.type = ''; // Предки
                                                                                        level6.text = value.name;
                                                                                        level6.id = value.id;
                                                                                        level6.parent = value.parent;
                                                                                        pt6.push({parent: value.name});

                                                                                        console.log('level6: ', level6);

                                                                                        _.forEach(root.children, (v, k)=> {
                                                                                            _.forEach(v.children, (va, ke)=> {
                                                                                                _.forEach(va.children, (val, key)=> {
                                                                                                    _.forEach(val.children, (valu, key)=> {
                                                                                                        _.forEach(valu.children, (values, key)=> {
                                                                                                            if (values.text == level6.parent) {
                                                                                                                values.children.push(level6);
                                                                                                            }
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });

                                                                                        if (pt6.length > 0) {
                                                                                            return res.send(root);
                                                                                        } else {
                                                                                            return res.send(root);
                                                                                        }
                                                                                    });
                                                                                });


                                                                        } else {
                                                                            return res.send(root);
                                                                        }
                                                                    });
                                                                });
                                                        } else {
                                                            return res.send(root);
                                                        }
                                                    });
                                            } else {
                                                return res.send(root);
                                            }
                                        });
                                } else {
                                    return res.send(root);
                                }
                            });
                    } else {
                        return res.send(root);
                    }

                    // Второй уровень вложенности
                    //Department.find({parent: level.text}).exec(function (err, foundChildren2) {
                    //    if (err) console.log('Level 2', err);
                    //    if (!foundChildren2) return res.notFound();
                    //    console.log('CHILDREN-2: ', foundChildren2);
                    //    _.forEach(foundChildren2, (value, key2)=> {
                    //        let level2 = {};
                    //        level2.children = [];
                    //        level2.text = value.name;
                    //        level2.id = value.id;
                    //        level2.parent = value.parent;
                    //        level.children.push(level2);
                    //
                    //        // Третий уровень вложенности
                    //        //Department.find({parent: level2.text}).exec(function (err, foundChildren3) {
                    //        //    if (err) console.log('Level 3',err);
                    //        //    if (!foundChildren3) return res.notFound();
                    //        //    _.forEach(foundChildren3, (value, key3)=> {
                    //        //        let level3 = {};
                    //        //        level3.children = [];
                    //        //        level3.text = value.name;
                    //        //        level3.id = value.id;
                    //        //        level3.parent = value.parent;
                    //        //        level2.children.push(level3);
                    //        //        if(foundChildren3.length == key3+1 && foundChildren2.length == key2+1 && foundChildren1.length == key1+1){
                    //        //            res.ok(root)
                    //        //        }
                    //        //    });
                    //        //});
                    //        if (foundChildren2.length == key2 + 1 && foundChildren1.length == key1 + 1) {
                    //            res.ok(root)
                    //        }
                    //
                    //    });
                    //});
                });
        });
        //});
    }
    //get_old: function (req, res) {
    //    if (!req.session.me) return res.view('public/header', {layout: 'homepage'});
    //    User.findOne({id: req.session.me})
    //        .exec((err, foundUser) => {
    //            if (err) return res.negotiate;
    //            if (!foundUser) return res.notFound();
    //            Department.native(function (err, collection) {
    //                    if (err) return res.serverError(err);
    //
    //                    //sails.log('Поисковая дата:', req.param('sd'));
    //
    //                    collection.aggregate([
    //                            {$match: {'name': 'Генеральный директор'}},
    //                            {
    //                                $graphLookup: {
    //                                    from: "department",
    //                                    startWith: "$childrenObj",
    //                                    connectFromField: "childrenObj",
    //                                    connectToField: "name",
    //                                    maxDepth: 5,
    //                                    as: "reportingHierarchy"
    //                                }
    //                            }])
    //                        .toArray(function (err, results) {
    //                            if (err) return res.serverError(err);
    //                            console.log(results);
    //                            //var obj = {id:22, type:"root", text:'Генеральный директор', children:results};
    //                            //return res.send(obj);
    //                            return res.send(results);
    //                        });
    //                }
    //            )
    //            ;
    //
    //
    //        })
    //}
}
;

