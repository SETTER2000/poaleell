angular.module('DashboardModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('assets/templates/toast.html',
            "<div>Your template here</div>"
        );
        $templateCache.put('assets/templates/progressbar.html',
            "<div>Your progressbar here</div>"
        );
    }])
//.config(function ($routeProvider, $locationProvider) {
//    $routeProvider
//
//        .when('/', {
//            templateUrl: '/js/private/dashboard/tpl/dashboard.tpl.html',
//            controller: 'DashboardController'
//        })
//
//        .when('/account', {
//            templateUrl: '/js/private/dashboard/account/tpl/account.tpl.html',
//            controller: 'AccountController'
//        })
//    ;
//    $locationProvider.html5Mode({enabled: true, requireBase: false});
//})

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                views: {


                    //'sidebar@': {templateUrl: '/js/private/tpl/sidebar.tpl.html'},

                    // Абсолютное позиционирование вида 'footerTwo' в корневом безымянном состоянии.
                    // <div ui-view='footerTwo'/> внутри index.html
                    // "footerTwo@" : { }
                    'footerTwo@': {templateUrl: '/js/private/dashboard/tpl/footerTwo.html'},
                    '@': {templateUrl: '/js/private/dashboard/tpl/dashboard.html'}
                }
            })
            .state('home.dogs', {
                abstract: true, // запрет на вход в этот URL, о при этом dogs отображается в цепочки урла
                url: 'dogs',
                template: '<ui-view/>'
                // templateUrl: '/js/private/dashboard/tpl/dash.html',
                //controller: function () {
                //
                //}
                // views: {
                //     '@': {
                //         // 'footerTwo@': {templateUrl: '/js/private/dashboard/tpl/footerTwo.html'},
                //        templateUrl: '/js/private/dashboard/tpl/dash.html',
                //         controller:'DashboardController'
                //     }
                //     //'sidebar@': {
                //     //    templateUrl: '/js/private/tpl/sidebar.tpl.html'
                //     //}
                // }
            })

            .state('home.dogs.catalogs', {
                url: '/catalogs',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/list.tpl.html',
                        controller: 'ListCatalogController'
                    },
                    "actionView@home.dogs.catalogs": {templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.action.html'},
                }
            })
            .state('home.dogs.catalog', {
                url: '/catalog/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/show.tpl.html',
                        controller: 'CatalogController'
                    }
                }
            })
            .state('home.profile', {
            url: 'profile',
            views: {
                '@': {
                    templateUrl: '/js/private/dashboard/tpl/profile.html',
                    controller: 'ProfileController'
                }
            }
        })
            .state('home.profile.edit', {
                url: '/edit',
                views: {
                    '@': {
                        templateUrl: '/js/private/dashboard/tpl/edit-profile.html',
                        controller: 'EditProfileController'
                    }
                }
            })
            .state('home.about', {
                url: 'about',
                views: {
                    '@': {
                        templateUrl: '/js/private/dashboard/tpl/about.html',
                        controller: 'AboutController'
                    }
                }

            })
        // .state('home.profile.restore', {
        //     url: 'restore',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/dashboard/tpl/restore-profile.html',
        //             controller: 'RestoreProfileController'
        //         }
        //     }
        // })
        //    .state('account', {
        //        url: '/account',
        //        templateUrl: '/js/private/dashboard/account/tpl/account.tpl.html'
        //    })
        //    .state('contact', {
        //        url: '/contact',
        //        // Будет автоматически вложен в безымянный ui-view
        //        // родительского шаблона. Начиная с состояния верхнего уровня,
        //        // шаблоном этого родительского состояния является index.html.
        //        templateUrl: '/js/private/contacts.html'
        //    })
        //
        //    .state('contact.detail', {
        //        views: {
        //            /////////////////////////////////////////////////////
        //            // Относительное позиционирование                  //
        //            // позиционируется родительское состояние в ui-view//
        //            /////////////////////////////////////////////////////
        //
        //            // Относительное позиционирование вида 'detail' в родительском
        //            // состоянии 'contacts'.
        //            // <div ui-view='detail'/> внутри contacts.html
        //            // "detail": {},
        //
        //            // Относительное поциционирование безымянного вида в родительском
        //            // состояния 'contacts'.
        //            // <div ui-view/> внутри contacts.html
        //            // "": {}
        //
        //            ////////////////////////////////////////////////////////////////////////////
        //            // Абсолютное позиционирование '@'                                        //
        //            // Позиционирование любых видов внутри этого состояния или предшествующего //
        //            ////////////////////////////////////////////////////////////////////////////
        //
        //            // Абсолютное позиционирование вида 'info' в состоянии 'contacts.detail'.
        //            // <div ui-view='info'/> внутри contacts.detail.html
        //            //"info@contacts.detail" : { }
        //
        //            // Абсолютное позиционирование вида 'detail' в состоянии 'contacts'.
        //            // <div ui-view='detail'/> внутри contacts.html
        //            "detail@contact": {templateUrl: '/js/private/contact.detail.tpl.html'}
        //
        //            // Абсолютное позиционирование безымянного вида в родительском
        //            // состоянии 'contacts'.
        //            // <div ui-view/> внутри contacts.html
        //            // "@contacts" : { }
        //
        //            // Абсолютное позиционирование вида 'status' в корневом безымянном состоянии.
        //            // <div ui-view='status'/> внутри index.html
        //            // "status@" : { }
        //
        //            // Абсолютное позиционирование безымянного вида в корневом безымянном состоянии.
        //            // <div ui-view/> внутри index.html
        //            // "@" : { }
        //        }
        //        // .state('route1.viewC', {
        //        //     url: "/route1",
        //        //     views: {
        //        //         "viewC": { template: "route1.viewA" }
        //        //     }
        //        // })
        //        // .state('route2', {
        //        //     url: "/route2",
        //        //     views: {
        //        //         "viewA": { template: "route2.viewA" },
        //        //         "viewB": { template: "route2.viewB" }
        //        //     }
        //        // })
        //    })
        ;
    })
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            // templates: {
            //     toast: 'directives/toast/toast.html',
            //     progressbar: 'directives/progressbar/progressbar.html'
            // },
            positionClass: 'toast-top-right',
            // positionClass: 'toast-top-left',
            // positionClass: 'toast-top-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: true,
            target: 'body',
            // iconClasses: {
            //     error: 'toast-error',
            //     info: 'toast-info',
            //     success: 'toast-success',
            //     warning: 'toast-warning'
            // },
            messageClass: 'toast-message',
            titleClass: 'toast-title',
            toastClass: 'toast',
            // closeButton:true,
            extendedTimeOut:1000,
            "showDuration": "100",
            "hideDuration": "300",
            "timeOut": "5000",
            "progressBar": false,
        });
    })
;