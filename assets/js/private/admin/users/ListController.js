angular.module('UserModule')
    .controller('ListController', ['$scope', 'Users', function ($scope, Users) {
        $scope.refresh = function () {
            /**
             * При обращении к службе $resource возвращается сгенерированный конструктор,
             * дополненный методами для взаимодействия с конечной точкой
             * RESTful: query, get, save и delete.
             */
            $scope.items = Users.query(function (users) {
                $scope.users = users;
                // кол-во пользователей
                console.log($scope.users.length);
                console.log($scope.users);
            });
        };


        $scope.refresh();
    }]);
