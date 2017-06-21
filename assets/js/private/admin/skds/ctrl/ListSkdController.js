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


                $scope.panesA = [
                    {
                        id: 'pane-1a',
                        header: 'Pane 1',
                        content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.',
                        isExpanded: true
                    },
                    {
                        id: 'pane-2a',
                        header: 'Pane 2',
                        content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
                    },
                    {
                        id: 'pane-3a',
                        header: 'Pane 3',
                        content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',

                        subpanes: [
                            {
                                id: 'subpane-1a',
                                header: 'Subpane 1',
                                content: 'Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.'
                            },
                            {
                                id: 'subpane-2a',
                                header: 'Subpane 2 (disabled)',
                                content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.',
                                isDisabled: true
                            }
                        ]
                    }
                ];

                //$scope.panesB = [
                //    {
                //        id: 'pane-1b',
                //        header: 'Pane 1',
                //        content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.',
                //        isExpanded: true
                //    },
                //    {
                //        id: 'pane-2b',
                //        header: 'Pane 2',
                //        content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
                //    },
                //    {
                //        id: 'pane-3b',
                //        header: 'Pane 3',
                //        content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',
                //
                //        subpanes: [
                //            {
                //                id: 'subpane-1b',
                //                header: 'Subpane 1',
                //                content: 'Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.'
                //            },
                //            {
                //                id: 'subpane-2b',
                //                header: 'Subpane 2 (disabled)',
                //                content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.',
                //                isDisabled: true
                //            }
                //        ]
                //    }
                //];

                $scope.expandCallback = function (index, id) {
                    console.log('expand:', index, id);
                    $scope.idUser = id;
                    console.log('KASSS');
                    console.log($scope.hums);
                    $scope.loadMore2();
                };

                $scope.collapseCallback = function (index, id) {
                    console.log('collapse:', index, id);
                    $scope.hums = [];
                    console.log('FASDAAA');
                    console.log($scope.hums);
                };

                $scope.$on('accordionA:onReady', function () {
                    console.log('accordionA is ready!');
                });


                /**
                 * PAGINATION
                 */
                $scope.defaultRows = 300;
                $scope.limitRows = [300, 500, 700, 1000];
                $scope.currentPage = 1; // инициализируем кнопку постраничной навигации

                $scope.allRowsView = 'загружено:';

                $scope.fioArea = 'ФИО';
                $scope.loginArea = 'Логин';
                $scope.dateArea = 'Дата';
                $scope.startPeriodArea = 'Приход';
                $scope.endPeriodArea = 'Уход';
                $scope.factArea = 'Фактически отработанное время';
                $scope.added = 'Добавить сотрудника';
                $scope.showBt = false; // показать кнопку добавления объекта

                $scope.sort = 'lastName';
                $scope.param = 'date';
                $scope.fieldName = 'Внутренний телефон';
                $scope.charText = '';
                $scope.searchText = '';
                $scope.page_number = 0;
                $scope.limitAll = 1;
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
                        {display: "Accordion", value: "accordion"},
                        {display: "Test", value: "test"},
                        {display: "Работают", value: "work"},
                        {display: "Уволены", value: "list"},
                        {display: "Не активированы / Заблокированы", value: "action"},
                        {display: "Все", value: "table"}
                    ];
                $scope.modeSelect = $scope.options[1];
                $scope.tableView = "/js/private/admin/skds/views/home.admin.skds.table.html";
                $scope.listView = "/js/private/admin/skds/views/home.admin.skds.list.html";
                $scope.actionView = "/js/private/admin/skds/views/home.admin.skds.action.html";
                $scope.workView = "/js/private/admin/skds/views/home.admin.skds.work.html";
                $scope.accordionView = "/js/private/admin/skds/views/home.admin.skds.accordion.html";
                $scope.testView = "/js/private/admin/skds/views/test.html";


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
                $scope.filedName = 'name';


                $scope.$watch('where', function (value) {
                    $scope.refresh(value);
                });

                $scope.refresh = function (where) {
                    if (where) {
                        $scope.where = where;
                    } else {
                        $scope.where = {};
                    }
                    $scope.query = {
                        where: $scope.where,
                        sort: $scope.sort,
                        limit: $scope.limitAll,
                        page: 1,
                        property: 'name',
                        char: $scope.charText + '%'
                    };

                    $scope.items = $scope.objectName = Skds.query($scope.query,
                        function (skds) {
                            $scope.items = skds;
                            $scope.objectName = skds;
                            //$scope.numPages = Math.floor(skds.length / $scope.defaultRows) + 1;
                        }, function (err) {
                            toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                        });
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
                var ty = [];

                $scope.loadMore = function () {
                    for (var i = 0; i < 15; i++) {
                        Skds.query({
                                where: {},
                                limit: 1,
                                page: count
                            },
                            function (skds) {
                                $scope.bats.push({
                                    id: skds[0].id,
                                    lastName: skds[0].lastName,
                                    firstName: skds[0].firstName,
                                    patronymicName: skds[0].patronymicName,
                                    login: skds[0].login,
                                    contacts: skds[0].contacts,
                                    dateInWork: skds[0].dateInWork,
                                    email: skds[0].email,
                                    birthday: skds[0].birthday,
                                    skds: skds[0].skds
                                });
                                $scope.objectName = skds;
                            }, function (err) {
                                toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                            });
                        count += 1;
                    }
                };

                $scope.loadMore();








                $scope.hums = [];
                var counter = 1;
                $scope.loadMore2 = function () {

                    //for (var i = 0; i < 10; i++) {
                    //    $scope.hums.push({date: counter});
                    //    counter += 10;
                    //}


                    for (let u = 0; u < 10; u++) {
                        Skds.query({
                                where: {id:$scope.idUser},
                                limit: 1,
                                page: count
                            },
                            function (skds) {
                                $scope.hums.push({
                                    //id: skds[0].id,
                                    //lastName: skds[0].lastName,
                                    //firstName: skds[0].firstName,
                                    //patronymicName: skds[0].patronymicName,
                                    //login: skds[0].login,
                                    //contacts: skds[0].contacts,
                                    //dateInWork: skds[0].dateInWork,
                                    //email: skds[0].email,
                                    //birthday: skds[0].birthday,
                                    skds: skds[0].skds
                                });
                                $scope.objectName = skds;
                            }, function (err) {
                                toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                            });
                        count += 1;
                    }
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