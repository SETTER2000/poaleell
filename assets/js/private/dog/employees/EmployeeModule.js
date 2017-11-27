angular.module('EmployeeModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.employees', {
                url: '/employees',
                //template:'<h1>Employees</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/employees/tpl/list.tpl.html',
                        controller: 'ListEmployeeController'
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
            .state('home.admin.employees.edit', {
                url: '/edit/:employeeId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/employees/tpl/edit.tpl.html',
                        controller: 'EditEmployeeController'
                    }
                }
            })
            //.state('home.admin.depart', {
            //    url: '/depart/:employeeId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/employees/tpl/list.tpl.html',
            //            controller: 'EditEmployeeController'
            //        }
            //    }
            //})
            .state('home.admin.employee', {
                url: '/employee/:employeeId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/employees/tpl/show.tpl.html',
                        controller: 'EmployeeController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE_EMPLOYEE', {baseUrl: '/employee/:employeeId'})
    .factory('Employees', function ($resource, CONF_MODULE_EMPLOYEE) {
        var Employees = $resource(
            CONF_MODULE_EMPLOYEE.baseUrl,
            {employeeId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Employees.prototype.getFullName = function () {
            return this.lname + ' ' + this.fname + ' ' + this.pname;
        };

         Employees.prototype.sc = function () {
             return this.section;
         };
         Employees.prototype.scs = function () {
             return this.sections;
         };

        Employees.prototype.ok = function () {
            return alert(this.section + ': ' + this.getFullName() + ' изменён!');
        };
        Employees.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name +  ' - изменения не приняты!');
        };
        Employees.prototype.getListUrl = function () {
            return '/admin/employees';
        };
        Employees.prototype.getEditUrl = function (id) {
            return '/admin/employees/edit/'+id;
        };
        Employees.prototype.getShowUrl = function (id) {
            return '/admin/employee/'+id;
        };
        Employees.prototype.deactivation = function () {
            return  ' - деактивирован';
        };

        return Employees;
    })
;