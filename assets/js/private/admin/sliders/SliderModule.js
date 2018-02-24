angular.module('SliderModule', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider
            // .state('home.admin.sliders', {
            //     url: '/sliders',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/admin/sliders/tpl/list.tpl.html',
            //             controller: 'ListSliderController'
            //         }
            //     }
            // })
            //.state('home.admin.sliders.settings', {
            //    url: '/settings',
            //    templateUrl: '/js/private/admin/sliders/views/home.admin.sliders.settings.html',
            //    controller: 'ListSliderController'
            //})
            //.state('home.admin.sliders.list', {
            //    url: '/list',
            //    views: {
            //        'list@home.admin.sliders': {
            //            templateUrl: '/js/private/admin/sliders/views/home.admin.sliders.list.html',
            //            controller: 'ListSliderController'
            //        }
            //    }
            //})
            .state('home.admin.slider', {
                url: '/slider',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/sliders/tpl/show.tpl.html',
                        controller: 'SliderController'
                    }
                }
            })
        //.state('home.admin.sliders.attendance', {
        //    url: '/attendance',
        //    views: {
        //        'attendance@home.admin.sliders': {
        //            templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
        //            controller: 'ListAttendanceController'
        //        }
        //    }
        //})
        //.state('home.admin.sliders.edit', {
        //    url: '/edit/:sliderId',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/sliders/tpl/edit.tpl.html',
        //            controller: 'EditController'
        //        }
        //    }
        //})
        //.state('home.admin.user', {
        //    url: '/user/:sliderId',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/sliders/tpl/show.tpl.html',
        //            controller: 'UserController'
        //        }
        //    }
        //})
        //.state('home.admin.sliders.create', {
        //    url: '/create/:sliderId',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/sliders/tpl/edit.tpl.html',
        //            controller: 'EditController'
        //        }
        //    }
        //})
        //.state('home.admin.sliders.administration', {
        //    url: '/administration',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/sliders/tpl/administration.tpl.html',
        //            controller: 'AdministrationController'
        //        }
        //    }
        //})
        //.state('home.admin.sliders.exit', {
        //    url: '/exit',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/sliders/tpl/exit.html',
        //            controller: 'EditController'
        //        }
        //    }
        //})
        ;
    })
    .config(function (accordionConfig) {
        accordionConfig.expandAnimationDuration = 0.3;
    })
    .constant('CONF_MODULE_SLIDER', {baseUrl: '/sliders/:sliderId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Sliders', function ($resource, $state, moment, CONF_MODULE_SLIDER) {
        var Sliders = $resource(
            CONF_MODULE_SLIDER.baseUrl,
            {sliderId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Sliders.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };

        Sliders.prototype.getFullName = function () {
            return this._id.name;
        };

        Sliders.prototype.formMinStart = function () {
            return moment(this.minStart).utc().format('LT');
        };
        Sliders.prototype.getPeriodTime = function (e) {
            return moment(e).utc().format('LT');
        };
        Sliders.prototype.getOwner = function () {
            return this._id.owner;
        };

        Sliders.prototype.formMaxEnd = function () {
            return moment(this.maxEnd).utc().format('LT');
        };
        Sliders.prototype.formWorkTime = function () {
            return moment(this.workTime).utc().format('LT');
        };
        Sliders.prototype.formDayOfWeek = function () {

            return moment(this._id.date).format('dd');
        };
        Sliders.prototype.formDate = function () {
            return moment(this._id.date).utc().format('L');
        };
        Sliders.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        Sliders.prototype.sc = function () {
            return this.section;
        };
        Sliders.prototype.scs = function () {
            return this.sections;
        };
        Sliders.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Sliders.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Sliders.prototype.lastDateSetting = function () {
            return new Date();
        };
        Sliders.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                this.birthday = tm;
            }
        };
        Sliders.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                this.dateInWork = tm;
            }
        };
        Sliders.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                this.firedDate = tm;
            }
        };
        Sliders.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Sliders.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };
        Sliders.prototype.getListUrl = function () {
            return '/admin/sliders';
        };
        Sliders.prototype.getEditUrl = function (id) {
            return '/admin/users/edit/' + id;
        };
        Sliders.prototype.getShowUrl = function (id) {
            return '/admin/sliders/' + id;
        };
        Sliders.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Sliders.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Sliders.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Sliders;
    })