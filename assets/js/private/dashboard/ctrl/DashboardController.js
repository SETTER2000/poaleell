angular.module('DashboardModule')
//.constant('baseUrl', 'http://localhost:1337')
    .controller('DashboardController', ['$scope', '$window', '$stateParams', 'Users', 'toastr', '$resource',
        function ($scope, $window, $stateParams, Users, toastr, $resource) {

            //$scope.itemsResource = $resource(baseUrl);
            console.log('ERRRR::');
            console.log($window);

            $scope.sendRequest = function () {

                //console.log($http.get('/user'));
                var promise = $http.post('/user');
                //console.log(promise);
                promise.then(fullfilled, rejected);
                return false
            };

            $scope.refresh = function () {
                $scope.item = Users.get({id: $routeParams.id}, function (users) {
                    $scope.users = users;
                    // кол-во пользователей
                    // console.log($scope.users.length);
                    // console.log($scope.users);
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };

            function fullfilled(response) {
                console.log('Status: ' + response.status);
                console.log('Type: ' + response.headers('content-type'));
                console.log('Length: ' + response.headers('content-length'));
                console.log('Length: ' + response.data);
                $scope.items = response.data.users;
            }

            $scope.refresh();
        }]);