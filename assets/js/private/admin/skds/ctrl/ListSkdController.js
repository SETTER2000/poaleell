(function (angular) {
    'use strict';
    angular.module('SkdModule')
        .controller('ListSkdController', ['$scope', '$location', 'moment', '$http', 'toastr', "$rootScope", '$state', 'Skds', '$window',
            function ($scope, $location, moment, $http, toastr, vAccordion, $state, Skds) {
                $scope.me = window.SAILS_LOCALS.me;
                if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
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


                $scope.expandCallback = function (index, id) {
                    //console.log('expand:', index, id);
                    $scope.idUser = id;
                    //console.log('KASSS');
                    //console.log($scope.hums);

                };

                $scope.collapseCallback = function (index, id) {
                    $scope.hums = [];
                };

                $scope.$on('accordionA:onReady', function () {
                    console.log('accordionA is ready!');

                });

                $scope.$on('nestedAccordionA:onReady', function (id) {
                    console.log('nestedAccordionA is ready!');
                    console.log(id);
                });


                /**
                 * PAGINATION
                 */
                $scope.defaultRows = 100;
                $scope.limitRows = [300, 500, 700, 1000];
                $scope.currentPage = 1; // инициализируем кнопку постраничной навигации

                $scope.allRowsView = 'загружено:';

                $scope.fioArea = 'ФИО';
                $scope.loginArea = 'Логин';
                $scope.dateArea = 'Дата';
                $scope.startPeriodArea = 'Приход';
                $scope.endPeriodArea = 'Уход';
                $scope.factArea = 'Отработанное время';
                $scope.added = 'Добавить сотрудника';
                $scope.showBt = false; // показать кнопку добавления объекта

                $scope.sortField = 'name'; // поле сортировки
                $scope.sortTrend = 1; // направление сортировки
                $scope.param = 'date';
                $scope.fieldName = 'Внутренний телефон';
                $scope.charText = '';
                $scope.searchText = '';
                $scope.page_number = 0;
                $scope.limitAll = 3000;
                $scope.where = {};
                $scope.alfavit = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
                $scope.enabledButton = false;
                $scope.styleObj = {
                    color: false,
                    border: false,
                    size: false
                };


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

                $scope.sortRevers = function (field) {
                    $scope.sortTrend = (+$scope.sortTrend > 0) ? -1 : 1;
                    // $scope.reverse = ($scope.sortTrend) ? !$scope.reverse : false;
                    // $scope.propertyName = field;
                    $scope.sortField = field;
                    $scope.refresh();
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
                        {display: "Отработанное время", value: "accordion"},
                        {display: "Работают", value: "work"}
                        // {display: "Test", value: "test"},
                        // {display: "Уволены", value: "list"},
                        // {display: "Не активированы / Заблокированы", value: "action"},
                        // {display: "Все", value: "table"}
                    ];
                $scope.modeSelect = $scope.options[0];

                $scope.workView = "/js/private/admin/skds/views/home.admin.skds.work.html";
                $scope.accordionView = "/js/private/admin/skds/views/home.admin.skds.accordion.html";
                // $scope.testView = "/js/private/admin/skds/views/test.html";
                // $scope.tableView = "/js/private/admin/skds/views/home.admin.skds.table.html";
                // $scope.listView = "/js/private/admin/skds/views/home.admin.skds.list.html";
                // $scope.actionView = "/js/private/admin/skds/views/home.admin.skds.action.html";


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
                    sails.log('data:');
                    sails.log(data);
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
                $scope.filedName = '_id.name';


                $scope.$watch('where', function (value) {
                    $scope.refresh(value);
                });
                $scope.sd = '';

                $scope.toggleBlur = function (mx) {
                    $scope.start = moment(mx).hours(0).minutes(0).seconds(0).milliseconds(0);
                    $scope.refresh();
                };

                $scope.refresh = function (where) {
                    if (where) {
                        $scope.where = where;
                    } else {
                        $scope.where = {};
                    }
                    $scope.query = {
                        where: $scope.where,
                        sortField: $scope.sortField,
                        sortTrend: $scope.sortTrend,
                        limit: $scope.limitAll,
                        page: 0,
                        //sd:'',
                        sd:  $scope.start,
                        property: 'name',
                        char: $scope.charText + '%'
                    };
                    Skds.query($scope.query,
                        function (response) {
                            console.log(response);
                            $scope.items = response;
                            $scope.objectName = response;
                        }, function (err) {
                            toastr.error(err.data.details, 'Ошибка 77! ' + err.data.message);
                        });

                    //$scope.items = $scope.objectName = Skds.query($scope.query,
                    //    function (skds) {
                    //        $scope.items = skds;
                    //        $scope.objectName = skds;
                    //        //$scope.numPages = Math.floor(skds.length / $scope.defaultRows) + 1;
                    //    }, function (err) {
                    //        toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                    //    });
                };

                $scope.getMode = function (t) {
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
                    item.$delete(item, function (success) {
                        $scope.refresh();
                    }, function (err) {
                        console.log(err);
                    })
                };

                $scope.propertyName = 'lastName';
                $scope.propertyName2 = 'date';

                $scope.reverse = false;

                $scope.sortBy = function (propertyName) {
                    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                    $scope.propertyName = propertyName;
                };

                $scope.msd = ['settings', 'home', 'options', 'other'];

                $scope.selectionMode = $scope.msd[0];


                /**
                 *  Конструктор хлебных крошек
                 * @constructor
                 */
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
                breadcrumb.set('Skds', '/admin/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;

                $scope.bats = [];

                var count = 1;


                //$scope.loadMore = function () {
                //    for (var i = 0; i < 15; i++) {
                //        Skds.query({
                //                where: {},
                //                limit: 1,
                //                page: count
                //            },
                //            function (skds) {
                //                $scope.bats.push({
                //                    id: skds[0].id,
                //                    lastName: skds[0].lastName,
                //                    firstName: skds[0].firstName,
                //                    patronymicName: skds[0].patronymicName,
                //                    login: skds[0].login,
                //                    contacts: skds[0].contacts,
                //                    dateInWork: skds[0].dateInWork,
                //                    email: skds[0].email,
                //                    birthday: skds[0].birthday,
                //                    skds: skds[0].skds
                //                });
                //                $scope.objectName = skds;
                //            }, function (err) {
                //                toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                //            });
                //        count += 1;
                //    }
                //};
                var o = function (t) {
                    return t.getUTCFullYear() + '-' + t.getMonth() + '-' + t.getUTCDate() + 'T' + t.getUTCHours() + ':' + t.getUTCMinutes() + ':' + t.getUTCSeconds();
                };
                //var t = new Date("2017-06-22T10:03:00Z");
                //console.log('DDDDDDDDDDDDDD');
                ////console.log(t );

                var day = moment("2017-06-22T10:03:00Z").utc().format('LT');
                console.log(day);

                //$scope.loadMore();
                var cnt = 0;
                $scope.ty = [];


                //$scope.loadTest = function () {
                //    for (var i = 0; i < 10; i++) {
                //        Skds.query({
                //                where: {},
                //                limit: 10,
                //                page: 0
                //            },
                //            function (aggreg) {
                //                console.log(aggreg);
                //                $scope.items = aggreg;
                //                //$scope.objectName = aggreg;
                //            }, function (err) {
                //                toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                //            });
                //        cnt += 1;
                //    }
                //};

                //$scope.loadTest();


                $scope.hums = [];
                var counter = 1;
                $scope.loadMore2 = function () {

                    //for (var i = 0; i < 10; i++) {
                    //    $scope.hums.push({date: counter});
                    //    counter += 10;
                    //}


                    //for (let u = 0; u < 10; u++) {
                    //    Skds.query({
                    //            where: {id:$scope.idUser},
                    //            limit: 1,
                    //            page: counter
                    //        },
                    //        function (response) {
                    //            //console.log(' skds: skds[0]');
                    //            //console.log(response[0].skds[0].date);
                    //            $scope.hums.push({
                    //                //id: skds[0].id,
                    //                //lastName: skds[0].lastName,
                    //                //firstName: skds[0].firstName,
                    //                //patronymicName: skds[0].patronymicName,
                    //                //login: skds[0].login,
                    //                //contacts: skds[0].contacts,
                    //                //dateInWork: skds[0].dateInWork,
                    //                //email: skds[0].email,
                    //                //birthday: skds[0].birthday,
                    //                skds: response[0].skds[0]
                    //            });
                    //            $scope.objectName = response;
                    //        }, function (err) {
                    //            toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                    //        });
                    //    counter += 1;
                    //}
                };

                //$scope.hums = Skds.query({
                //        sort: 'lastName',
                //        limitAll: 100
                //    },
                //    function (skds) {
                //        $scope.hums = skds;
                //        $scope.objectName = skds;
                //        //$scope.numPages = Math.floor(skds.length / $scope.defaultRows) + 1;
                //    }, function (err) {
                //        toastr.error(err.data.details, 'Ошибка8444! ' + err.data.message);
                //    });

                $scope.loadMore2();

            }]);
})(window.angular);