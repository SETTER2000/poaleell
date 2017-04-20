angular.module('Holiday').controller('navPageController',
    ['$location', '$scope', '$http', 'toastr', function ($location, $scope, $http, toastr) {

        $scope.signOut = function () {
            $http.post('/logout')
                .then(function onSuccess(sailsReponse) {

                    window.location = '/';

                })
                .catch(function onError(sailsResponse) {
                    console.error(sailsResponse);
                })
                .finally(function eitherWay() {

                });
        };

        $scope.loginForm = {};

        $scope.me = window.SAILS_LOCALS.me;
        for(var index in $scope.me.contacts){
            if($scope.me.contacts[index].type === 'Внутренний телефон')   $scope.me.phoneInner=$scope.me.contacts[index].value;
        }




        $scope.submitLoginForm = function () {

            // Set the loading state (i.e. show loading spinner)
            $scope.loginForm.loading = true;

            // Submit request to Sails.
            $http.put('/login', {
                email: $scope.loginForm.login,
                username: $scope.loginForm.login,
                password: $scope.loginForm.password
            })
                .then(function onSuccess() {
                    // Redierct the page now that we've been logged in.
                    // window.location = '/videos';
                    // window.location = '/';
                    toastr.success('We have a match!', 'Success', {closeButton: true});
                })
                .catch(function onError(sailsResponse) {

                    // Handle known error type(s).        
                    // Deleted account
                    if (sailsResponse.status == 403) {
                        toastr.error(sailsResponse.data, 'Error', {
                            closeButton: true
                        });
                        return;
                    }


                    // Invalid username / password combination.
                    if (sailsResponse.status === 400 || 404) {
                        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                        //
                        toastr.error('Invalid email or username/password combination.', 'Error', {
                            closeButton: true
                        });
                        return;
                    }

                    toastr.error('An unexpected error occurred, please try again.', 'Error', {
                        closeButton: true
                    });
                    return;

                })
                .finally(function eitherWay() {
                    $scope.loginForm.loading = false;
                });
        };
    }]);
