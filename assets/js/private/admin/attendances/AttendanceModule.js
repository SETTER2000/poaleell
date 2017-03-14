angular.module('AttendanceModule', ['ui.router', 'ngResource', 'ngAnimate', 'angularMoment'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.attendances', {
                url: '/attendances',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
                        controller: 'ListAttendanceController'
                    }
                }
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
            .state('home.admin.attendance', {
                url: '/attendance/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/show.tpl.html',
                        controller: 'AttendanceController'
                    }
                }
            })
            .state('home.admin.attendance.show', {
                url: '/show',
                views: {
                    '@home.admin.attendance': {
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
                url: '/calendar',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/show.tpl.html',
                        controller: 'CalendarAttendanceController'
                    }
                }
            })
            .state('home.admin.attendances.calendar.месяц', {
                url: '/месяц',
                views: {
                    '@home.admin.attendances.calendar': {
                        //templateUrl: '/js/private/admin/calendars/tpl/show.tpl.html',
                        templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('home.admin.attendances.calendar.неделя', {
                url: '/неделя',
                views: {
                    '@home.admin.attendances.calendar': {
                        templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('home.admin.attendances.calendar.tbody', {
                url: '/calendar/tbody',
                views: {
                    'tbody@home.admin.attendances.calendar': {
                        templateUrl: '/js/private/admin/attendances/tpl/views/view.tbody.html',
                        controller: 'CalendarAttendanceController'
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
        Attendances.prototype.getShortName = function () {
            return this.employees[0].lname + ' ' + this.employees[0].fname.substr(0,1) + '.' + this.employees[0].pname.substr(0,1)+'.';
        };

        Attendances.prototype.getLastName = function () {
            return this.employees[0].lname;
        };
        Attendances.prototype.getFirstName = function () {
            return this.employees[0].fname;
        };
        Attendances.prototype.getPatronymicName = function () {
            return this.employees[0].pname;
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
                console.log(scope.data.length);
                scope.data.$promise.then(rejectFull);

                function rejectFull(t) {

                    scope.data = [];
                    scope.prevData = [];
                    scope.fio = [];
                    if (angular.isArray(t) && t.length > 0) {
                        for (var y = 0; y < t.length; y++) {
                            scope.fio.push(t[y].getFullName());
                        }
                        for (var i = 0; i < t.length; i++) {
                            var intv = moment(t[i].date + " " + t[i].time_in, 'YYYY-MM-DD HH:mm');
                            var outv = moment(t[i].date + " " + t[i].time_out, 'YYYY-MM-DD HH:mm');
                            var subs = outv.diff(intv);
                            var dlit = moment.preciseDiff(intv, outv, true);
                            dlit.getTimeForm = function () {
                                var m = this.minutes;
                                var h = this.hours;
                                h = h < 10 ? "0" + h : h;
                                m = m < 10 ? "0" + m : m;
                                return h + ':' + m;
                            };

                            scope.data.push(
                                {
                                    fio: t[i].getFullName(),
                                    dlt: dlit,
                                    date: t[i].date,
                                    id: t[i].id,
                                    time_in: t[i].time_in,
                                    time_out: t[i].time_out,
                                    lastName: t[i].getLastName(),
                                    firstName: t[i].getFirstName(),
                                    patronymicName: t[i].getPatronymicName(),
                                    moment_in: intv,
                                    moment_out: outv,
                                    diffMillsec: subs
                                }
                            );
                        }
                        console.log('DATA:');
                        console.log(scope.data);
                    }

                    //for (var key in prevData) {
                    //    if (key == 'id') {
                    //        scope.data[prevData[key]] = prevData;
                    //    }
                    //}
                }
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

;