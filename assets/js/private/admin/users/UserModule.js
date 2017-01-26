angular.module('UserModule', ['toastr', 'ngResource', 'ngRoute'])
    .config(HolidayConfig)
    .constant('CONF_MODULE', {baseUrl: '/admin/users/list'})
    .factory('Users', function ($resource) {
        var Users = $resource(
            'http://localhost\\:1337/user/',
            {id: '@_id'}
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            // {
            //     update: {method: 'PUT'}
            // }
        );
        Users.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };
        return Users;
    });

HolidayConfig.$inject = ['$routeProvider', '$locationProvider', 'CONF_MODULE'];
function HolidayConfig($routeProvider, $locationProvider, CONF_MODULE) {
    $routeProvider

        .when(CONF_MODULE.baseUrl, {
            templateUrl: '/js/private/admin/users/list.tpl.html',
            controller: 'ListController'
        })

        //.when('/admin/users/:id', {
        //    templateUrl: '/js/private/admin/users/edit.tpl.html',
        //    controller: 'UserController'
        //})

        .when('/admin/users/:id', {
            templateUrl: '/js/private/admin/users/user.tpl.html',
            controller: 'UserController'
        })

        .otherwise({redirectTo: CONF_MODULE.baseUrl});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}
