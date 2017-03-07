angular.module('AttendanceModule', ['ui.router', 'ngResource', 'ngAnimate', 'angularMoment'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.attendances', {
                url: '/attendances',
                //template:'<h1>Attendances</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
                        controller: 'ListAttendanceController'
                        //template:'<h1>DEPARTAMENT</h1>'
                    }
                }
                //views: {
                //    '@': {
                //        template: function($stateParams) {
                //            return '<div>Category:' + $stateParams.catId + '<ui-view/></div>';
                //        },
                //        controller: function() {}
                //
                //    }
                //}
            })
            .state('home.admin.attendances.edit', {
                url: '/edit/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
            //.state('home.admin.depart', {
            //    url: '/depart/:attendanceId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //            controller: 'EditAttendanceController'
            //        }
            //    }
            //})
            .state('home.admin.attendance', {
                url: '/attendance/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/show.tpl.html',
                        controller: 'AttendanceController'
                    }
                }
            })
            .state('home.admin.attendances.create', {
                url: '/create/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
            .state('home.admin.attendances.calendar', {
                url: '/calendar/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/show.tpl.html',
                        controller: 'CalendarController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE_Attendance', {baseUrl: '/attendance/:attendanceId'})
    .factory('Attendances', function ($resource, CONF_MODULE_Attendance) {
        var Attendances = $resource(
            CONF_MODULE_Attendance.baseUrl,
            {attendanceId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Attendances.prototype.getFullName = function () {
            return this.employees[0].lname + ' ' + this.employees[0].fname + ' ' + this.employees[0].pname;
        };

        Attendances.prototype.getLastName = function () {
            return this.employees[0].lname ;
        };
        Attendances.prototype.getFirstName = function () {
            return this.employees[0].fname ;
        };
        Attendances.prototype.getPatronymicName = function () {
            return this.employees[0].pname ;
        };

        Attendances.prototype.sc = function () {
            return this.section;
        };
        Attendances.prototype.scs = function () {
            return this.sections;
        };

        Attendances.prototype.ok = function () {
            return alert(this.section + ': ' + this.name + ' изменён!');
        };
        Attendances.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name + ' - изменения не приняты!');
        };
        Attendances.prototype.getListUrl = function () {
            return '/admin/attendances';
        };
        Attendances.prototype.getEditUrl = function (id) {
            return '/admin/attendances/edit/' + id;
        };
        Attendances.prototype.getShowUrl = function (id) {
            return '/admin/attendance/' + id;
        };
        Attendances.prototype.getCreateUrl = function () {
            return '/admin/attendances/create';
        };
        Attendances.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Attendances.prototype.getNamePage = function () {
            return 'Посещаемость';
        };

        return Attendances;
    })
    .directive("fieldList", function () {
        return function (scope, element, attributes) {
            var data = scope[attributes["fieldList"]];
            var expression = attributes["displayProperty"];
            data.$promise.then(onFulfilled, onRejected);
            function onFulfilled(data) {
                //console.log('PROMISE');
                //console.log(data.length);
                //console.log(data);

                if (angular.isArray(data)) {
                    var e = angular.element("<ol>");
                    element.append(e);
                    for (var i = 0; i < data.length; i++) {

                        // scope.$eval([expression], [locals]) выполняет выражение на текущем scope
                        // [expression] выражение которое нужно выполнить
                        // [locals] объект который содержит переменные для переопределения значений в scope

                        e.append(angular.element('<li>').text(scope.$eval(expression, data[i])));
                        //e.append(angular.element('<li>').text(data[i][expression]));
                    }
                }

            }

            function onRejected(err) {
                console.log(err.message);
            }

        }
    })
    .directive("attendanceList", function () {
        return {
            link: function (scope, element, attributes) {
                scope.data = scope[attributes["attendanceList"]];
                console.log('DIRECTIVES-1:');
                //console.log(scope[attributes["attendanceList"]]);
                console.log(scope.data);
                console.log(scope.length);
                scope.data.$promise.then(rejectFull);

                function rejectFull(t) {
                    scope.data = [];
                    scope.fio = [];
                    //console.log('PROMISE^^^');
                    //console.log(t.length);

                    if (angular.isArray(t) && t.length > 0) {
                        for (var y = 0; y < t.length; y++) {
                            scope.fio.push(t[y].getFullName());

                        }
                        //[{
                        //    fio: [{
                        //        id: t[i].id,
                        //        date: t[i].date,
                        //        time_in: t[i].time_in,
                        //        time_out: t[i].time_out,
                        //        fio: t[i].getFullName()
                        //    }
                        //    ]
                        //}]
                        for (var i = 0; i < t.length; i++) {
                            scope.data.push(
                                {
                                    id: t[i].id,
                                    date: t[i].date,
                                    time_in: t[i].time_in,
                                    time_out: t[i].time_out,
                                    fio: t[i].getFullName(),
                                    lastName: t[i].getLastName(),
                                    firstName: t[i].getFirstName(),
                                    patronymicName: t[i].getPatronymicName()
                                }
                            );
                        }

                        console.log('DATA:');
                        console.log(scope.data);
                    }
                }

                //if (angular.isArray(data) && data.length > 0) {
                //    console.log('DIRECTIVES-2:');
                //    console.log(data.length);
                //    //console.log(data.getFullName());
                //    //console.log(data[0].id);
                //    //var e = angular.element('<tr>');
                //    //element.append(e);
                //    //console.log('DIRECTIVES2:');
                //    //console.log(data);
                //    for (var i = 0; i < data.length; i++) {
                //        console.log('DIRECTIVES23:');
                //        console.log(data[i].id);
                //        newData.push({id: data[i].id});
                //
                //
                //        //(function () {
                //        //    var item = angular.element('<td>');
                //        //    e.append(item);
                //        //    //var index = i;
                //        //    //var watcherFunction = function (watchScope) {
                //        //    //    return watchScope.$eval(expression, data[index]);
                //        //    //};
                //        //    //// scope.$watch - Устанавливаем отслеживание изменений в scope на основе watcherFunction, которая возвращает значение с учетом фильтров.
                //        //    //// Функция будет вызываться каждый раз, когда меняется scope.
                //        //    //// Если функция возвращает новое значение, то элемент отображающий это значение обновляется.
                //        //    //scope.$watch(watcherFunction, function (newValue, oldValue) {
                //        //    //    item.text(newValue);
                //        //    //});
                //        //}());
                //    }
                //
                //}
            },
            restrict: "A",
            templateUrl: function (element, attributes) {
                var list = '/js/private/admin/attendances/tpl/views/view.list.html';
                var table = '/js/private/admin/attendances/tpl/views/view.table.html';
                // выбор внешнего шаблона на основе атрибута template
                return attributes["template"] == "table" ? table : list;
            },
            scope: true  // каждый экземпляр директивы должен работать со своим scope и наследовать scope своего контроллера
            // scope:{} // В данном случае директива создается с изолированным scope - данный scope не участвует в наследовании.

            // true - элемент, которому будет присвоена директива будет заменен разметкой сгенерированной по шаблону
            // false - в элемент, к которому присвоена директива, будет добавлена разметка
            // Для того, чтобы увидеть эффект работы директивы, необходимо открыть инспектор DOM в браузере
            //replace:true
        }
    })

    .directive("customDirective", function () {
        return function (scope, element, attributes) {
            // element - jqLite объект
            var elements = element.children(); // получение всех дочерних элементов
            //console.log('JQL');
            //console.log(elements.length);
            //console.log(elements.eq(1));
            //console.log(elements.eq(1).val());
            for (var i = 0; i < elements.length; i++) {
                //console.log(elements.eq(i).text());
                // если элемент содержит текст Red сделать его красным цветом
                if (elements.eq(i).text() == "Абрамов Александр Павлович") {
                    elements.eq(i).css("color", "red");
                }
            }
        }
    })
    .directive('button', function () {
        return {
            restrict: 'E',
            compile: function (element, attributes) {
                element.addClass('btn');
                if (attributes.type === 'submit') {
                    element.addClass('btn-default');
                }
                if (attributes.size) {
                    element.addClass('btn-' + attributes.size);
                }
            }
        };
    })
    //.directive('pagination', function () { // функция компиляции директивы (фабричная функция)
    //    return {
    //        restrict: 'E',
    //        scope: {
    //            numPages: '=', // кол-во страниц (кнопок)
    //            defaultRows: '=', // по умолчанию сколько строк должно показываться на одной странице
    //            limitRows: '=',  // массив содержащий значения кол-ва строк для одной страницы [20,30,50,70,100]
    //            lengthObject: '=', // кол-во объектов в обрабатываемой коллекции объектов
    //            currentPage: '=',
    //            onSelectPage: '&'
    //        },
    //        templateUrl: '/js/private/admin/attendances/tpl/views/pagination.html',
    //        replace: true,
    //        link: function (scope) {
    //            scope.$watch('numPages', function (value) {
    //                scope.pages = [];
    //                for (var i = 1; i <= value; i++) {
    //                    scope.pages.push(i);
    //                }
    //                if (scope.currentPage > value) {
    //                    scope.selectPage(value);
    //                }
    //            });
    //            scope.$watch('limitRows', function (value) {
    //                scope.rows = [];
    //                for (var i = 0; i <= value.length; i++) {
    //                    scope.rows.push(value[i]);
    //                }
    //            });
    //            scope.$watch('defaultRows', function (value, oldValue) {
    //                if (value > 0) {
    //                    scope.defaultRows = value;
    //                    scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
    //                }
    //            });
    //            scope.noPrevious = function () {
    //                return scope.currentPage === 1;
    //            };
    //            scope.noNext = function () {
    //                return scope.currentPage === scope.numPages;
    //            };
    //            scope.isActive = function (page) {
    //                return scope.currentPage === page;
    //            };
    //            scope.isActiveRow = function (row) {
    //                return scope.defaultRows === row;
    //            };
    //            scope.selectPage = function (page) {
    //                if (!scope.isActive(page)) {
    //                    scope.currentPage = page;
    //                    scope.onSelectPage({page: page});
    //                }
    //            };
    //            scope.selectPrevious = function () {
    //                if (!scope.noPrevious()) {
    //                    scope.selectPage(scope.currentPage - 1);
    //                }
    //            };
    //            scope.selectNext = function () {
    //                if (!scope.noNext()) {
    //                    scope.selectPage(scope.currentPage + 1);
    //                }
    //            };
    //            scope.getLimitRows = function (limitRows) {
    //                scope.defaultRows = limitRows;
    //                if (scope.lengthObject <= scope.defaultRows) {
    //                    scope.numPages = 1;
    //                } else {
    //                    scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
    //                }
    //            };
    //        }
    //    };
    //})
;