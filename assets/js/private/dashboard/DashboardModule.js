angular.module('DashboardModule', ['toastr', 'ngRoute', 'ngResource', 'DashboardModule'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                templateUrl: '/js/private/dashboard/dashboard.tpl.html',
                controller: 'DashboardController'
            })

            .when('/account', {
                templateUrl: '/js/private/dashboard/account.tpl.html',
                controller: 'AccountController'
            })
        ;
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    })
;