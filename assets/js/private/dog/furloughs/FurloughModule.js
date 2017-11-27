angular.module('FurloughModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.furloughs', {
                url: '/furloughs',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/furloughs/tpl/list.tpl.html',
                        controller: 'ListFurloughController'
                    }
                }
            })
            .state('home.admin.furloughs.edit', {
                url: '/edit/:furloughId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/furloughs/tpl/edit.tpl.html',
                        controller: 'EditFurloughController'
                    }
                }
            })
            .state('home.admin.furloughs.settings', {
                url: '/settings',
                templateUrl: '/js/private/admin/furloughs/views/home.admin.furloughs.settings.html',
                controller: 'ListFurloughController'
            })
            .state('home.admin.furlough', {
                url: '/furlough/:furloughId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/show.tpl.html',
                        controller: 'FurloughController'
                    }
                }
            })
            .state('home.admin.furloughs.create', {
                url: '/create/:furloughId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/furloughs/tpl/edit.tpl.html',
                        controller: 'EditFurloughController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_FURLOUGH', {baseUrl: '/furloughs/:furloughId'})
    .factory('Furloughs', function ($resource, CONF_MODULE_FURLOUGH) {

        var Furloughs = $resource(
            CONF_MODULE_FURLOUGH.baseUrl,
            {furloughId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Furloughs.prototype.formatDate = function (date) {

            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear();
            //var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return yy + '-' + mm + '-' + dd;
            //return dd + '.' + mm + '.' + yy;
        };

        Furloughs.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Furloughs.prototype.sc = function () {
            return this.section;
        };
        Furloughs.prototype.scs = function () {
            return this.sections;
        };

        Furloughs.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Furloughs.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Furloughs.prototype.getListUrl = function () {
            return '/admin/furloughs';
        };
        Furloughs.prototype.getEditUrl = function (id) {
            return '/admin/furloughs/edit/' + id;
        };
        Furloughs.prototype.getShowUrl = function (id) {
            return '/admin/furlough/' + id;
        };
        Furloughs.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Furloughs.prototype.addPosition = function (item) {
            if (angular.isArray(item.furloughs)) {
                item.furloughs.push({});
            } else {
                item.furloughs = [{}];
            }
            return item;
        };
        Furloughs.prototype.arr = [];
        Furloughs.prototype.removePosition = function (furlough, item) {
            if (angular.isDefined(furlough) &&
                angular.isDefined(furlough.id)) {
                this.arr.push(furlough.id);
            }
            var furloughs = item.furloughs;
            for (var i = 0, ii = furloughs.length; i < ii; i++) {
                if (furlough === furloughs[i]) {
                    furloughs.splice(i, 1);
                }
            }
            return item.removeFurlough = this.arr;
        };
        return Furloughs;
    })
;

