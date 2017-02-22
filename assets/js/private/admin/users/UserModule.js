angular.module('UserModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate', 'ng-fx'])
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
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }

        };
        Users.prototype.deactivation = function () {
            return ' - уволены';
        };

        return Users;
    })
    /**
     * Выборка фамилий по первой букве
     */
    .filter('firstChar', function () {
        return function (value, param, char) {
            if (char.length > 0) {
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
    //.filter('paginationButton', function () {
    //    return function (value, limitRows) {
    //        if (angular.isArray(value) && angular.isNumber(limitRows)) {
    //            var count_page;
    //            var arrButton = [];
    //            // Кол-во страниц (ни строк на странице!) или можно сказать, кол-во кнопок
    //            if (value.length <= limitRows) {
    //                count_page = 1;
    //            } else {
    //                count_page = Math.floor(value.length / limitRows) + 1;
    //            }
    //
    //            var numberPage = 1;
    //            for (var i = 0; i < count_page; i++) {
    //
    //                //каждый пуш это кнопка, пока без свойств
    //                arrButton.push({'numberPage': numberPage++, 'allCountPage': count_page});
    //            }
    //        }
    //        console.log(arrButton);
    //        return arrButton;
    //    }
    //})
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
    .filter("skipItems", function () {

        return function (value, count) {
            // isArray - проверка, что переменная является массивом
            // isNumber - проверка, что переменная является числом
            if (angular.isArray(value) && angular.isNumber(count)) {
                if (count > value.length || count < 1) {
                    return value;
                } else {
                    return value.slice(count);
                }
            } else {
                return value;
            }
        }

    })
    .directive('pagination', function() {
        return {
            restrict: 'E',
            scope: {
                numPages: '=',
                currentPage: '=',
                onSelectPage: '&'
            },
            template:
            '<nav aria-label="Page navigation">'+
            '<ul class="pagination">' +
            '<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li>' +
            '<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
            '<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li>' +
            '</ul>' +
            '</nav>',
            replace: true,
            link: function(scope) {
                scope.$watch('numPages', function(value) {
                    scope.pages = [];
                    for(var i=1;i<=value;i++) {
                        scope.pages.push(i);
                    }
                    if ( scope.currentPage > value ) {
                        scope.selectPage(value);
                    }
                });
                scope.noPrevious = function() {
                    return scope.currentPage === 1;
                };
                scope.noNext = function() {
                    return scope.currentPage === scope.numPages;
                };
                scope.isActive = function(page) {
                    return scope.currentPage === page;
                };

                scope.selectPage = function(page) {
                    if ( ! scope.isActive(page) ) {
                        scope.currentPage = page;
                        scope.onSelectPage({ page: page });
                    }
                };

                scope.selectPrevious = function() {
                    if ( !scope.noPrevious() ) {
                        scope.selectPage(scope.currentPage-1);
                    }
                };
                scope.selectNext = function() {
                    if ( !scope.noNext() ) {
                        scope.selectPage(scope.currentPage+1);
                    }
                };
            }
        };
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
