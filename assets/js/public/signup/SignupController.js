angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr',
    function ($scope, $http, toastr) {

        $scope.signupForm = {
            loading: false
        };

        $scope.submitSignupForm = function () {
            $scope.signupForm.loading = true;
            $http.post('/signup', {
                login: $scope.signupForm.login,
                email: $scope.signupForm.email,
                first_name: $scope.signupForm.first_name,
                last_name: $scope.signupForm.last_name,
                patronymic_name: $scope.signupForm.patronymic_name,
                password: $scope.signupForm.password
            })
                .then(function onSuccess(sailsResponse) {
                    window.location = '/';
                })
                .catch(function onError(sailsResponse) {
                    var emailAddressAlreadyInUse = sailsResponse.status == 409;
                    if (emailAddressAlreadyInUse) {
                        toastr.error('That email address has already been taken, please try again.', 'Error');
                        return;
                    }
                })
                .finally(function eitherWay() {
                    $scope.signupForm.loading = false;
                })
        };

        $scope.submitLoginForm = function () {
            // Set the loading state (i.e. show loading spinner)
            $scope.loginForm.loading = true;

            // Submit request to Sails.
            $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
            })
                .then(function onSuccess() {
                    // Refresh the page now that we've been logged in.
                    window.location = '/';
                })
                .catch(function onError(sailsResponse) {

                    // Handle known error type(s).
                    // Invalid username / password combination.
                    if (sailsResponse.status === 400 || 404) {
                        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                        toastr.error('Invalid email/password combination.', 'Error', {closeButton: true});
                        return;
                    }
                    toastr.error('An unexpected error occurred, please try again.', 'Error', {closeButton: true});
                    return;
                })
                .finally(function eitherWay() {
                    $scope.loginForm.loading = false;
                });
        };
    }]);