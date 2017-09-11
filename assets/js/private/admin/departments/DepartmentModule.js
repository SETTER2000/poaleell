angular.module('DepartmentModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.departments', {
                url: '/departments',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/list.tpl.html',
                        controller: 'ListDepartmentController'
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
            .state('home.admin.departments.edit', {
                url: '/edit/:depId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/edit.tpl.html',
                        controller: 'EditDepartmentController'
                    }
                }
            })
            .state('home.admin.departments.create', {
                url: '/create/:departmentId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/edit.tpl.html',
                        controller: 'EditDepartmentController'
                    }
                }
            })
            .state('home.admin.depart', {
               url: '/depart/:depId',
               views: {
                   '@': {
                       templateUrl: '/js/private/admin/departments/tpl/list.tpl.html',
                       controller: 'EditDepartmentController'
                   }
               }
            })
            .state('home.admin.department', {
                url: '/department/:depId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/show.tpl.html',
                        controller: 'DepartmentController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE_DEPARTMENT', {baseUrl: '/departments/:depId'})
    .factory('Departments', function ($resource, CONF_MODULE_DEPARTMENT) {
        var Departments = $resource(
            CONF_MODULE_DEPARTMENT.baseUrl,
            {depId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Departments.prototype.getFullName = function () {
            return this.name;
        };

         Departments.prototype.sc = function () {
             return this.section;
         };
         Departments.prototype.scs = function () {
             return this.sections;
         };

        Departments.prototype.ok = function () {
            return alert(this.section + ': ' + this.name + ' изменён!');
        };
        Departments.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name +  ' - изменения не приняты!');
        };
        Departments.prototype.getListUrl = function () {
            return '/admin/departments';
        };
        Departments.prototype.getEditUrl = function (id) {
            return '/admin/departments/edit/'+id;
        };
        Departments.prototype.getShowUrl = function (id) {
            return '/admin/department/'+id;
        };
        Departments.prototype.deactivation = function () {
            return  ' - деактивирован';
        };

        return Departments;
    })
;