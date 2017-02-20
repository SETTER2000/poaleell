angular.module('CalendarModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
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
            .state('home.admin.calendars.edit', {
                url: '/edit/:calendarId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/edit.tpl.html',
                        controller: 'EditCalendarController'
                    }
                }
            })
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
            .state('home.admin.calendars.create', {
                url: '/create/:calendarId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/calendars/tpl/edit.tpl.html',
                        controller: 'EditCalendarController'
                    }
                }
            })
        ;
    })
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
        Calendars.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name +  ' - изменения не приняты!');
        };
        Calendars.prototype.getListUrl = function () {
            return '/admin/calendars';
        };
        Calendars.prototype.getEditUrl = function (id) {
            return '/admin/calendars/edit/'+id;
        };
        Calendars.prototype.getShowUrl = function (id) {
            return '/admin/calendar/'+id;
        };
        Calendars.prototype.getCreateUrl = function () {
            return '/admin/calendars/create';
        };
        Calendars.prototype.deactivation = function () {
            return  ' - деактивирован';
        };

        return Calendars;
    })
;