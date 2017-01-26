angular.module('UserModule', ['toastr', 'ngResource', 'ngRoute'])
    .config(moduleConfig)
    .constant('CONF_MODULE', {baseUrl: 'http://localhost\\:1337/user/'})
    .factory('Users', function ($resource, CONF_MODULE) {
        var Users = $resource(
            CONF_MODULE.baseUrl,
            {id: '@_id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {method: 'PUT'}
            }
        );
        Users.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };
        return Users;
    });

moduleConfig.$inject = ['$routeProvider', '$locationProvider', 'CONF_MODULE'];
function moduleConfig($routeProvider, $locationProvider, CONF_MODULE) {
    $routeProvider

        .when('/admin/users/list', {
            templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
            controller: 'ListController'
        })

        .when('/admin/users/show/:id', {
            templateUrl: '/js/private/admin/users/tpl/show.tpl.html',
            controller: 'ShowController'
        })

        .when('/admin/users/edit/:id', {
            templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
            controller: 'EditController'
        })

        .otherwise({redirectTo: '/admin/users/list'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}
