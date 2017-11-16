angular.module('SignupModule').controller('SignupController', ['$scope', '$mdDialog','$http', 'toastr', function ($scope,$mdDialog, $http, toastr) {

    $scope.signupForm = {
        loading: false
    };



    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };
    $scope.isOpen = false;

    $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };
    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(function() {
            $scope.status = 'You decided to get rid of your debt.';
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('What would you name your dog?')
            .textContent('Bowser is a common name.')
            .placeholder('Dog name')
            .ariaLabel('Dog name')
            .initialValue('Buddy')
            .targetEvent(ev)
            .ok('Okay!')
            .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(function(result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    };

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/js/public/signup/tpl/uslovia.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.loginForm = answer;
                $scope.submitLoginForm();
                $scope.status = '';
                console.log($scope.status);
            }, function() {
                $scope.status = '';
                console.log($scope.status);
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    $scope.submitSignupForm = function () {
        $scope.signupForm.loading = true;
        $http.post('/user/signup', {
            login: $scope.signupForm.login,
            email: $scope.signupForm.email,
            firstName: $scope.signupForm.firstName,
            lastName: $scope.signupForm.lastName,
            patronymicName: $scope.signupForm.patronymicName,
            birthday: $scope.signupForm.birthday,
            password: $scope.signupForm.password
        }).then(function onSuccess(sailsResponse) {
            window.location = '/';
            // window.location = '/admin/users';
            // console.log('sailsResponse:');
            // console.log(sailsResponse);
        }).catch(function onError(sailsResponse) {
            console.log('sailsResponse',sailsResponse);
            // console.log(sailsResponse);
            let emailAddressAlreadyInUse = sailsResponse.status == 409;
            if (emailAddressAlreadyInUse) {
                toastr.error('Этот email уже зарегистрирован, пожалуйста введите другой email.', 'Ошибка');
                return;
            }

            let loginAlreadyInUse = sailsResponse.status == 410;
            if (loginAlreadyInUse) {
                toastr.error('Этот логин уже зарегистрирован, пожалуйста введите другой логин.', 'Ошибка');
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
            email: $scope.loginForm.email,
            password: $scope.loginForm.password
        }).then(function onSuccess(sailsResponse) {
            window.location = '/';
        }).catch(function onError(sailsResponse) {

            // Handle known error type(s).
            // Deleted account
            if (sailsResponse.status == 403) {
                toastr.error(sailsResponse.data, 'Ошибка799!', {
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
        }).finally(function eitherWay() {
            $scope.loginForm.loading = false;
        });
    };
}]);