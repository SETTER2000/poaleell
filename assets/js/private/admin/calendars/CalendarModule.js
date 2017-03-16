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
                // console.log('DATA_EXX');
                // console.log(scope.data);
                // console.log('DATA-Period');
                // console.log(scope.dataPeriod);
                // console.log(scope.data.length);
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
    .directive('calendar', function (Attendances) { // функция компиляции директивы (фабричная функция)
        return {
            restrict: 'E',
            scope: {
                // =daysPeriod - эта переменная из tpl скоупа,
                // слева - переменная (daysPeriod) из шаблона директивы
                daysPeriod: '=daysPeriod',
                refresh: '&'
            },
            templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
            replace: true,
            link: function (scope) {

                scope.limit = 2000;
                scope.numPage = 1;
                scope.week = 'week';
                scope.month = 'month';
                scope.nedela = 'неделя';
                scope.mesiac = 'месяц';


                var interval = {
                    start: moment().startOf(scope.globalPeriod).date(1).hours(0).minutes(0).seconds(0).milliseconds(0),
                    end: moment().endOf(scope.globalPeriod)
                };


                //
                //scope.$watch('query', function (value, old) {
                //    //console.log('NEW');
                //    //console.log(value);
                //    //scope.data = value;
                //    //console.log('OLD');
                //    //console.log(old);
                //    scope.getDataObj();
                //});
                //scope.query = {};
                //scope.query = {};
                scope.getQuery = function (query) {
                    if(!angular.isDefined(query))return ;

                    scope.attendance = Attendances.query(
                        query,
                        function (attendanceEmployees,err) {
                            console.log(err());
                            console.log('QUERY');
                            console.log(attendanceEmployees);
                            scope.attendance = attendanceEmployees;
                            scope.attendance.$promise
                                .then(function f0(t) {
                                    var dt = [];
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

                                            dt.push(
                                                {
                                                    fio: t[i].getFullName(),
                                                    dlt: dlit,
                                                    //dlt: (function () {
                                                    //    return dlit.getTimeForm();
                                                    //})(),
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
                                        t.dt = dt;
                                        return t;
                                    }
                                })
                                .then(function f1(result) {
                                    var store = {};
                                    scope.nameArray = result.map(function (item, i) {
                                        var key = item.getFullName();
                                        store[key] = true;
                                    });
                                    result.store = store;
                                    return result;
                                })
                                .then(function f2(result) {
                                    var keys = Object.keys(result.store);
                                    keys.sort();
                                    result.arrUniq = keys;
                                    return result;
                                })
                                .then(function f3(result) {
                                    var jk = {};
                                    var h = {};
                                    for (var k in result.arrUniq) {
                                        var mls = 0;
                                        var ars = [];
                                        var darr = [];
                                        var millsec = 0;

                                        var nameArray = result.dt.map(function (item, i) {
                                            if (item.fio === result.arrUniq[k]) {

                                                millsec = (millsec + item.diffMillsec);
                                                ars.push({
                                                    fio: result.arrUniq[k],
                                                    date: item.date,
                                                    mls: item.diffMillsec,
                                                    getMill: function () {
                                                        return this.mls
                                                    },
                                                    getData: function () {
                                                        return this.date
                                                    }
                                                });
                                            }
                                        });
                                        jk[result.arrUniq[k]] = [{millsecSum: millsec, 'data': ars}];
                                    }
                                    result.jk = jk;
                                    //scope.data = jk;


                                    return result;
                                })
                                .then(function f4(result) {
                                    var g =[];
                                    for(var o in result.jk){
                                        console.log(o);
                                        g.push(result.jk[o][0]);
                                        //if(){
                                        //
                                        //} 
                                    }
                                    console.log(g);
                                    console.log('DATAAAAAAAAAAAA');
                                    console.log( result.store);
                                    console.log( result.jk);
                                    result.g=g;
                                    scope.data = g;
                                    return result;
                                })
                            ;
                        });
                };

                //scope.getQuery({
                //    page: scope.numPage,
                //    startDate: interval.start.format('YYYY-MM-DD'),
                //    endDate: interval.end.format('YYYY-MM-DD'),
                //    //startDate: '2016-10-01',
                //    //endDate: '2016-11-01',
                //    // Кол-во строк показываемых на странице
                //    limit: scope.limit
                //});

                scope.currentPeriod = function (period) {
                    scope.globalPeriod = (period === scope.week) ? scope.week : scope.month;
                    scope.section = (period === scope.week) ? scope.nedela : scope.mesiac;
                    scope.interval = {};
                    scope.interval = interval;
                    scope.interval.start = moment().startOf(scope.globalPeriod).date(1);


                    //scope.getQuery({
                    //    page: scope.numPage,
                    //    startDate: scope.interval.start.format('YYYY-MM-DD'),
                    //    endDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                    //    //startDate: '2016-10-01',
                    //    //endDate: '2016-11-01',
                    //
                    //    // Кол-во строк показываемых на странице
                    //    limit: scope.limit
                    //});

                    scope.restart();
                };
                

                scope.restart = function () {
                    var recurrence;
                    var dForm = [];
                    var daysPeriod = {data: []};
                    
                    if (angular.isDefined(scope.interval)) {
                        var start = scope.interval.start;
                        var end = scope.interval.end;
                        recurrence = moment().recur(start, end).every(1).days(1);

                        // subtract - вычитание
                        recurrence.start.subtract(1, 'days');
                        recurrence.end.subtract(1, 'days');

                        /**
                         *  Массив объектов moment в количестве 31 дня
                         *  Например с 01.03.2017 по 31.03.2017
                         *  либо по 01 следующего месяца, если месяц 30 дней
                         */
                        daysPeriod.data = recurrence.next(31);


                        scope.getQuery({
                            page: scope.numPage,
                            startDate: daysPeriod.data[0].format('YYYY-MM-DD'),
                            endDate: daysPeriod.data[30].format('YYYY-MM-DD'),
                            //startDate: '2016-10-01',
                            //endDate: '2016-11-01',
                            // Кол-во строк показываемых на странице
                            limit: scope.limit
                        });

                        // Сегодняшняя дата (16.03.2017)
                        daysPeriod.currentDate = moment().format('DD.MM.YYYY');
                        // Текущий месяц (март)
                        daysPeriod.periodMonth = daysPeriod.data[0].format('MMMM');
                        // Текущий год (2017)
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
                };

                scope.periodPrevNext = function (n, operator) {
                    var t = 0;
                    var y = scope.interval.end;
                    if (operator == 1) {
                        t = (n) ? (t + n) : t++;
                    } else {
                        t = (n) ? (t - n) : t--;

                    }

                    if (scope.globalPeriod === scope.week) {
                        scope.interval = scope.interval.start.recur().every(1).weeks();
                        scope.interval.end = y.recur().every(1).weeks().start;
                    }
                    if (scope.globalPeriod === scope.month) {
                        scope.interval = scope.interval.start.recur().every(1).months();
                        scope.interval.end = y.recur().every(1).months().start;
                    }

                    scope.interval.start.add(t, scope.globalPeriod);
                    scope.interval.end.add(t, scope.globalPeriod);
                    scope.restart();
                };
            }
        };
    })
;