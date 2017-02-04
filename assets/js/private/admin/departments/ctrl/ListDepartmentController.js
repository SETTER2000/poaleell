(function (angular) {
    'use strict';
    angular.module('DepartmentModule')
        .controller('ListDepartmentController', ['$scope', 'Departments',
            function ($scope, Departments) {


               // var ups = $scope.ups =  Departments.query();
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
                    $scope.items = Departments.query(function (departments) {
                        $scope.departments = departments;
                        // console.log('SUCCCE: ');
                        // console.log( $scope.departments);
                        // console.log( $scope.departments.filter({"action": 1}));
                        // console.log(departments.get({"action": 1},function (success) {
                        //     console.log('URAAA:');
                        //     alert('5685');
                        //     console.log(success);
                        // },function (err) {
                        //     alert('ERRRRRR');
                        //     console.log(err);
                        // }));
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