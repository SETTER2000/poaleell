angular.module('UserModule')
    //.constant('baseUrl', 'http://localhost:1337/user/')
    .controller('UserController', ['$scope', '$http', '$resource', 'toastr', function ($scope, $http, $resource, toastr) {


        $scope.itemsResource = $resource('http://localhost:1337/user/' + ":id", {id: "@id"});

        $scope.items = $scope.itemsResource.query();

        console.log( $scope.items);
        //$scope.refresh = function () {
        //    $scope.items = $scope.itemsResource.query();
        //};

        //console.log($http.get('/user'));
        //var promise = $http.get('/user');
        //console.log(promise);
        //promise.then(fullfilled, rejected);
        //
        //function fullfilled(response) {
        //    console.log('Status: ' + response.status);
        //    console.log('Type: ' + response.headers('content-type'));
        //    console.log('Length: ' + response.headers('content-length'));
        //    console.log('Length: ' + response.data);
        //    $scope.items = response.data.users;
        //}
        //
        //function rejected(error) {
        //    console.log(error);
        //}
    }]);
