angular.module('SignupModule').controller('passwordRecoveryPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
  $scope.passwordRecoveryForm = {
    loading: false,
    errorMsg: ''
  };
  $scope.recoverPassword = function() {

    $scope.passwordRecoveryForm.loading = true;

    $http.put('/user/generate-recovery-email', {
          email: $scope.passwordRecoveryForm.email
        })
        .then(function onSuccess(sailsResponse){

          window.location = '/password-recovery-email-sent';
        })
        .catch(function onError(sailsResponse) {

          if (sailsResponse.status === 404) {

            toastr.error('There isn\'t an account with that email address.', 'Error', {
              closeButton: true
            });
            return;
          }

          console.error(sailsResponse);

        })
        .finally(function eitherWay() {
          $scope.passwordRecoveryForm.loading = false;
        });

  };

}]);