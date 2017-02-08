angular.module('DepartmentModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.departments', {
                url: '/departments',
                //template:'<h1>Departments</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/list.tpl.html',
                        controller: 'ListDepartmentController'
                        //template:'<h1>DEPARTAMENT</h1>'
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
            //.state('home.admin.depart', {
            //    url: '/depart/:depId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/departments/tpl/list.tpl.html',
            //            controller: 'EditDepartmentController'
            //        }
            //    }
            //})
            .state('home.admin.department', {
                url: '/department/:depId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/departments/tpl/department.tpl.html',
                        controller: 'DepartmentController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE2', {baseUrl: '/department/:depId'})
    .factory('Departments', function ($resource, CONF_MODULE2) {
        var Departments = $resource(
            CONF_MODULE2.baseUrl,
            {depId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        //Departments.prototype.getFullName = function () {
        //    return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        //};

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
        // Departments.prototype.action = function () {
        //  return 
        // };

        return Departments;
    })
;