//angular.module('HomepageModule', []);
//angular.module('SignupModule', []);
//angular.module('DashboardModule', []);
//angular.module('Holiday', ['ngRoute',
//    'ngResource', 'ngAnimate', 'toastr', 'compareTo',
//    'SignupModule', 'HomepageModule', 'DashboardModule']).config(HolidayConfig);


angular.module('Holiday', ['ngRoute', 'ngResource', 'DashboardModule', 'UserModule'])
    // .constant("baseUrl", "http://localhost\\:1337")
    .config(HolidayConfig)
    .controller('HolidayController', ['$scope', '$http', function ($scope, $http) {
        //$scope.logout = function () {
        //    window.SAILS_LOCALS = {me:null};
        //    $http.get('/logout');
        //}
    }]);

HolidayConfig.$inject = ['$routeProvider', '$locationProvider'];
function HolidayConfig($routeProvider, $locationProvider) {

    //$routeProvider.when('/signup', {
    //    templateUrl: 'view/signup.html', controller: 'SignupController'
    //});
    ////if()
    //$routeProvider.when('/dashboard', {
    //    templateUrl: 'view/dashboard.html', controller: 'DashboardController'
    //});
    $routeProvider.when('/user', {
        templateUrl: 'view/user/user.html', controller: 'UserController'
    });

    $routeProvider.when('/edit', {
        templateUrl: 'view/user/edit.html', controller: 'UserController'
    });

    // $routeProvider.when('/logout', {
    //      controller: 'UserController'
    // });

    $routeProvider.when('/', {
        templateUrl: 'view/home.html', controller: 'DashboardController'
    });

    //$routeProvider.when('/user', {
    //    templateUrl: 'view/home.html', controller: 'DashboardController'
    //});

    $routeProvider.otherwise({redirectTo: '/'});
    //$routeProvider.otherwise({
    //    templateUrl: "view/home.html" , controller: 'HomepageController'
    //});
    $locationProvider.html5Mode({enabled: true, requireBase: false});
}
