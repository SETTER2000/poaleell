angular.module('DashboardModule', ['toastr', 'ngRoute', 'ngResource', 'UserModule'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                templateUrl: '/js/private/dashboard/tpl/dashboard.tpl.html',
                controller: 'DashboardController'
            })

            .when('/account', {
                templateUrl: '/js/private/dashboard/account/tpl/account.tpl.html',
                controller: 'AccountController'
            })
        ;
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    })

;