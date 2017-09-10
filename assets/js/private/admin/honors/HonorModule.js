angular.module('HonorModule', ['ui.router', 'toastr', 'ngResource', 'angular-js-xlsx', 'angularFileUpload','ngAnimate'])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://localhost:1338/**'
        ]);
    }])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home.admin.honors', {
                url: '/honors',
                views: {
                    //'sidebar@': {templateUrl: '/js/private/tpl/sidebar.tpl.html'},
                    '@': {
                        templateUrl: '/js/private/admin/honors/tpl/honor.tpl.html',
                        controller: 'HonorController'
                    }
                }
            })
            .state('home.admin.upload', {
                url: '/upload',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/honors/tpl/upload.html',
                        controller: 'HonorController'
                    }
                }
            })
            .state('home.honor.upload', {
                url: 'upload',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/honors/tpl/upload.html',
                        controller: 'HonorController'
                    }
                }
            })
        ;
    })
    .directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var file = event.target.files[0];
                    scope.file = file ? file : undefined;
                    scope.$apply();
                });
            }
        };
    })
;