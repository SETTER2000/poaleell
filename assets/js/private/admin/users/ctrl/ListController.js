(function (angular) {
    'use strict';
    angular.module('UserModule')
        .controller('ListController', ['$scope', '$state', 'Users', '$window', function ($scope, $state, Users) {

            // // обработка события deleteUser на текущем scope
            // $scope.$on("deleteUser", function (event, args) {
            //     //event.stopPropagation(); // останавливаем распространение события
            //     // $scope.info = args.message;
            //     // $scope.delete(args);
            //     $scope.info = args.message;
            // });


            console.log('NAVIGABLE-N: ' + $state.$current.navigable);
            console.log('NAVIGABLE-P: ' + $state.$current.path);
            $scope.refresh = function () {
                /**
                 * При обращении к службе $resource возвращается сгенерированный конструктор,
                 * дополненный методами для взаимодействия с конечной точкой
                 * RESTful: query, get, save и delete.
                 */
                $scope.items = Users.query(function (users) {
                    $scope.users = users;
                    // кол-во пользователей
                    // console.log($scope.users.length);
                    console.log($scope.users);
                });
            };
            $scope.delete = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    console.log(success);
                    $scope.refresh();
                    // $scope.items.splice($scope.items.indexOf(item), 1);
                }, function (err) {
                    console.log(err);
                    // alert();
                })
            };


            $scope.propertyName = 'lastName';
            $scope.reverse = false;
            // $scope.friends = friends;

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
            breadcrumb.set('Home', '/');
            breadcrumb.set('Admin', '/admin');
            breadcrumb.set('Users', '/admin/' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            // $scope.resetForm = function () {
            //     return $scope.item = {};
            // };


            $scope.refresh();
        }]);
})(window.angular);