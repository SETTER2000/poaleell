(function (angular) {
    'use strict';
    angular.module('DepartmentModule')
        .controller('ListDepartmentController', ['$scope', 'toastr', 'Departments', '$state',
            function ($scope, toastr, Departments, $state) {
                $scope.me = window.SAILS_LOCALS.me;
                if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
                
                
                $scope.added = 'Добавить питомник';
                $scope.registerArea = 'Номер питомника';
                $scope.dateCreateArea = 'Дата регистрации';

                $scope.refresh = function () {
                    /**
                     * При обращении к службе $resource возвращается сгенерированный конструктор,
                     * дополненный методами для взаимодействия с конечной точкой
                     * RESTful: query, get, save и delete.
                     */
                    // Сортировка наоборот sort: 'name DESC'
                    $scope.items = Departments.query({limit: 300, sort: 'name'}, function(departments) {
                        console.log('DEPARTMENTS:', departments);
                        $scope.items = departments;
                    }, function (err) {
                        toastr.error(err, 'Ошибка ListDepartmentController!');
                    });
                };

                //$scope.sections =   $scope.departments.sections();
                $scope.propertyName = 'name';
                $scope.reverse = false;
                // $scope.friends = friends;


                $scope.sortBy = function (propertyName) {
                    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                    $scope.propertyName = propertyName;
                };


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
                breadcrumb.set('Admin', '/admin');
                breadcrumb.set('Departments', '/departments/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;


                $scope.refresh();

            }])
    ;
})(window.angular);