/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 24.12.2016
 * Time: 2:28
 */
angular.module('DashboardModule')
//.constant('baseUrl', 'http://localhost:1337')
.controller('DashboardController', ['$scope', '$http', 'toastr','$resource', function ($scope, $http, toastr, $resource) {

    //$scope.itemsResource = $resource(baseUrl);

    $scope.data = window.SAILS_LOCALS.me;

    $scope.sendRequest = function () {

        //console.log($http.get('/user'));
        var promise = $http.post('/user');
        //console.log(promise);
        promise.then(fullfilled, rejected);
        return false
    };


    function fullfilled(response) {
        console.log('Status: '+response.status);
        console.log('Type: '+response.headers('content-type'));
        console.log('Length: '+response.headers('content-length'));
        console.log('Length: '+response.data);
        $scope.items = response.data.users;
    }

    function rejected(error){
        console.log(error);
    }


}]);