angular.module('PositionModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.positions', {
                url: '/positions',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/positions/tpl/list.tpl.html',
                        controller: 'ListPositionController'
                    }
                }
            })
            .state('home.admin.positions.edit', {
                url: '/edit/:positionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/edit.tpl.html',
                        controller: 'EditPositionController'
                    }
                }
            })
            .state('home.admin.positions.settings', {
                url: '/settings',
                templateUrl: '/js/private/admin/positions/views/home.admin.positions.settings.html',
                controller: 'ListPositionController'
            })
            .state('home.admin.position', {
                url: '/position/:positionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/show.tpl.html',
                        controller: 'PositionController'
                    }
                }
            })
            .state('home.admin.positions.create', {
                url: '/create/:positionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/edit.tpl.html',
                        controller: 'EditPositionController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_POSITION', {baseUrl: '/position/:positionId'})
    .factory('Positions', function ($resource, CONF_MODULE_POSITION) {

        var Positions = $resource(
            CONF_MODULE_POSITION.baseUrl,
            {positionId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Positions.prototype.formatDate = function (date) {

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

        Positions.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Positions.prototype.sc = function () {
            return this.section;
        };
        Positions.prototype.scs = function () {
            return this.sections;
        };

        Positions.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Positions.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Positions.prototype.getListUrl = function () {
            return '/admin/positions';
        };
        Positions.prototype.getEditUrl = function (id) {
            return '/admin/positions/edit/' + id;
        };
        Positions.prototype.getShowUrl = function (id) {
            return '/admin/position/' + id;
        };
        Positions.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Positions.prototype.addPosition = function (item) {
            if (angular.isArray(item.positions)) {
                item.positions.push({});
            } else {
                item.positions = [{}];
            }
            return item;
        };
        Positions.prototype.arr = [];
        Positions.prototype.removePosition = function (position, item) {
            if (angular.isDefined(position) &&
                angular.isDefined(position.id)) {
                this.arr.push(position.id);
            }
            var positions = item.positions;
            for (var i = 0, ii = positions.length; i < ii; i++) {
                if (position === positions[i]) {
                    positions.splice(i, 1);
                }
            }
            return item.removePosition = this.arr;
        };
        return Positions;
    })
;
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
