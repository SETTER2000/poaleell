(function (angular) {
    'use strict';
    angular.module('DepartmentModule')
        .controller('ListDepartmentController', ['$scope', 'Departments',
            function ($scope, Departments) {
                $scope.refresh = function () {
                    /**
                     * При обращении к службе $resource возвращается сгенерированный конструктор,
                     * дополненный методами для взаимодействия с конечной точкой
                     * RESTful: query, get, save и delete.
                     */
                    $scope.items = Departments.query(function (departments) {
                        $scope.departments = departments;

                        // кол-во пользователей
                        // console.log($scope.departments.length);
                        //console.log(departments.scs());
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

                $scope.refresh();

            }])
    ;
})(window.angular);