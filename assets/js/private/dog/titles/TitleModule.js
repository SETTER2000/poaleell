angular.module('TitleModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.titles', {
                url: '/titles',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/titles/tpl/list.tpl.html',
                        controller: 'ListTitleController'
                    }
                }
            })
            .state('home.admin.titles.edit', {
                url: '/edit/:titleId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/titles/tpl/edit.tpl.html',
                        controller: 'EditTitleController'
                    }
                }
            })
            .state('home.admin.titles.settings', {
                url: '/settings',
                templateUrl: '/js/private/admin/titles/views/home.admin.titles.settings.html',
                controller: 'ListTitleController'
            })
            .state('home.admin.title', {
                url: '/title/:titleId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/titles/tpl/show.tpl.html',
                        controller: 'TitleController'
                    }
                }
            })
            .state('home.admin.titles.create', {
                url: '/create/:titleId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/titles/tpl/edit.tpl.html',
                        controller: 'EditTitleController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_TITLE', {baseUrl: '/titles/:titleId'})
    .factory('Titles', function ($resource, CONF_MODULE_TITLE) {

        var Titles = $resource(
            CONF_MODULE_TITLE.baseUrl,
            {titleId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Titles.prototype.formatDate = function (date) {

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

        Titles.prototype.getFullName = function () {
            let name = (this.multiplicity) ? this.multiplicity+'x' : '';
            name += this.name;
            name += (this.year) ? '-'+this.year : '';

            return name;
        };

        Titles.prototype.sc = function () {
            return this.section;
        };
        Titles.prototype.scs = function () {
            return this.sections;
        };

        Titles.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Titles.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Titles.prototype.getListUrl = function () {
            return '/admin/titles';
        };
        Titles.prototype.getEditUrl = function (id) {
            return '/admin/titles/edit/' + id;
        };
        Titles.prototype.getShowUrl = function (id) {
            return '/admin/title/' + id;
        };
        Titles.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Titles.prototype.addPosition = function (item) {
            if (angular.isArray(item.titles)) {
                item.titles.push({});
            } else {
                item.titles = [{}];
            }
            return item;
        };
        Titles.prototype.arr = [];
        Titles.prototype.removePosition = function (title, item) {
            if (angular.isDefined(title) &&
                angular.isDefined(title.id)) {
                this.arr.push(title.id);
            }
            var titles = item.titles;
            for (var i = 0, ii = titles.length; i < ii; i++) {
                if (title === titles[i]) {
                    titles.splice(i, 1);
                }
            }
            return item.removeFurlough = this.arr;
        };
        return Titles;
    })
;

