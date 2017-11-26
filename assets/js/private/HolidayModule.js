angular.module('Holiday', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngMaterial',
    'SkdModule',
    'StructureModule',
    'PositionModule',
    'TitleModule',
    'PhotoModule',
    'DiaryModule',
    'FurloughModule',
    'VacationModule',
    'ReactionModule',
    'DepartmentModule',
    'EmployeeModule',
    'DashboardModule',
    'UserModule',
    'CalendarModule',
    'AttendanceModule',
    'AdminModule',
    'ShowcaseModule',
    'MessageModule',
    'CatalogModule',
    'HonorModule'
])
    .config(function ($mdThemingProvider) {
        var ob = {
            '50': 'A4BAA0',
            '100': '9DBA97',
            '200': '264D1E',
            '300': '4A5847',
            '400': 'ef5350',
            '500': '5C7457',  // '500': 'f44336',
            '600': '7A8362',  // '600': 'e53935',
            '700': '5E6350',  // '700': 'd32f2f',
            '800': '475621',  // '800': 'c62828',
            '900': 'B7C19D',  // '900': 'b71c1c',
            'A100': 'B9C1A6', // 'A100': 'ff8a80',
            'A200': '866568',
            'A400': '665254',
            'A700': '592227',
            'contrastDefaultColor': 'light',    // ли по умолчанию текст (контраст)
            // на этой палитре должно быть темно или светло

            'contrastDarkColors': ['50', '100', //оттенки, контраст которых должен быть «темным» по умолчанию
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // также может указать это, если по умолчанию был «темный»,
        };
        var ob2 = {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': '5C7457',  // '500': 'f44336',
            '600': 'b0c2af',  // '600': 'e53935',
            '700': '9DBA97',  // '700': 'd32f2f',
            '800': '4A5747',  // '800': 'c62828',
            '900': '244B1C',  // '900': 'b71c1c',
            'A100': 'A4BAA0', // 'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',    // ли по умолчанию текст (контраст)
            // на этой палитре должно быть темно или светло

            'contrastDarkColors': ['50', '100', //оттенки, контраст которых должен быть «темным» по умолчанию
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // также может указать это, если по умолчанию был «темный»,
        };
        $mdThemingProvider.definePalette('boggyPaletteName', ob);

        $mdThemingProvider.theme('default')
            .primaryPalette('boggyPaletteName');


        // $mdThemingProvider.theme('default')
        //     .primaryPalette('light-green')
        //     .accentPalette('orange');

        // Отключение темы расцветки елементов библиотеки angular-material
        // https://material.angularjs.org/latest/Theming/03_configuring_a_theme
        // $mdThemingProvider.disableTheming();
    })
    // .constant("baseUrl", "http://localhost\\:1337")

    //.config(function ($routeProvider, $locationProvider) {
    //$routeProvider
    //        .when('/', {
    //            templateUrl: '/js/private/holiday.tpl.html',
    //            controller: 'HolidayController'
    //        })
    //        ;
    //    $locationProvider.html5Mode({enabled: true, requireBase: false});
    //})
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $urlRouterProvider.otherwise('/');
//        $stateProvider
//            .state('index', {
//                url: '/',
//                views: {
//                    'sidebar@': {templateUrl: '/js/private/tpl/sidebar.tpl.html'},
//                    'body@': {templateUrl: '/js/private/tpl/workspace.tpl.html'}

//                }
//            })
//            .state('account', {
//                url: '/account',
//                templateUrl: '/js/private/dashboard/account/tpl/account.tpl.html'
//            })
//            .state('contact', {
//                url: '/contact',
//                // Будет автоматически вложен в безымянный ui-view
//                // родительского шаблона. Начиная с состояния верхнего уровня,
//                // шаблоном этого родительского состояния является index.html.
//                templateUrl: '/js/private/contacts.html'
//            })
//
//            .state('contact.detail', {
//                views: {
//                    /////////////////////////////////////////////////////
//                    // Относительное позиционирование                  //
//                    // позиционируется родительское состояние в ui-view//
//                    /////////////////////////////////////////////////////
//
//                    // Относительное позиционирование вида 'detail' в родительском
//                    // состоянии 'contacts'.
//                    // <div ui-view='detail'/> внутри contacts.html
//                    // "detail": {},
//
//                    // Относительное поциционирование безымянного вида в родительском
//                    // состояния 'contacts'.
//                    // <div ui-view/> внутри contacts.html
//                    // "": {}
//
//                    ////////////////////////////////////////////////////////////////////////////
//                    // Абсолютное позиционирование '@'                                        //
//                    // Позиционирование любых видов внутри этого состояния или предшествующего //
//                    ////////////////////////////////////////////////////////////////////////////
//
//                    // Абсолютное позиционирование вида 'info' в состоянии 'contacts.detail'.
//                    // <div ui-view='info'/> внутри contacts.detail.html
//                    //"info@contacts.detail" : { }
//
//                    // Абсолютное позиционирование вида 'detail' в состоянии 'contacts'.
//                    // <div ui-view='detail'/> внутри contacts.html
//                    "detail@contact" : {  templateUrl: '/js/private/contact.detail.tpl.html' }
//
//                    // Абсолютное позиционирование безымянного вида в родительском
//                    // состоянии 'contacts'.
//                    // <div ui-view/> внутри contacts.html
//                    // "@contacts" : { }
//
//                    // Абсолютное позиционирование вида 'status' в корневом безымянном состоянии.
//                    // <div ui-view='status'/> внутри index.html
//                    // "status@" : { }
//
//                    // Абсолютное позиционирование безымянного вида в корневом безымянном состоянии.
//                    // <div ui-view/> внутри index.html
//                    // "@" : { }
//                }
//                // .state('route1.viewC', {
//                //     url: "/route1",
//                //     views: {
//                //         "viewC": { template: "route1.viewA" }
//                //     }
//                // })
//                // .state('route2', {
//                //     url: "/route2",
//                //     views: {
//                //         "viewA": { template: "route2.viewA" },
//                //         "viewB": { template: "route2.viewB" }
//                //     }
//                // })
//            })
    })
    .controller('HolidayController', ['$scope', '$window', function ($scope) {
        //$scope.logout = function () {
        //    window.SAILS_LOCALS = {me:null};
        //    $http.get('/logout');
        //}

        $scope.firstName = 'Петя';
        $scope.header = function () {
            return 'Привет, ' + $scope.firstName;
        };

    }]);


