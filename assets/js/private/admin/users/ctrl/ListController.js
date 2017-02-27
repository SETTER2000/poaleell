(function (angular) {
    'use strict';
    angular.module('UserModule')
        .controller('ListController', ['$scope', 'moment', '$http', "$rootScope", '$state', 'Users', 'Attendances', '$window', function ($scope, moment, $http, $rootScope, $state, Users, Attendances) {
            /**
             * PAGINATION
             */
            $scope.defaultRows = 50;
            $scope.limitRows = [30, 50, 70, 100];
            $scope.currentPage = 1;

            $scope.fioArea = 'ФИО';
            $scope.drArea = 'ДР';
            $scope.loginArea = 'Логин';
            $scope.emailArea = 'Email';
            // $scope.fio = 'ФИО';
            // $scope.fio = 'ФИО';
            // $scope.fio = 'ФИО';

            $scope.sort = 'lastName';
            $scope.param = 'lastName';
            $scope.fieldName = 'Внутренний телефон';
            $scope.charText = '';
            $scope.searchText = '';
            $scope.page_number = 0;
            $scope.limitAll = 1000;
            $scope.where = {};
            $scope.alfavit = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
            //$scope.arrButton = [];
            $scope.enabledButton = false;
            $scope.styleObj = {
                color: false,
                border: false,
                size: false
            };


            //$scope.days = moment.duration(2).days();
            //$scope.hours = moment.duration(2).hours();
            //$scope.month = moment.duration().months();
            //$scope.months = moment.duration().asMonths();
            //$scope.seconds = moment.duration(1000).seconds();
            //var a = moment('2016-01-21 09:38:00', ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
            //var b = moment('2016-01-21 13:54:00', ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
            //$scope.diff = b.diff(a, 'm');
            //$scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
            //$scope.local = moment().local().format("ddd, hA");
            //$scope.local = moment().local().format("dddd, MMMM Do YYYY, h:mm:ss a");
            //$scope.localTime = moment().local().format();
            //$scope.localTime = moment.parseZone('2016-05-03T22:15:01+02:00').local().format();
            //$scope.localTime = moment().utc().local().hours();
            //var start = moment([2007, 0, 5]);
            //var end = moment([2007, 0, 10]);
            //end.from(start);       // "in 5 days"
            //$scope.end = end.from(start, true); // "5 days"


            $scope.message = {
                text: 'hello world!',
                time: new Date()
            };
            // $scope.calendar = moment().calendar(null, {
            //     sameDay: function (now) {
            //         if (this.isBefore(now)) {
            //             return '[Случится Сегодня]';
            //         } else {
            //             return '[Произошло сегодня]';
            //         }
            //         /* ... */
            //     }
            // });


            $scope.getLastName = function (item) {
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
                            'pname': attendance.data[local].pname,
                            'lname': attendance.data[local].lname,
                            'fname': attendance.data[local].fname,
                            'date': attendance.data[local].date,
                            'birthday': attendance.data[local].time_in,
                            'login': attendance.data[local].time_out,
                            'email': attendance.data[local].email,
                            'diff': df
                        });
                    })(); // immediately invoked function expression (IIFE)
                }
                $scope.items = data;
            };
            // $scope.refreshAttendance = function (query) {
            //     // 'SELECT * FROM employees AS e LEFT JOIN attendance_employees AS ae ON e.id = ae.employees_id LEFT JOIN attendance AS a ON a.id=ae.attendance_id WHERE a.date > "2017-02-01"'
            //     $scope.attendances = Attendances.query(query, function (attendances) {
            //         $scope.numPages = Math.floor(attendances.length / $scope.defaultRows) + 1;
            //         $scope.items = attendances;
            //         // $scope.numPages = attendances.length;
            //         console.log('ATTENDANCES: ');
            //         console.log($scope.attendances);
            //         console.log($scope.attendances.length);
            //         //console.log($scope.items);
            //         // console.log( $scope.attendances.filter({"action": 1}));
            //         // console.log(attendances.get({"action": 1},function (success) {
            //         //     console.log('URAAA:');
            //         //     alert('5685');
            //         //     console.log(success);
            //         // },function (err) {
            //         //     alert('ERRRRRR');
            //         //     console.log(err);
            //         // }));
            //         // кол-во пользователей
            //         // console.log($scope.attendances.length);
            //         //console.log(attendances.scs());
            //     });
            // };

            // console.log(Users);
            //console.log('STATE: ');
            //console.log( $state.get());
            $scope.refresh = function (where) {
                if (where) {
                    $scope.where = where;
                } else {
                    $scope.where = {};
                }
                $scope.query = {
                    where: $scope.where,
                    sort: $scope.sort,
                    limit: $scope.limitAll
                };

                $scope.items = Users.query($scope.query,
                    function (users) {
                        // $scope.lengthObject = users.length;
                        $scope.numPages = Math.floor(users.length / $scope.defaultRows) + 1;
                    });
            };


            $scope.getCharText = function (ch) {
                console.log(ch);
                var where = {};
                if (angular.isString(ch)) {
                    where = {"lastName": {'like': ch + '%'}};
                    $scope.charText = ch;
                } else {
                    // $scope.defaultRows;
                    $scope.charText = '';
                }
                $scope.refresh(where);
            };
            $scope.getMode = function (t) {
                // console.log('DDDDDD');
                // console.log(t);
                if (t) {
                    $scope.refresh({"fired": false});
                    $scope.t = false;
                } else {
                    $scope.refresh({"fired": true});
                    $scope.t = true;
                }
            };

            $scope.getPage = function (num) {
                $scope.page_number = num;
            };


            $scope.delete = function (item) {
                //console.log(item);
                item.$delete(item, function (success) {
                    //console.log(success);
                    $scope.refresh();
                    // $scope.items.splice($scope.items.indexOf(item), 1);
                }, function (err) {
                    console.log(err);
                    // alert();
                })
            };

            $scope.propertyName = 'lastName';
            $scope.reverse = false;
            // $scope.friends = friends;

            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };


            $scope.msd = ['settings', 'home', 'options', 'other'];
            $scope.selectionMode = $scope.msd[0];

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
            breadcrumb.set('Users', '/admin/' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            $scope.refresh();
        }]);
})(window.angular);