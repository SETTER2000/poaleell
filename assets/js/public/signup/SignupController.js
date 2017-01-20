angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {

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
            birthday: $scope.signupForm.birthday,
            password: $scope.signupForm.password
        }).then(function onSuccess(sailsResponse) {
            window.location = '/';
            console.log(sailsResponse);
        }).catch(function onError(sailsResponse) {
            var emailAddressAlreadyInUse = sailsResponse.status == 409;
            if (emailAddressAlreadyInUse) {
                toastr.error('Этот email уже зарегистрирован, пожалуйста введите другой email.', 'Ошибка');
                return;
            }
        }).finally(function eitherWay() {
            $scope.signupForm.location = false;
        })
    };
    $scope.loginForm = {
        loading: false
    };
    $scope.submitLoginForm = function () {
        $scope.loginForm.loading = true;
        $http.put('/login', {
            email: $scope.loginForm.email, password: $scope.loginForm.password
        }).then(function onSuccess(sailsResponse) {
            window.location = '/';
        }).catch(function onError(sailsResponse) {
            if (sailsResponse.status === 400 || 404) {
                toastr.error('Не правильный логин/пароль.', 'Ошибка авторизации!', {closeButton: true});
                return;
            }
            toastr.error('Неожиданная ошибка, пожалуйста попробуйте еще раз.', 'Ошибка!', {closeButton: true});
            return;
        }).finally(function eitherWay() {
            $scope.loginForm.loading = false;
        });
    };
}]);