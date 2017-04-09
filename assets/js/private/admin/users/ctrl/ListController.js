(function (angular) {
    'use strict';
    angular.module('UserModule')
        .controller('ListController', ['$scope', '$location','moment', '$http', 'toastr',"$rootScope", '$state', 'Users', 'Attendances', '$window', function ($scope,$location, moment, $http, toastr, $rootScope, $state, Users, Attendances) {
            $scope.me = window.SAILS_LOCALS.me;
            if(!$scope.me.kadr ) $location.path('/') ;
            //toastr.options = {
            //    "closeButton": false,
            //    "debug": false,
            //    "newestOnTop": false,
            //    "progressBar": false,
            //    "positionClass": "toast-top-full-width",
            //    "preventDuplicates": true,
            //    "onclick": null,
            //    "showDuration": "300",
            //    "hideDuration": "1000",
            //    "timeOut": "5000",
            //    "extendedTimeOut": "1000",
            //    "showEasing": "swing",
            //    "hideEasing": "linear",
            //    "showMethod": "fadeIn",
            //    "hideMethod": "fadeOut"
            //};


            /**
             * PAGINATION
             */
            $scope.defaultRows = 50;
            $scope.limitRows = [30, 50, 70, 100];
            $scope.currentPage = 1; // инициализируем кнопку постраничной навигации

            $scope.fioArea = 'ФИО';
            $scope.drArea = 'ДР11';
            $scope.loginArea = 'Логин';
            $scope.emailArea = 'Email';
            $scope.departmentArea = 'Отдел';
            $scope.positionArea = 'Должность';
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

            // $scope.items = [{ name: "Item 1", value: "10" },
            //     { name: "Item 2", value: "2" },
            //     { name: "Item 3", value: "31" }];

            if (moment().isLeapYear()) {
                $scope.yearLeap = 'Да!';
            } else {
                $scope.yearLeap = 'Нет';
            }

            $scope.yearLeap = moment(1316116057189).fromNow();

            $scope.message = {
                text: 'hello world!',
                time: new Date()
            };

            $scope.calendar = moment().calendar(null, {
                sameDay: function (now) {
                    if (this.isBefore(now)) {
                        return '[Случится Сегодня]';
                    } else {
                        return '[Произошло сегодня]';
                    }
                    /* ... */
                }
            });

            $scope.options =
                [
                    {display: "Все", value: "table"},
                    {display: "Уволены", value: "list"},
                    {display: "Не активированы / Заблокированы", value: "action"}
                ];
            $scope.modeSelect = $scope.options[0];
            $scope.tableView = "/js/private/admin/users/views/home.admin.users.table.html";
            $scope.listView = "/js/private/admin/users/views/home.admin.users.list.html";
            $scope.actionView = "/js/private/admin/users/views/home.admin.users.action.html";
            //$scope.calendarView = "/js/private/admin/users/views/home.admin.users.calendar.html";
            //$scope.budgeView = "/js/private/admin/users/views/home.admin.users.budge.html";

            // $scope.url = $scope.tableView;
            //
            // $scope.showList = function () {
            //     $scope.url = $scope.listView;
            // }
            //
            // $scope.showTable = function () {
            //     $scope.url = $scope.tableView;
            // }

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
                        var a, b;
                        a = moment(attendance.data[local].time_in, ['HH:mm:ss']);
                        b = moment(attendance.data[local].time_out, ['HH:mm:ss']);

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
                            'diff': $scope.getTimeFormatMilliseconds(b.diff(a), 1, 'Неизвестно')
                        });
                    })(); // immediately invoked function expression (IIFE)
                }
                $scope.items = data;
            };

            /**
             * Проверка на точное соответствие аргумента n числу
             * @param n
             * @returns {boolean}
             */
            $scope.isNumeric = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };

            $scope.getTimeFormatMilliseconds = function (milliseconds, secondAdd, mess) {
                if ($scope.isNumeric(milliseconds)) {
                    var a = {};
                    var sec;
                    sec = (secondAdd) ? ':00' : '';
                    // всего минут
                    a.min = (milliseconds / 1000) / 60;
                    // минуты после целого, т.е. часов
                    a.minCeil = (a.min % 60);
                    // Добавляем ведущий ноль
                    a.minCeil = (a.minCeil < 10) ? ('0' + a.minCeil) : a.minCeil;
                    a.hoursCeil = Math.floor(a.min / 60); // минуты после целого, т.е. часов
                    // Добавляем ведущий ноль (один час был: 1 стал 01)
                    a.hoursCeil = (a.hoursCeil < 10) ? ('0' + a.hoursCeil) : a.hoursCeil;
                    milliseconds = a.time = a.hoursCeil + ':' + a.minCeil + sec;
                } else {
                    // Сообщение если отсутствует значение или оно не корректно
                    milliseconds = mess;
                }
                return milliseconds;
            };

            $scope.str = 'Петров';
            $scope.countChar = '4';
            $scope.filedName = 'lastName';

            //$scope.objectName =[
            //    {'lastName':'Петров', 'firstName':'Gena1'},
            //    {'lastName':'Васюков', 'firstName':'Gena2'},
            //    {'lastName':'Гавнюков', 'firstName':'Gena3'}
            //];
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
            $scope.$watch('where', function (value) {

                $scope.refresh(value);

            });
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
                        console.log('ITEMS QUERY');
                        $scope.items = users;
                        // $scope.lengthObject = users.length;
                        console.log(users);
                        $scope.objectName = users;
                        $scope.numPages = Math.floor(users.length / $scope.defaultRows) + 1;
                    }, function(err){
                        toastr.error(err,'Ошибка77!');
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