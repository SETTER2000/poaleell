(function (angular) {
    'use strict';
    angular.module('PositionModule')
        .controller('ListPositionController', ['$scope', 'Positions', '$state',
            function ($scope, Positions, $state) {

                /**
                 * Поле сортировки объекта по умолчанию.
                 * @type {string}
                 */
                $scope.sort = 'name';

                /**
                 * Кол-во строу, по умолчанию, выбраных в объект
                 */
                $scope.limit = 300;
                
                
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
                    // Сортировка наоборот sort: 'name DESC'
                    $scope.items = Positions.query({limit:$scope.limit, sort: $scope.sort},function (positions) {
                        $scope.positions = positions;
                         console.log('SUCCCEpp: ');
                         console.log( $scope.positions);
                        console.log('LENGTH: ');
                         console.log( $scope.positions.length);
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
                breadcrumb.set('Positions', '/positions/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;

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

                $scope.refresh();

            }])
    ;
})(window.angular);