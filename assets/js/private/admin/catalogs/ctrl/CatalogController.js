angular.module('CatalogModule')
    .controller('CatalogController', ['$scope', '$state','toastr', 'moment', 'Catalogs', '$stateParams',
        function ($scope,$state,toastr, moment, Catalogs, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            //$scope.message = moment({start:'1995-12-25',end:'2000-10-10'}).year(2009).hours(0).minutes(0).seconds(0);
            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Catalogs.getFullName()
             */

            $scope.refresh = function () {
                $scope.item = Catalogs.get({id: $stateParams.catalogId}, function (catalogs) {
                    console.log('catalogs',catalogs);
                    $scope.catalogs = catalogs;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 889! ' + err.data.message);
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

            breadcrumb.set('Home', '/');
            breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Catalog', 'home.admin.catalogs');
            breadcrumb.set('Show', 'home.admin.catalogs.show'+ $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
