angular.module('UserModule').controller('DeleteController', ['$scope', '$http', '$state', 'Users', '$routeParams', 'CONF_MODULE',
    function ($scope, $http, $state, Users, $stateParams) {
        $scope.me = window.SAILS_LOCALS.me;
        if (!$scope.me.admin) $state.go('home');

        $scope.refresh = function () {
            $scope.item = Users.delete({id: $stateParams.id}, function (users) {
                $scope.users = users;
                // кол-во пользователей
                console.log($scope.users.length);
                console.log($scope.users);
            }, function (err) {
                if (err) console.log(err.message);
            });
        };
        $scope.refresh();
    }]);