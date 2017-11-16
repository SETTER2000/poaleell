(function (angular) {
    'use strict';
    angular.module('PhotoModule')
        .controller('ListPhotoController', ['$scope', '$state', 'Photos', 'toastr',
            function ($scope, $state, Photos, toastr) {
                $scope.me = window.SAILS_LOCALS.me;
                if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');

                $scope.nameArea = 'Наименование';
                $scope.descriptionArea = 'Описание';
                $scope.descriptionEnArea = 'Описание на английском';


                /**
                 * Поле сортировки объекта по умолчанию.
                 * @type {string}
                 */
                $scope.sort = 'name';


                $scope.debug = false;

                /**
                 * Название кнопки в интерфейсе
                 * @type {string}
                 */
                $scope.addNameButton = 'Добавить титул';

                /**
                 * URL кнопки в интерфейсе
                 * @type {string}
                 */
                $scope.urlButton = 'home.admin.photos.create';


                /**
                 * Кол-во строу, по умолчанию, выбраных в объект
                 */
                $scope.limit = 300;

                $scope.refresh = function () {
                    /**
                     * При обращении к службе $resource возвращается сгенерированный конструктор,
                     * дополненный методами для взаимодействия с конечной точкой
                     * RESTful: query, get, save и delete.
                     */
                    // Сортировка наоборот sort: 'name DESC'
                    $scope.items = Photos.query({limit: $scope.limit, sort: $scope.sort}, function (photos) {
                        console.log('Photos ITEMS:', photos);
                        $scope.items = photos;
                    }, function (err) {
                        toastr.error(err, 'Ошибка ListPhotoController!');
                    });
                };


                $scope.propertyName = 'name';
                $scope.reverse = false;

                $scope.sortBy = function (propertyName) {
                    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                    $scope.propertyName = propertyName;
                };


                $scope.msd = ['settings', 'home', 'options', 'other'];
                $scope.selectionMode = $scope.msd[0];


                // конструктор хлебных крошек
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
                breadcrumb.set('Photos', 'home.admin.photos' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;
                
                
                $scope.delete = function (item) {
                    console.log(item);
                    item.$delete(item, function (success) {
                        console.log(success);
                        $scope.refresh();
                    }, function (err) {
                        console.log(err);
                    })
                };
                $scope.refresh();
            }])
    ;
})(window.angular);