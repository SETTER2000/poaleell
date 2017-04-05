angular.module('HomepageModule').controller('HomepageController', ['$scope', '$http', 'toastr',
    function ($scope, $http, toastr) {

        $scope.loginForm = {
            loading: false
        };

        $scope.submitLoginForm = function () {
            $scope.loginForm.loading = true;
            $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
            })
                .then(function onSuccess() {
                    window.location = '/';
                })
                .catch(function onError(sailsResponse) {

                    // Handle known error type(s).
                    // Deleted account
                    if (sailsResponse.status == 403) {
                        toastr.error(sailsResponse.data, 'Ошибка!', {
                            closeButton: true
                        });
                        return;
                    }

                    if(sailsResponse.status === 400 || 404){
                        toastr.error('Не правильный логин/пароль.', 'Ошибка авторизации!', {closeButton:true});
                        return;
                    }
                    toastr.error('Неожиданная ошибка, пожалуйста попробуйте еще раз..', 'Ошибка', {closeButton:true});
                    return;
                })
                .finally(function eitherWay() {
                    $scope.loginForm.loading = false;
                });
        };
    }]);