angular.module('UserModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        // Любые неопределенные url перенаправлять на /state1
        // $urlRouterProvider.otherwise("/");
        $urlRouterProvider.otherwise('/admin/users/list');
        // Теперь определим состояния
        $stateProvider
            .state('admin', {
                url: '/admin',
                // templateUrl: '/js/private/admin/tpl/admin.tpl.html'
                views:{
                    // Абсолютное позиционирование вида 'admin' в корневом безымянном состоянии.
                    //         // Безымянное состояние это index.html главная страница сайта
                    //         // <div ui-view='admin'/> внутри index.html
                    //         // "admin@" : { }
                    "body@":{
                        templateUrl: '/js/private/admin/tpl/admin.tpl.html'
                    },
                    "sidebar@":{
                        templateUrl: '/js/private/tpl/sidebar.tpl.html'
                    }
                }
                // Абсолютное позиционирование вида 'status' в корневом безымянном состоянии.
                //         // Безымянное состояние это index.html главная страница сайта
                //         // <div ui-view='status'/> внутри index.html
                //         // "status@" : { }
                // abstract: true,
                // url: '/admin'
                // Примечание: абстрактное состояние все еще нуждается в ui-view для вставки потомков.
                // Можно просто добавить его в одну строчку.
                // template: '<ui-view/>'
            })
            // .state('admin', {
            //     // abstract: true,
            //     url: '/admin',
            //     // Примечание: абстрактное состояние все еще нуждается в ui-view для вставки потомков.
            //     // Можно просто добавить его в одну строчку.
            //     templateUrl: '/js/private/admin/tpl/admin.tpl.html'
            // })
            .state('admin.users', {
                url: '/users',
                views:{
                    "users":{
                        templateUrl: '/js/private/admin/users/tpl/users.tpl.html'
                    }
                    // "@users" : {  templateUrl: '/js/private/admin/users/tpl/index.tpl.html'}
                }
            })
            // .state('admin.users', {
            //     abstract: true,
            //     // url станет '/admin/users'
            //     url: '/users',
            //     // templateUrl:'/js/private/admin/tpl/users.tpl.html'
            //     template: '<ui-view/>'
            // })
            .state('admin.users.list', {
                // url станет '/admin/users/list'
                url: '/list',
                templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
                controller: 'ListController'
            })
            .state('admin.users.list.settings', {
                views: {
                    "settings": {
                        templateUrl: '/js/private/admin/users/views/admin.users.list.settings.html',
                        controller:'ListController'
                    }
                }
                // controller:'ListController'
            })
            .state('admin.users.show', {
                // url станет '/admin/users/show'
                url: '/show/:id',
                templateUrl: '/js/private/admin/users/tpl/show.tpl.html',
                controller: 'ShowController'
            })
            .state('admin.users.edit', {
                
                // Абсолютное позиционирование безымянного вида в родительском
                //         // состоянии 'contacts'.
                //         // <div ui-view/> внутри contacts.html
                //         // "@contacts" : { }
                // url станет '/admin/users/edit'
                url: '/edit/:id',
                templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                controller: 'EditController'
            })
            // .state('admin.users.edit', {
            //     templateUrl: function ($stateParams){
            //         return '/admin/users/edit/' + $stateParams.id ;
            //     }
            // })
        ;
        // .state('index', {
        //     url: '/',
        //     views: {
        //         'sidebar': {templateUrl: '/js/private/tpl/sidebar.tpl.html'},
        //         'body': {templateUrl: '/js/private/tpl/workspace.tpl.html'}
        //     }
        // })
        // .state('account', {
        //     url: '/account',
        //     templateUrl: '/js/private/dashboard/account/tpl/account.tpl.html'
        // })
        // .state('contact', {
        //     url: '/contact',
        //     // Будет автоматически вложен в безымянный ui-view
        //     // родительского шаблона. Начиная с состояния верхнего уровня,
        //     // шаблоном этого родительского состояния является index.html.
        //     templateUrl: '/js/private/contacts.html'
        // })
        //
        // .state('contact.detail', {
        //     views: {
        //         /////////////////////////////////////////////////////
        //         // Относительное позиционирование                  //
        //         // позиционируется родительское состояние в ui-view//
        //         /////////////////////////////////////////////////////
        //
        //         // Относительное позиционирование вида 'detail' в родительском
        //         // состоянии 'contacts'.
        //         // <div ui-view='detail'/> внутри contacts.html
        //         // "detail": {},
        //
        //         // Относительное поциционирование безымянного вида в родительском
        //         // состояния 'contacts'.
        //         // <div ui-view/> внутри contacts.html
        //         // "": {}
        //
        //         ////////////////////////////////////////////////////////////////////////////
        //         // Абсолютное позиционирование '@'                                        //
        //         // Позиционирование любых видов внутри этого состояния или предшествующего //
        //         ////////////////////////////////////////////////////////////////////////////
        //
        //         // Абсолютное позиционирование вида 'info' в состоянии 'contacts.detail'.
        //         // <div ui-view='info'/> внутри contacts.detail.html
        //         //"info@contacts.detail" : { }
        //
        //         // Абсолютное позиционирование вида 'detail' в состоянии 'contacts'.
        //         // <div ui-view='detail'/> внутри contacts.html
        //         "detail@contact" : {  templateUrl: '/js/private/contact.detail.tpl.html' }
        //
        //         // Абсолютное позиционирование безымянного вида в родительском
        //         // состоянии 'contacts'.
        //         // <div ui-view/> внутри contacts.html
        //         // "@contacts" : { }
        //status@
        //         // Абсолютное позиционирование вида 'status' в корневом безымянном состоянии.
        //         // <div ui-view='status'/> внутри index.html
        //         // "status@" : { }
        //
        //         // Абсолютное позиционирование безымянного вида в корневом безымянном состоянии.
        //         // <div ui-view/> внутри index.html
        //         // "@" : { }
        //     }
        //     // .state('route1.viewC', {
        //     //     url: "/route1",
        //     //     views: {
        //     //         "viewC": { template: "route1.viewA" }
        //     //     }
        //     // })
        //     // .state('route2', {
        //     //     url: "/route2",
        //     //     views: {
        //     //         "viewA": { template: "route2.viewA" },
        //     //         "viewB": { template: "route2.viewB" }
        //     //     }
        //     // })
        // })
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

        Users.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
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
