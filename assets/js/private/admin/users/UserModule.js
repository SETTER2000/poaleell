angular.module('UserModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
           
            .state('admin.users', {
                url: '/users',
                //template:'<h1>Users</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
                        controller: 'ListController'
                    }
                }
                //views: {
                //    '@': {
                //        template: function($stateParams) {
                //            return '<div>Category:' + $stateParams.catId + '<ui-view/></div>';
                //        },
                //        controller: function() {}
                //
                //    }
                //}
            })
            .state('admin.users.edit', {
                url: '/edit/:userId',
                //template:'<h1>Users</h1>',
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                        controller: 'EditController'
                    }
                }
            })
            .state('admin.users.user', {
                url: '/user/:userId',
                //template:'<h1>Users</h1>',
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/user.tpl.html',
                        controller: 'UserController'
                    }
                }
            })

        //        .state('admin.users.edit',{
        //            url:'/:id',
        //            views:{
        //                '@':{
        //                    templateUrl: '/js/private/admin/users/tpl/edit.tpl.html'
        //                },
        //                controller:'EditController'
        //            }
        //        })
        //        .state('admin.users.list', {
        //            url: '/:id',
        //            views: {
        //                '@': {
        //                    templateUrl: '/js/private/admin/users/tpl/list.tpl.html'
        //                },
        //                controller:'ListController'
        //            }
        //        })
        ;
    })
    .constant('CONF_MODULE', {baseUrl: '/user/:userId'})
    .factory('Users', function ($resource, CONF_MODULE) {
        var Users = $resource(
            CONF_MODULE.baseUrl,
            {userId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Users.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Users.prototype.sc = function () {
            return this.section;
        };
        Users.prototype.scs = function () {
            return this.sections;
        };

        Users.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Users.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Users.prototype.lastDateSetting = function () {
            return new Date();
        };

        return Users;
    })
;


// moduleConfig.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
//
// function moduleConfig($stateProvider, $urlRouterProvider, $locationProvider) {
//     $locationProvider.html5Mode({enabled: true, requireBase: false});
//
//     $stateProvider
//         .state('admin', {
//             // url: '/admin',
//             templateUrl: '/js/private/admin/tpl/admin.tpl.html'
//         })
//
//         .state('contact.users', {
//             // url: '/users/list',
//             views: {
//                 users: {
//                     templateUrl: '/js/private/admin/users/tpl/list.tpl.html'
//                 }
//             }
//
//             // controller: '/js/private/admin/users/ctrl/ListController.js'
//
//         })
//     ;
//     // .when('/admin/users/list', {
//     //     templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
//     //     controller: 'ListController'
//     // })
//     //
//     // .when('/admin/users/show/:id', {
//     //     templateUrl: '/js/private/admin/users/tpl/show.tpl.html',
//     //     controller: 'ShowController'
//     // })
//     //
//     // .when('/admin/users/edit/:id', {
//     //     templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
//     //     controller: 'EditController'
//     // })
//     //
//     // .when('/admin/users/delete/:id', {
//     //     templateUrl: '/js/private/admin/users/tpl/delete.tpl.html',
//     //     controller: 'DeleteController'
//     // })
//     //
//     // .otherwise({redirectTo: '/admin/users/list'});
//
// }
