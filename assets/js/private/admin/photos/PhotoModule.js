angular.module('PhotoModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate','ngSanitize', 'ui.bootstrap'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.photos', {
                url: '/photos',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/photos/tpl/list.tpl.html',
                        controller: 'ListPhotoController'
                    }
                }
            })
            .state('home.admin.photos.edit', {
                url: '/edit/:photoId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/photos/tpl/edit.tpl.html',
                        controller: 'EditPhotoController'
                    }
                }
            })
            // .state('home.admin.photos.settings', {
            //     url: '/settings',
            //     templateUrl: '/js/private/admin/photos/views/home.admin.photos.settings.html',
            //     controller: 'ListPhotoController'
            // })
            .state('home.admin.photo', {
                url: '/photo/:photoId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/photos/views/slider.view.html',
                        controller: 'PhotoController'
                        // controller: 'SliderController'
                    }
                }
                // views: {
                //     '@': {
                //         templateUrl: '/js/private/admin/photos/tpl/show.tpl.html',
                //         controller: 'PhotoController'
                //     }
                // }
            })
            .state('home.admin.photos.create', {
                url: '/create/:photoId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/photos/tpl/edit.tpl.html',
                        controller: 'EditPhotoController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_PHOTO', {baseUrl: '/photos/:photoId'})
    .factory('Photos', function ($resource, CONF_MODULE_PHOTO) {

        var Photos = $resource(
            CONF_MODULE_PHOTO.baseUrl,
            {photoId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Photos.prototype.formatDate = function (date) {

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

        Photos.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Photos.prototype.sc = function () {
            return this.section;
        };
        Photos.prototype.scs = function () {
            return this.sections;
        };

        Photos.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Photos.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Photos.prototype.getListUrl = function () {
            return '/admin/photos';
        };
        Photos.prototype.getEditUrl = function (id) {
            return '/admin/photos/edit/' + id;
        };
        Photos.prototype.getShowUrl = function (id) {
            return '/admin/photo/' + id;
        };
        Photos.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Photos.prototype.addPosition = function (item) {
            if (angular.isArray(item.photos)) {
                item.photos.push({});
            } else {
                item.photos = [{}];
            }
            return item;
        };
        Photos.prototype.arr = [];
        Photos.prototype.removePosition = function (photo, item) {
            if (angular.isDefined(photo) &&
                angular.isDefined(photo.id)) {
                this.arr.push(photo.id);
            }
            var photos = item.photos;
            for (var i = 0, ii = photos.length; i < ii; i++) {
                if (photo === photos[i]) {
                    photos.splice(i, 1);
                }
            }
            return item.removeFurlough = this.arr;
        };
        return Photos;
    })
;

