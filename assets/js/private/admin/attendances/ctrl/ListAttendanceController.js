(function (angular) {
    'use strict';
    angular.module('AttendanceModule')
        .controller('ListAttendanceController', ['$scope', 'Attendances', '$state',
            function ($scope, Attendances, $state) {

                $scope.sort = 'date';
                $scope.limitAll = 100;

                // var ups = $scope.ups =  Attendances.query();
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
                //function doStuff() {
                //    return Attendances.query({limit: $scope.limitAll, sort: $scope.sort})
                //        .then(function (appointments) {
                //            console.log(appointments);
                //            return appointments.length;
                //        });
                //}
                //
                //console.log('COR');
                //console.log(doStuff());
                    //}
                    //function doStuff() {
                    //    return Appointments.findByCat({
                    //        catId: $stateParams.catId
                    //    }).then(function(appointments) {
                    //        console.log(appointments);
                    //        return appointments.length;
                    //    });
                    //}
                    //$scope.refresh = function () {
                    /**
                     * При обращении к службе $resource возвращается сгенерированный конструктор,
                     * дополненный методами для взаимодействия с конечной точкой
                     * RESTful: query, get, save и delete.
                     */
                        // Сортировка наоборот sort: 'name DESC'
                    $scope.items = Attendances.query({limit: $scope.limitAll, sort: $scope.sort}, function (attendances) {
                        $scope.attendances = attendances;
                        console.log('ATTENDANCES: ');
                        console.log($scope.attendances);
                        console.log($scope.attendances.length);
                        //console.log($scope.items);
                        // console.log( $scope.attendances.filter({"action": 1}));
                        // console.log(attendances.get({"action": 1},function (success) {
                        //     console.log('URAAA:');
                        //     alert('5685');
                        //     console.log(success);
                        // },function (err) {
                        //     alert('ERRRRRR');
                        //     console.log(err);
                        // }));
                        // кол-во пользователей
                        // console.log($scope.attendances.length);
                        //console.log(attendances.scs());
                    });
                    //};


                    console.log($scope.items);

                    //$scope.sections =   $scope.attendances.sections();
                    $scope.propertyName = 'fio';
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
                    breadcrumb.set('Attendances', '/attendances/' + $state.current.url);
                    $scope.breadcrumbs = breadcrumb;

                    $scope.tug = function () {
                        $scope.gle = $scope.gle ? false : true;
                    };


                    //$scope.refresh();

                }

                ])
    ;
})(window.angular);