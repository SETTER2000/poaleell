angular.module('DiaryModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.diarys', {
                url: '/diarys',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/diarys/tpl/list.tpl.html',
                        controller: 'ListDiaryController'
                    }
                }
            })
            .state('home.admin.diarys.edit', {
                url: '/edit/:diaryId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/diarys/tpl/edit.tpl.html',
                        controller: 'EditDiaryController'
                    }
                }
            })

            .state('home.admin.diarys.create', {
                url: '/create/:diaryId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/diarys/tpl/edit.tpl.html',
                        controller: 'EditDiaryController'
                    }
                }
            })
            // .state('home.admin.diary', {
            //     url: '/diary/:diaryId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/admin/diarys/tpl/show.tpl.html',
            //             controller: 'DiaryController'
            //         }
            //     }
            // })

            .state('home.admin.diarys.catalog', {
                url: '/catalog/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/diarys/tpl/edit.tpl.html',
                        controller: 'EditDiaryController'
                        // controller: 'EditCatalogController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_TITLE', {baseUrl: '/diarys/:diaryId'})
    .factory('Diarys', function ($resource, CONF_MODULE_TITLE) {

        var Diarys = $resource(
            CONF_MODULE_TITLE.baseUrl,
            {diaryId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Diarys.prototype.formatDate = function (date) {

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

        Diarys.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Diarys.prototype.sc = function () {
            return this.section;
        };
        Diarys.prototype.scs = function () {
            return this.sections;
        };

        Diarys.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Diarys.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Diarys.prototype.getListUrl = function () {
            return '/admin/diarys';
        };
        Diarys.prototype.getEditUrl = function (id) {
            return '/admin/diarys/edit/' + id;
        };
        Diarys.prototype.getShowUrl = function (id) {
            return '/admin/diary/' + id;
        };
        Diarys.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Diarys.prototype.addPosition = function (item) {
            if (angular.isArray(item.diarys)) {
                item.diarys.push({});
            } else {
                item.diarys = [{}];
            }
            return item;
        };
        Diarys.prototype.arr = [];
        Diarys.prototype.removePosition = function (diary, item) {
            if (angular.isDefined(diary) &&
                angular.isDefined(diary.id)) {
                this.arr.push(diary.id);
            }
            var diarys = item.diarys;
            for (var i = 0, ii = diarys.length; i < ii; i++) {
                if (diary === diarys[i]) {
                    diarys.splice(i, 1);
                }
            }
            return item.removeFurlough = this.arr;
        };
        return Diarys;
    })
;

