(function (angular) {
    'use strict';
    angular.module('EmployeeModule')
        .controller('ListEmployeeController', ['$scope', 'Employees', '$state',
            function ($scope, Employees, $state) {
                /**
                 * Поле сортировки объекта по умолчанию.
                 * @type {string}
                 */
                $scope.sort = 'lname';

                /**
                 * Кол-во строу, по умолчанию, выбраных в объект
                 */
                $scope.limit = 1000;


                // var ups = $scope.ups =  Employees.query();
                //  console.log('UPS1: ');
                //  console.log(ups);
                //  // console.log( $scope.ups.then(onFullField));
                //  ups.$promise.then(onFullField,onReject);
                //
                //  function onFullField(succ){
                //      console.log('DADAD!!!: ');
                //      console.log(succ);
                //
                //      console.log('DADAD!!22!: ');
                //      console.log(succ.filter(action:1);
                //  }

                // function onReject(err) {
                //     console.log('ONreject');
                //     console.log(err);
                // }

                $scope.refresh = function () {
                    /**
                     * При обращении к службе $resource возвращается сгенерированный конструктор,
                     * дополненный методами для взаимодействия с конечной точкой
                     * RESTful: query, get, save и delete.
                     */
                        // Сортировка наоборот sort: 'name DESC'
                    $scope.items = Employees.query({limit: $scope.limit, sort: $scope.sort}, function (employees) {
                        $scope.employees = employees;
                        // console.log('SUCCCE: ');
                        // console.log( $scope.employees);
                        // console.log( $scope.employees.filter({"action": 1}));
                        // console.log(employees.get({"action": 1},function (success) {
                        //     console.log('URAAA:');
                        //     alert('5685');
                        //     console.log(success);
                        // },function (err) {
                        //     alert('ERRRRRR');
                        //     console.log(err);
                        // }));
                        // кол-во пользователей
                        console.log($scope.employees.length);
                        console.log($scope.employees);
                        //console.log(employees.scs());
                    });
                };

                //$scope.sections =   $scope.employees.sections();
                $scope.propertyName = $scope.sort;
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
                breadcrumb.set('Home', '/');
                breadcrumb.set('Admin', '/admin');
                breadcrumb.set('Employees', '/employees/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;


                $scope.refresh();

            }])
    ;
})(window.angular);