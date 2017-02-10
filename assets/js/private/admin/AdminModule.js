angular.module('AdminModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin', {
            url: 'admin',
            // templateUrl: '/js/private/admin/tpl/admin.tpl.html'
            //controller: function () {
            //
            //}
            views: {
                '@': {
                    templateUrl: '/js/private/admin/tpl/admin.tpl.html',
                    controller:'AdminController'
                }
                //'sidebar@': {
                //    templateUrl: '/js/private/tpl/sidebar.tpl.html'
                //}
            }
        })
        ;
    })
    // .constant('CONF_MODULE', {baseUrl: '/user/:userId'})
    // .factory('Users', function ($resource, CONF_MODULE) {
    //     var Users = $resource(
    //         CONF_MODULE.baseUrl,
    //         {userId: '@id'},
    //         // Определяем собственный метод update на обоих уровнях, класса и экземпляра
    //         {
    //             update: {
    //                 method: 'PUT'
    //             }
    //         }
    //     );
    //
    //     Users.prototype.getFullName = function () {
    //         return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
    //     };
    //
    //     Users.prototype.ok = function () {
    //         return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
    //     };
    //     Users.prototype.lastDateSetting = function () {
    //         return new Date();
    //     };
    //
    //     return Users;
    // })
;