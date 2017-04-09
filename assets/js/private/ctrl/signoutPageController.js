angular.module('Holiday').controller('signOutPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
  
  $scope.signOut = function() {
    $http.post('/logout')
    .then(function onSuccess(sailsReponse){

      window.location = '/';

    })
    .catch (function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){

    });
  };
}]);