angular.module('UserModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate','ng-fx'])
    .config(function ($stateProvider) {
        $stateProvider

            .state('home.admin.users', {
                url: '/users',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
                        controller: 'ListController'
                    }
                }
            })
            .state('home.admin.users.settings', {
                url: '/settings',
                //template:'<h1>Users</h1>'
                //controller: function () {
                //
                //}
                templateUrl: '/js/private/admin/users/views/home.admin.users.settings.html',
                controller: 'ListController'
                //views: {
                //    'settings@': {
                //
                //    }
                //}
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
            .state('home.admin.users.edit', {
                url: '/edit/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                        controller: 'EditController'
                    }
                }
            })
            //.state('home.admin.users.user', {
            .state('home.admin.user', {
                url: '/user/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/show.tpl.html',
                        controller: 'UserController'
                    }
                }
            })
            .state('home.admin.users.create', {
                url: '/create/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                        controller: 'EditController'
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
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .factory('Users', function ($resource, $state, CONF_MODULE) {
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
        Users.prototype.formatDate = function (date) {

            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear();
            //var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return yy + '-' + mm + '-' + dd;
            //return dd + '.' + mm + '.' + yy;
        };

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

        Users.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                this.birthday = tm;
            }
        };

        Users.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                this.dateInWork = tm;
            }
        };

        Users.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                this.firedDate = tm;
            }
        };

        Users.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };

        Users.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };
        Users.prototype.getListUrl = function () {
            return '/admin/users';
        };
        Users.prototype.getEditUrl = function (id) {
            return '/admin/users/edit/' + id;
        };
        Users.prototype.getShowUrl = function (id) {
            return '/admin/user/' + id;
        };
        Users.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Users.prototype.getContact = function (type) {

            for (var i in this.contacts) {
               if(this.contacts[i].type === type){
                   return this.contacts[i].value;
                   //return this.contacts[i].type + ': ' + this.contacts[i].value;
               }
            }

        };
        Users.prototype.deactivation = function () {
            return  ' - уволены';
        };

        return Users;
    })
    /**
     * Выборка фамилий по первой букве
     */
    .filter('firstChar', function () {
        return function (value, param, char) {
            if(char.length > 0){
                if (angular.isArray(value) && angular.isString(param)) {
                    var arr = [];
                    for (var i = 0, ii = value.length; i < ii; i++) {
                        // console.log(value[i].getFullName()[0]);
                        if (value[i].getFullName()[0] === char) {
                            arr.push(value[i]);
                        }
                    }
                    return arr;
                }
            }
            return value;
        }
    })
    //.animation('.slide', ['$animateCss', function($animateCss) {
    //    return {
    //        enter: function(element) {
    //            return $animateCss(element, {
    //                event: 'enter',
    //                structural: true,
    //                addClass: 'maroon-setting',
    //                from: { height:0 },
    //                to: { height: 2000 }
    //            });
    //        }
    //    }
    //}])
    //.directive(
    //    'dateInput',
    //    function(dateFilter) {
    //        return {
    //            require: 'ngModel',
    //            template: '<input type="date" class="form-control"></input>',
    //            replace: true,
    //            link: function(scope, elm, attrs, ngModelCtrl) {
    //                ngModelCtrl.$formatters.unshift(function (modelValue) {
    //                    return dateFilter(modelValue, 'yyyy-MM-dd');
    //                });
    //
    //                ngModelCtrl.$parsers.push(function(modelValue){
    //                    return angular.toJson(modelValue,true)
    //                        .substring(1,angular.toJson(modelValue).length-1);
    //                })
    //
    //            }
    //        };
    //    })
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
