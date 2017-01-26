angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', 'Users', '$routeParams', 'CONF_MODULE',
        function ($scope, $http, Users, $routeParams, CONF_MODULE) {

            $scope.refresh = function () {
                $scope.item = Users.get({id: $routeParams.id}, function (users) {
                    $scope.users = users;
                    // кол-во пользователей
                    console.log($scope.users.length);
                    console.log($scope.users);
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };

            // сохранение изменений
            $scope.saveEdit = function (item) {
                console.log(item);
                if (angular.isDefined(item.id)) {
                    $scope.item.$delete({"id": $routeParams.id});
                    // item.$update({"_id": $routeParams.id}, function (success) {
                    //         console.log('SUCCESW: ' + success);
                    //     }
                    //     //     , function (err) {
                    //     //     console.log('ERROR: ' + err.status );
                    //     //     console.log(err);
                    //     // }
                    // );
                } else {
                    console.log('HUY');
                }
            };

            $scope.refresh();
        }]);
