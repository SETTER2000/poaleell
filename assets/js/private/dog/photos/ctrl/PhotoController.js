angular.module('PhotoModule')
    .controller('PhotoController', ['$scope', '$state','toastr', 'moment', 'Photos', '$stateParams',
        function ($scope,$state,toastr, moment, Photos, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            // if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            //$scope.message = moment({start:'1995-12-25',end:'2000-10-10'}).year(2009).hours(0).minutes(0).seconds(0);
            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Photos.getFullName()
             */

            $scope.refresh = function () {
                $scope.item = Photos.get({id: $stateParams.photoId}, function (photos) {
                    console.log('photos',photos);
                    $scope.photos = photos;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 889774119! ' + err.data.message);
                });
            };
            /**
             *  Конструктор хлебных крошек
             * @constructor
             */
            function BreadCrumb() {
                var name;
                var path;
                this.arr = [];
            }

            BreadCrumb.prototype.add = function () {
                this.arr.push({name: this.name, path: this.path});
            };

            BreadCrumb.prototype.set = function (name, path) {
                this.name = name;
                this.path = path;
                this.add();
            };

            BreadCrumb.prototype.getAll = function () {
                return this.arr;
            };

            var breadcrumb = new BreadCrumb();

            breadcrumb.set('Home', 'home');
            if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Photo', 'home.admin.photos');
            breadcrumb.set('Show', 'home.admin.photos.show'+ $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
