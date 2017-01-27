angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', 'Users', '$routeParams', 'CONF_MODULE',
        function ($scope, $http, Users, $routeParams) {

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
                    //item.$update(item);
                    item.$update(item, function (success) {
                            console.log('SUCCESS: OK!');
                            item.ok();
                        },
                        function (err) {
                            console.log('ERROR: ' + err.status);
                            console.log(err);
                        }
                    );
                } else {
                    item.$save(item)
                }
            };

            $scope.noData= function (obj) {
                if(obj.password) return null;
            }

            $scope.refresh();
        }]);
