angular.module('AttendanceModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.attendances', {
                url: '/attendances',
                //template:'<h1>Attendances</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
                        controller: 'ListAttendanceController'
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
            .state('home.admin.attendances.edit', {
                url: '/edit/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
            //.state('home.admin.depart', {
            //    url: '/depart/:attendanceId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //            controller: 'EditAttendanceController'
            //        }
            //    }
            //})
            .state('home.admin.attendance', {
                url: '/attendance/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/show.tpl.html',
                        controller: 'AttendanceController'
                    }
                }
            })
            .state('home.admin.attendances.create', {
                url: '/create/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE_Attendance', {baseUrl: '/attendance/:attendanceId'})
    .factory('Attendances', function ($resource, CONF_MODULE_Attendance) {
        var Attendances = $resource(
            CONF_MODULE_Attendance.baseUrl,
            {attendanceId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Attendances.prototype.getFullName = function () {
            //item.employees[0].lname
            return this.employees[0].lname + ' ' + this.employees[0].fname + ' ' + this.employees[0].pname;
        };

         Attendances.prototype.sc = function () {
             return this.section;
         };
         Attendances.prototype.scs = function () {
             return this.sections;
         };

        Attendances.prototype.ok = function () {
            return alert(this.section + ': ' + this.name + ' изменён!');
        };
        Attendances.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name +  ' - изменения не приняты!');
        };
        Attendances.prototype.getListUrl = function () {
            return '/admin/attendances';
        };
        Attendances.prototype.getEditUrl = function (id) {
            return '/admin/attendances/edit/'+id;
        };
        Attendances.prototype.getShowUrl = function (id) {
            return '/admin/attendance/'+id;
        };
        Attendances.prototype.getCreateUrl = function () {
            return '/admin/attendances/create';
        };
        Attendances.prototype.deactivation = function () {
            return  ' - деактивирован';
        };
        Attendances.prototype.getNamePage = function () {
            return 'Посещаемость';
        };

        return Attendances;
    })
    //.filter("agEmployees", function () {
    //
    //    return function (value, nameField) {
    //        // isArray - проверка, что переменная является массивом
    //        // isNumber - проверка, что переменная является числом
    //        if (angular.isArray(value) && angular.isString(nameField)) {
    //
    //            return value[value.employees[0].nameField];
    //            //if (count > value.length || count < 1) {
    //            //    return value;
    //            //} else {
    //            //    return value.slice(count);
    //            //}
    //        } else {
    //            return value;
    //        }
    //    }
    //
    //})
;