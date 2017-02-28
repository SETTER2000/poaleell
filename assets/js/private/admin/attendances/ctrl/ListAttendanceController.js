(function (angular) {
    'use strict';
    angular.module('AttendanceModule')
        .controller('ListAttendanceController', ['$scope', '$http', 'moment', 'Attendances', '$state',
            function ($scope, $http, moment, Attendances, $state) {

                $scope.sort = 'date';
                $scope.limitAll = 100;

                $scope.currentPage = 1;

                $scope.selectCount = 0;
                //$scope.tasks=[
                //    {name:'n1'},
                //    {name:'n2'},
                //    {name:'n3'},
                //    {name:'n4'},
                //    {name:'n5'}
                //];
                // var ups = $scope.ups =  Attendances.query();
                //  console.log('UPS1: ');
                //  console.log(ups);
                //  // console.log( $scope.ups.then(onFullField));
                //  ups.$promise.then(onFullField,onReject);
                //
                //  function onFullField(succ){
                //      console.log('DADAD!!!: ');
                //      console.log(succ);
                //
                //      console.log('DADAD!!22!: ');
                //      console.log(succ.filter(action:1);
                //  }

                // function onReject(err) {
                //     console.log('ONreject');
                //     console.log(err);
                // }
                //function doStuff() {
                //    return Attendances.query({limit: $scope.limitAll, sort: $scope.sort})
                //        .then(function (appointments) {
                //            console.log(appointments);
                //            return appointments.length;
                //        });
                //}
                //
                //console.log('COR');
                //console.log(doStuff());
                //}
                //function doStuff() {
                //    return Appointments.findByCat({
                //        catId: $stateParams.catId
                //    }).then(function(appointments) {
                //        console.log(appointments);
                //        return appointments.length;
                //    });
                //}
                //$scope.refresh = function () {
                /**
                 * При обращении к службе $resource возвращается сгенерированный конструктор,
                 * дополненный методами для взаимодействия с конечной точкой
                 * RESTful: query, get, save и delete.
                 */
                // Сортировка наоборот sort: 'name DESC'

                    $scope.items = Attendances.query({limit: $scope.limitAll, sort: $scope.sort}, function (attendances) {
                        $scope.attendances = attendances;
                        $scope.numPages = attendances.length;
                        console.log('ATTENDANCES: ');
                        console.log($scope.attendances);
                        console.log($scope.attendances.length);
                        // $scope.items = attendances;
                        // $scope.differ(attendances);


                        //console.log($scope.items);
                        // console.log( $scope.attendances.filter({"action": 1}));
                        // console.log(attendances.get({"action": 1},function (success) {
                        //     console.log('URAAA:');
                        //     alert('5685');
                        //     console.log(success);
                        // },function (err) {
                        //     alert('ERRRRRR');
                        //     console.log(err);
                        // }));
                        // кол-во пользователей
                        // console.log($scope.attendances.length);
                        //console.log(attendances.scs());
                    });



                console.log($scope.items);

                $scope.getTargetUser = function (item) {
                    // $scope.attendances = Attendances.query({}, function (attendances) {
                    //     console.log('attendances^^');
                    //         console.log(attendances);
                    // });
                    // $scope.items = [];
                    // console.log("ITEMMM");
                    // console.log(item);
                    // item.limit=30;
                    $http.post('/att', item)
                    // $scope.attendances = Attendances.query(item, function (attendance) {
                        .then(function (attendance) {
                            console.log('attendance^^');
                            console.log(attendance);

                            $scope.differ(attendance);
                            console.log('DDD:');
                            console.log($scope.items);

                            $scope.numPages = Math.floor($scope.items.length / $scope.defaultRows) + 1;
                        });
                    // $scope.query = {"lname": lname};
                    // $scope.refreshAttendance({where:{"employees.fname": "Александр"}});
                    // $scope.refreshAttendance({
                    //     where: {"employees":[{"lname": lname}]},
                    //     sort: 'date',
                    //     limit: $scope.limitAll
                    // });
                    // $scope.refreshAttendance({"dateid": [{"lname": lname}]});
                };
                // $http.get('/att', {})
                // // $scope.attendances = Attendances.query(item, function (attendance) {
                //     .then(function (attendance) {
                //         console.log('attendance^^');
                //         console.log(attendance);
                //
                //         $scope.differ(attendance);
                //         console.log('DDD:');
                //         console.log($scope.items);
                //
                //         $scope.numPages = Math.floor($scope.items.length / $scope.defaultRows) + 1;
                //     });
                $scope.differ = function (attendance) {
                    var data = [];
                 
                    for (var i = 0; i < attendance.data.length; i++) {
                        (function () { // каждая созданная функция будет работать со своей локальной переменной.
                            var local = i;
                            var a, b, df;
                            a = moment(attendance.data[local].date + ' ' + attendance.data[local].time_in, ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
                            b = moment(attendance.data[local].date + ' ' + attendance.data[local].time_out, ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
                            df = b.diff(a, 'm');
                            data.push({
                                'getFullName': function () {
                                    return this.lname + ' ' + this.fname + ' ' + this.pname;
                                },
                                getContact: function (fieldName) {
                                    return this.date;
                                },
                                'patronymicName': attendance.data[local].pname,
                                'lastName': attendance.data[local].lname,
                                'firstName': attendance.data[local].fname,
                                'date': attendance.data[local].date,
                                'birthday': attendance.data[local].time_in,
                                'login': attendance.data[local].time_out,
                                'email': attendance.data[local].email,
                                'diff': df
                            });
                        })(); // immediately invoked function expression (IIFE)
                    }
                    $scope.items =  data;
                };

                //$scope.items.currentPage=0;
                //$scope.sections =   $scope.attendances.sections();
                $scope.propertyName = 'fio';
                $scope.reverse = false;
                // $scope.friends = friends;


                $scope.sortBy = function (propertyName) {
                    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                    $scope.propertyName = propertyName;
                };


                // конструктор хлебных крошек
                function BreadCrumb() {
                    var name;
                    var path;
                    this.arr = [];
                }

                BreadCrumb.prototype.add = function () {
                    this.arr.push({name: this.name, path: this.path});
                };
                BreadCrumb.prototype.set = function (name, path) {
                    this.name = name;
                    this.path = path;
                    this.add();
                };
                BreadCrumb.prototype.getAll = function () {
                    return this.arr;
                };

                var breadcrumb = new BreadCrumb();
                breadcrumb.set('Home', '/');
                breadcrumb.set('Admin', '/admin');
                breadcrumb.set('Attendances', '/attendances/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;

                $scope.tug = function () {
                    $scope.gle = $scope.gle ? false : true;
                };


                // $scope.refresh();

            }

        ])
    ;
})(window.angular);