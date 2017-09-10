angular.module('TitleModule')
    .controller('TitleController', ['$scope', 'toastr', '$state', 'Titles', '$stateParams',
        function ($scope, toastr, $state, Titles, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');

            $scope.nameArea = 'Наименование';
            $scope.descriptionArea = 'Описание';
            $scope.descriptionEnArea = 'Описание на английском';
            
            
            
            $scope.refresh = function () {
                $scope.item = Titles.get({id: $stateParams.titleId}, function (titles) {
                    $scope.users = titles;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 2781! ' + err.data.message);
                });
            };

            // конструктор хлебных крошек
            function BreadCrumb() {
                var name;
                var path;
                this.arr = [];
            }

            BreadCrumb.prototype.add = function () {
                this.arr.push({name: this.name, path: this.path});
            };

            BreadCrumb.prototype.set = function (name, path) {
                this.name = name;
                this.path = path;
                this.add();
            };
            BreadCrumb.prototype.getAll = function () {
                return this.arr;
            };

            var breadcrumb = new BreadCrumb();
            breadcrumb.set('Home', '/');
            breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Titles', 'home.admin.titles');
            breadcrumb.set('Show', 'home.admin.titles' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
