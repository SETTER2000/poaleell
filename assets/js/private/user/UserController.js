angular.module('UserModule')
    .controller('UserController', ['$scope','toastr','Users', function ($scope,   toastr, Users) {
        $scope.items = Users.query(function(users){
            $scope.users = users;
            // кол-во пользователей
            console.log($scope.users.length);
        });

       
    }]);
