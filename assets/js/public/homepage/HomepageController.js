angular.module('HomepageModule').controller('HomepageController', ['$scope', '$mdDialog','$http', 'toastr',
    function ($scope,$mdDialog, $http, toastr) {
        $scope.status = '  ';
        $scope.customFullscreen = false;
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
                templateUrl: '/js/public/homepage/tpl/dialog1.tmpl.html',
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

        $scope.showTabDialog = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/js/public/homepage/tpl/tabDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog';
                });
        };

        $scope.showPrerenderedDialog = function(ev) {
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
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


       
      













        $scope.loginForm = {
            loading: false
        };
        $scope.getFormAuthorize = function () {
            $scope.shows = ($scope.shows) ? false : true;
        };
        $scope.submitLoginForm = function () {
            $scope.loginForm.loading = true;
            console.log('$scope.loginForm', $scope.loginForm);
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
                        toastr.error(sailsResponse.data, 'Ошибка 114!', {
                            closeButton: true
                        });
                        return;
                    }

                    if (sailsResponse.status === 400 || 404) {
                        toastr.error('Не правильный логин/пароль.', 'Ошибка авторизации!', {closeButton: true});
                        return;
                    }
                    toastr.error('Неожиданная ошибка, пожалуйста попробуйте еще раз..', 'Ошибка', {closeButton: true});
                    return;
                })
                .finally(function eitherWay() {
                    $scope.loginForm.loading = false;
                });
        };
    }]);