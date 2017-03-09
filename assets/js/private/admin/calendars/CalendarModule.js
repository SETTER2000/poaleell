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

angular.module('CalendarModule', ['ui.router', 'ngResource', 'ngAnimate', 'pascalprecht.translate', 'angularMoment'])
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

            //.state('home.admin.calendars.edit', {
            //    url: '/edit/:calendarId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/calendars/tpl/edit.tpl.html',
            //            controller: 'EditCalendarController'
            //        }
            //    }
            //})
            //.state('home.admin.depart', {
            //    url: '/depart/:calendarId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/calendars/tpl/list.tpl.html',
            //            controller: 'EditCalendarController'
            //        }
            //    }
            //})
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
                        templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
                        controller: 'CalendarController'
                    }
                }
            })
            //.state('home.admin.calendar.месяц', {
            //    views: {
            //        'trbody@home.admin.calendar': {
            //            templateUrl: '/js/private/admin/calendars/views/view.tbody.html'
            //        }
            //    }
            //})
            //.state('home.admin.calendar', {
            //
            //        'tbody@home.admin.calendar.месяц': {
            //            templateUrl: '/js/private/admin/calendars/views/view.tbody.html'
            //        }
            //})
            .state('home.admin.calendar.неделя', {
                url: '/неделя',
                views: {
                    '@home.admin.calendar': {
                        templateUrl: '/js/private/admin/calendars/views/home.admin.calendar.month.html',
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
;