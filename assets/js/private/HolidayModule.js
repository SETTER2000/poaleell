angular.module('Holiday', ['ngRoute', 'ngResource', 'DashboardModule', 'UserModule'])
    // .constant("baseUrl", "http://localhost\\:1337")

    //.config(function ($routeProvider, $locationProvider) {
    //$routeProvider
    //        .when('/', {
    //            templateUrl: '/js/private/holiday.tpl.html',
    //            controller: 'HolidayController'
    //        })
    //        ;
    //    $locationProvider.html5Mode({enabled: true, requireBase: false});
    //})

    .controller('HolidayController', ['$scope', '$http', function ($scope, $http) {
        //$scope.logout = function () {
        //    window.SAILS_LOCALS = {me:null};
        //    $http.get('/logout');
        //}
        $scope.firstName = 'Петя';
        $scope.header = function () {
           return 'Привет, ' + $scope.firstName;
        };

    }]);


