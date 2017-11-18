
angular.module('DashboardModule')
//.constant('baseUrl', 'http://localhost:1337')
    .controller('AboutController', ['$scope','$http', '$window','$state', '$stateParams', 'Users', 'toastr', '$resource','$rootScope',
        function ($scope,$http, $window,$state,  $stateParams, Users, toastr, $resource,$rootScope) {
            // $scope.deleteEdit = function () {
            //     // $emit - отправка события от текущего scope к родительским scope
            //     // $scope.$emit("deleteUser", item);
            //     // $broadcast - отправка события всем scope от rootScope
            //     // $rootScope.$broadcast("deleteUser", {
            //     //     message: 'GOOOO'
            //     // });
            //     $rootScope.$broadcast("deleteUser", {
            //         message: 'GOOOO'
            //     });
            // };
            //$scope.itemsResource = $resource(baseUrl);


            $scope.data = $window.SAILS_LOCALS.me;



            // console.log('$state.$current', $state.$current);
            // console.log('$state.$current.self.url', $state.$current.self.url);
            // console.log('$state.$current.parent.url', $state.$current.parent.url);
            $scope.currentNavItem = 'page1';
            $scope.sendRequest = function () {
                var promise = $http.post('/user');
                // console.log('promise', promise);
                promise.then(fullfilled, rejected);
                return false
            };

            // $scope.refresh = function () {
            //     $scope.item = Users.get({id: $scope.sendRequest.id}, function (users) {
            //         $scope.users = users;
            //         // кол-во пользователей
            //         // console.log($scope.users.length);
            //         // console.log($scope.users);
            //     }, function (err) {
            //         if (err) console.log(err.message);
            //     });
            // };
            
            function fullfilled(response) {
                // console.log('Status: ' + response.status);
                // console.log('Type: ' + response.headers('content-type'));
                // console.log('Length: ' + response.headers('content-length'));
                // console.log('Length: ' + response.data);
                $scope.items = response.data.users;
            }
            /**
             *  Конструктор хлебных крошек
             * @constructor
             */
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

            let breadcrumb = new BreadCrumb();

            breadcrumb.set('Home', 'home');
            // if ($scope.me.admin) if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('About', 'home.about' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            // $scope.refresh();
        }]);