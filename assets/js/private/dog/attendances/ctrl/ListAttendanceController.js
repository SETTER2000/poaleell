(function (angular) {
    'use strict';
    angular.module('AttendanceModule')
        .controller('ListAttendanceController', ['$scope', '$http', 'moment', 'Attendances', '$state',
            function ($scope, $http, moment, Attendances, $state) {
                $scope.me = window.SAILS_LOCALS.me;
                if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
                
                
                /**
                 * PAGINATION
                 */
                $scope.defaultRows = 150;
                $scope.limitRows = [30, 50, 70, 100];
                $scope.currentPage = 1; // инициализируем кнопку постраничной навигации

                $scope.sort = 'date';
                $scope.limitAll = 1000;
                $scope.selectCount = 0;

                $scope.items = Attendances.query({limit: $scope.limitAll, sort: $scope.sort}, function (attendances) {
                    $scope.attendances = attendances;
                    $scope.numPages = attendances.length;
                    console.log('ATTENDANCES 22: ');
                    console.log($scope.attendances);
                    console.log($scope.attendances.length);
                    $scope.numPages = Math.floor(attendances.length / $scope.defaultRows) + 1;
                });


                //$scope.$watch('items', function (value) {
                //    $scope.items = value;
                //});
                //console.log('IIIOP!');
                //console.log( $scope.it);
                //$scope.getTargetUser = function (item) {
                //    $http.post('/att', item)
                //        .then(function (attendance) {
                //            console.log('attendance^^');
                //            console.log(attendance);
                //            $scope.differ(attendance);
                //            console.log('DDD:');
                //            console.log($scope.items);
                //            $scope.numPages = Math.floor($scope.items.length / $scope.defaultRows) + 1;
                //        });
                //};


                //$scope.differ = function (attendance) {
                //    var data = [];
                //    for (var i = 0; i < attendance.data.length; i++) {
                //        (function () { // каждая созданная функция будет работать со своей локальной переменной.
                //            var local = i;
                //            data.push({
                //                'getFullName': function () {
                //                    return this.lname + ' ' + this.fname + ' ' + this.pname;
                //                },
                //                getContact: function (fieldName) {
                //                    return this.date;
                //                },
                //                'patronymicName': attendance.data[local].pname,
                //                'lastName': attendance.data[local].lname,
                //                'firstName': attendance.data[local].fname,
                //                'date': attendance.data[local].date,
                //                'birthday': attendance.data[local].time_in,
                //                'login': attendance.data[local].time_out,
                //                'email': attendance.data[local].email
                //            });
                //        })();
                //    }
                //    $scope.items = data;
                //};


                $scope.propertyName = 'fio';
                $scope.reverse = false;


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
                breadcrumb.set('Attendances', '/attendances/' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;

                $scope.tug = function () {
                    $scope.gle = $scope.gle ? false : true;
                };

                // $scope.refresh();
            }
        ])
    ;
})(window.angular);