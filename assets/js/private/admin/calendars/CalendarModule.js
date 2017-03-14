var translationsRU = {
    TITLE: 'Наименование',
    HEADLINE: 'Описание',
    CHPU: 'ЧПУ',
    ATTENDANCE: 'Посещаемость',
    EDIT: 'Редактировать',
    ACTIVITY: 'Активность',
    LOCATION: 'Местоположения',
    INFO: 'Информация',
    BUTTON_LANG_EN: 'Englisch',
    BUTTON_LANG_RU: 'Russian',
    BUTTON_LANG_DE: 'German',
    NAMESPACE: {
        PARAGRAPH: 'And it comes with awesome features!'
    }
};
var translationsEN = {
    TITLE: 'Title',
    HEADLINE: 'Description',
    CHPU: 'Friendly URL',
    ATTENDANCE: 'Attendance',
    EDIT: 'Edit',
    ACTIVITY: 'Activity',
    LOCATION: 'Location',
    INFO: 'Information',
    BUTTON_LANG_DE: 'German',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_RU: 'Russian'
};
var translationsDE = {
    TITLE: 'Titel',
    HEADLINE: 'Beschreibung',
    CHPU: 'Freundliche URL!',
    ATTENDANCE: 'TEILNAHME',
    EDIT: 'Bearbeiten',
    ACTIVITY: 'Aktivität',
    LOCATION: 'Lage',
    INFO: 'Informationen',
    BUTTON_LANG_DE: 'Deutsch',
    BUTTON_LANG_EN: 'Englisch',
    BUTTON_LANG_RU: 'Russian'
};

angular.module('CalendarModule', ['ui.router', 'ngResource', 'ngAnimate', 'pascalprecht.translate', 'angularMoment', 'AttendanceModule'])
    .config(['$stateProvider', '$translateProvider', function ($stateProvider, $translateProvider) {
        // $translateProvider.translations('en', translations).preferredLanguage('en');
        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('de', translationsDE);
        $translateProvider.translations('ru', translationsRU);
        $translateProvider.preferredLanguage('ru');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
        $stateProvider
            .state('home.admin.calendars', {
                url: '/calendars',
                //template:'<h1>Calendars</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/list.tpl.html',
                        controller: 'ListCalendarController'
                        //template:'<h1>DEPARTAMENT</h1>'
                    }
                }
            })
            .state('home.admin.calendars.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/edit.tpl.html',
                        controller: 'EditCalendarController'
                    }
                }
            })
            .state('home.admin.calendar', {
                url: '/calendar/:calendarId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/show.tpl.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('home.admin.calendar.edit', {
                url: '/edit',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/edit.tpl.html',
                        controller: 'EditCalendarController'
                    }
                }
            })
            .state('home.admin.calendar.show', {
                url: '/show',
                views: {
                    '@home.admin.calendar': {
                        templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.show.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('home.admin.calendar.месяц', {
                url: '/месяц',
                views: {
                    '@home.admin.calendar': {
                        //templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('home.admin.calendar.неделя', {
                url: '/неделя',
                views: {
                    '@home.admin.calendar': {
                        //templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state("tbody", {
                views: {
                    'tbody@': {
                        templateUrl: "/js/private/admin/calendars/views/view.tbody.html"
                    }
                }
            })
        ;
    }])
    .constant('CONF_MODULE_CALENDAR', {baseUrl: '/calendar/:calendarId'})
    .factory('Calendars', function ($resource, CONF_MODULE_CALENDAR) {
        var Calendars = $resource(
            CONF_MODULE_CALENDAR.baseUrl,
            {calendarId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        //Calendars.prototype.getFullName = function () {
        //    return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        //};

        Calendars.prototype.sc = function () {
            return this.section;
        };
        Calendars.prototype.scs = function () {
            return this.sections;
        };

        Calendars.prototype.ok = function () {
            return alert(this.section + ': ' + this.name + ' изменён!');
        };
        Calendars.prototype.er = function (ms) {
            return alert('ОШИБКА!!! ' + this.name + ' - изменения не приняты! ' + ms);
        };
        Calendars.prototype.getListUrl = function () {
            return '/admin/calendars';
        };
        Calendars.prototype.getEditUrl = function (id) {
            return '/admin/calendar/' + id + '/edit';
        };
        Calendars.prototype.getShowUrl = function (id) {
            return '/admin/calendar/' + id;
        };
        Calendars.prototype.getCreateUrl = function () {
            return '/admin/calendars/create';
        };
        Calendars.prototype.deactivation = function () {
            return ' - деактивирован';
        };

        return Calendars;
    })
    .directive("attendanceCalendar", function () {
        return {
            link: function (scope, element, attributes) {
                scope.data = scope[attributes["attendanceCalendar"]];
                scope.dataPeriod = scope[attributes["period"]];
                console.log('attendanceCalendar - DIRECTIVES:');
                //console.log(scope[attributes["attendanceList"]]);
                console.log('DATA_EXX');
                console.log(scope.data);
                console.log('DATA-Period');
                console.log(scope.dataPeriod);
                console.log(scope.data.length);
                scope.data.$promise.then(rejectFull);

                scope.$watch('daysPeriod', function (value) {
                    getDtForm();
                    console.log('HHHH');
                });
                function getDtForm(item) {
                    return item;
                    if (angular.isDefined(item) && angular.isDefined(scope.dataPeriod)) {

                        var numberColumn = '';
                        if (scope.dataPeriod.dForm.indexOf(item.date) > 0) {
                            numberColumn = scope.dataPeriod.dForm.indexOf(item.date);
                            //console.log(numberColumn);
                            //item.numberColumn = numberColumn + 1;

                            //console.log(item);
                            return item;
                        }
                    }
                }

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
                                getDtForm({
                                    fio: t[i].getFullName(),
                                    dlt: (function () {
                                        return dlit.getTimeForm();
                                    })(),
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
                                })
                            );
                        }
                        console.log('DATA-DIRECTIVE Calendar:');
                        console.log(scope.data);
                    }
                }
            },
            restrict: "A",
            templateUrl: function (element, attributes) {
                var week = '/js/private/admin/calendars/views/home.admin.calendar.week.html';
                var calendar = '/js/private/admin/calendars/views/home.admin.calendar.month.html';
                //var calendar = '/js/private/admin/attendances/tpl/views/view.calendar.html';
                // выбор внешнего шаблона на основе атрибута template
                return attributes["template"] == "calendar" ? calendar : week;
            },
            scope: true  // каждый экземпляр директивы должен работать со своим scope и наследовать scope своего контроллера
            // scope:{} // В данном случае директива создается с изолированным scope - данный scope не участвует в наследовании.

            // true - элемент, которому будет присвоена директива будет заменен разметкой сгенерированной по шаблону
            // false - в элемент, к которому присвоена директива, будет добавлена разметка
            // Для того, чтобы увидеть эффект работы директивы, необходимо открыть инспектор DOM в браузере
            //replace:true
        }
    })
    .directive('calendar', function () { // функция компиляции директивы (фабричная функция)
        return {
            restrict: 'E',
            scope: {
                // =daysPeriod - эта переменная из tpl скоупа,
                // слева - переменная (daysPeriod) из шаблона директивы
                daysPeriod: '=daysPeriod',
                itemsNew: '=attendance', // имя шаблона
                refresh: '&'
                //currentPeriod : '&'
                //defaultRows: '=', // по умолчанию сколько строк должно показываться на одной странице
                //limitRows: '=',  // массив содержащий значения кол-ва строк для одной страницы [20,30,50,70,100]
                //lengthObject: '=', // кол-во объектов в обрабатываемой коллекции объектов
                //currentPage: '=',
                //onSelectPage: '&'
            },
            templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
            replace: true,
            link: function (scope) {
                var interval = {
                    start: moment().startOf(scope.globalPeriod).date(1).hours(0).minutes(0).seconds(0).milliseconds(0),
                    end: moment().endOf(scope.globalPeriod)
                };
                //scope.$watch('items', function (value) {
                //    scope.items = value;
                //});
                //
                //  scope.items =  this.itemsNotCheck;
                //console.log('SCOPE.ITEMSnEW');
                //console.log(scope.itemsNew);

                scope.rejectFull = function (t) {
                    scope.data = [];
                    scope.prevData = [];
                    scope.fio = [];
                    if (angular.isArray(t) && t.length > 0) {
                        for (var y = 0; y < t.length; y++) {
                            scope.fio.push(t[y].getFullName());
                        }
                        var longTimeWork=0;
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

                            if (t[i].date === '2016-01-21' && t[i].getFullName() === 'Абрамов Александр Павлович') {

                               longTimeWork = (longTimeWork + subs);
                                scope.data.push({
                                    dlt: longTimeWork
                                });

                                //var arr = [1, -1, 2, -2, 3];
                                //
                                //var positiveArr = arr.filter(function(number) {
                                //    return number > 0;
                                //});
                            }
                            //scope.data.push(
                            //    {
                            //        fio: t[i].getShortName(),
                            //        dlt: (function () {
                            //            return dlit.getTimeForm();
                            //        })(),
                            //        date: t[i].date
                            //        //id: t[i].id,
                            //        //time_in: t[i].time_in,
                            //        //time_out: t[i].time_out,
                            //        //lastName: t[i].getLastName(),
                            //        //firstName: t[i].getFirstName(),
                            //        //patronymicName: t[i].getPatronymicName(),
                            //        //moment_in: intv,
                            //        //moment_out: outv,
                            //        //diffMillsec: subs
                            //    }
                            //);
                            //scope.data.push(
                            //    {
                            //        fio: t[i].getShortName(),
                            //        dlt: (function () {
                            //            return dlit.getTimeForm();
                            //        })(),
                            //        date: t[i].date
                            //        //id: t[i].id,
                            //        //time_in: t[i].time_in,
                            //        //time_out: t[i].time_out,
                            //        //lastName: t[i].getLastName(),
                            //        //firstName: t[i].getFirstName(),
                            //        //patronymicName: t[i].getPatronymicName(),
                            //        //moment_in: intv,
                            //        //moment_out: outv,
                            //        //diffMillsec: subs
                            //    }
                            //);

                        }

                        console.log('DATA-DIRECTIVE Calendar:');
                        console.log(scope.data);
                    }
                };

                //scope.getUniqueName = function () {
                //    var unique = scope.data;
                //    var ar = [];
                //    if (angular.isArray(unique) && unique.length > 0) {
                //        for (item in unique) {
                //            console.log('UNIQUE');
                //
                //
                //            console.log(unique[item]);
                //            var fio = unique[item].getFullName();
                //            if(angular.isDefined(fio)){
                //                if (!ar.indexOf(fio) > 0) {
                //                    ar.push(fio);
                //                }
                //            }
                //
                //        }
                //
                //        console.log('ARRRR');
                //        console.log(ar);
                //        return ar;
                //    }
                //};


                scope.currentPeriod = function (period) {
                    scope.globalPeriod = (period === 'week') ? 'week' : 'month';
                    scope.section = (period === 'week') ? 'неделя' : 'месяц';
                    scope.interval = {};
                    scope.interval = interval;
                    scope.interval.start = moment().startOf(scope.globalPeriod).date(1);
                    scope.restart();
                };

                scope.restart = function () {
                    scope.rejectFull(scope.itemsNew);
                    var recurrence;
                    var dForm = [];
                    var daysPeriod = {data: []};
                    if (angular.isDefined(scope.interval)) {
                        var start = scope.interval.start;
                        var end = scope.interval.end;
                        recurrence = moment().recur(start, end).every(1).days(1);
                        recurrence.start.subtract(1, 'days');
                        recurrence.end.subtract(1, 'days');
                        daysPeriod.data = recurrence.next(31);
                        console.log('DAYSpERIOD.DATA');
                        console.log(daysPeriod.data);
                        console.log(daysPeriod.data[0].format('YYYY-MM-DD'));
                        console.log('LENGTH-D: ');
                        console.log(dForm);
                        daysPeriod.currentDate = moment().format('DD.MM.YYYY');
                        daysPeriod.periodMonth = daysPeriod.data[0].format('MMMM');
                        daysPeriod.periodYear = daysPeriod.data[0].format('YYYY');

                    }
                    else {
                        scope.currentPeriod();
                    }

                    daysPeriod.data.forEach(function (item, i) {
                        if (item.format('YYYY-MM-DD')) {
                            dForm.push(item.format('YYYY-MM-DD'));
                        }
                    });
                    daysPeriod.dForm = dForm;
                    scope.daysPeriod = daysPeriod;
                    console.log('DAYSpERIOD.DATA');
                    console.log(scope.daysPeriod.dForm);
                };

                scope.periodPrevNext = function (n, operator) {
                    var t = 0;
                    var y = scope.interval.end;
                    if (operator == 1) {
                        t = (n) ? (t + n) : t++;
                    } else {
                        t = (n) ? (t - n) : t--;
                    }
                    if (scope.globalPeriod === 'week') {
                        scope.interval = scope.interval.start.recur().every(1).weeks();
                        scope.interval.end = y.recur().every(1).weeks().start;
                    }
                    if (scope.globalPeriod === 'month') {
                        scope.interval = scope.interval.start.recur().every(1).months();
                        scope.interval.end = y.recur().every(1).months().start;
                    }

                    scope.interval.start.add(t, scope.globalPeriod);
                    scope.interval.end.add(t, scope.globalPeriod);
                    scope.restart();
                };
                //console.log('scope.daysPeriod^^');
                //console.log(scope.daysPeriod);

                //scope.$watch('daysPeriod.dForm', function (value) {
                //    scope.daysPeriod = value;
                //
                //});
                // scope.$watch('numPages', function (value) {
                //    scope.pages = [];
                //    for (var i = 1; i <= value; i++) {
                //        scope.pages.push(i);
                //    }
                //    if (scope.currentPage > value) {
                //        scope.selectPage(value);
                //    }
                //});
                //scope.$watch('limitRows', function (value) {
                //    scope.rows = [];
                //    for (var i = 0; i <= value.length; i++) {
                //        scope.rows.push(value[i]);
                //    }
                //});
                //scope.$watch('defaultRows', function (value, oldValue) {
                //    if (value > 0) {
                //        scope.defaultRows = value;
                //        scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
                //    }
                //});
                //scope.noPrevious = function () {
                //    return scope.currentPage === 1;
                //};
                //scope.noNext = function () {
                //    return scope.currentPage === scope.numPages;
                //};
                //scope.isActive = function (page) {
                //    return scope.currentPage === page;
                //};
                //scope.isActiveRow = function (row) {
                //    return scope.defaultRows === row;
                //};
                //scope.selectPage = function (page) {
                //    if (!scope.isActive(page)) {
                //        scope.currentPage = page;
                //        scope.onSelectPage({page: page});
                //    }
                //};
                // scope.currentPeriod = function () {
                //    if (!scope.isActive(page)) {
                //        scope.currentPage = page;
                //        scope.onSelectPage({page: page});
                //    }
                //};
                //scope.currentPeriod = function (period) {
                //    scope.globalPeriod = (period === 'week') ? 'week' : 'month';
                //    scope.section = (period === 'week') ? 'неделя' : 'месяц';
                //    scope.interval = {};
                //    scope.interval = interval;
                //    scope.interval.start = moment().startOf(scope.globalPeriod).date(1);
                //    scope.restart();
                //    //$scope.send();
                //};
                //scope.selectPrevious = function () {
                //    if (!scope.noPrevious()) {
                //        scope.selectPage(scope.currentPage - 1);
                //    }
                //};
                //scope.selectNext = function () {
                //    if (!scope.noNext()) {
                //        scope.selectPage(scope.currentPage + 1);
                //    }
                //};
                //scope.getLimitRows = function (limitRows) {
                //    scope.defaultRows = limitRows;
                //    if (scope.lengthObject <= scope.defaultRows) {
                //        scope.numPages = 1;
                //    } else {
                //        scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
                //    }
                //};
            }
        };
    })
;