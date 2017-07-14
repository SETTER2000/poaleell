'use strict';
angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Users', 'Positions', 'Departments', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Users, Positions, Departments, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.admin && !$scope.me.kadr) $state.go('home.admin.users');

            $scope.close = 1;
            $scope.loginAdmin = false;

            $scope.edit = $state.includes('home.admin.users.edit');

            //console.log('window.SAILS_LOCALS.me.email');
            //console.log(SAILS_LOCALS.me.email);
            //var emAdmin = SAILS_LOCALS.me.email;

            var uploader = $scope.uploader = new FileUploader({
                url: '/file/upload',
                autoUpload: true,
                removeAfterUpload: true,
                queueLimit: 1

            });

            uploader.filters.push({
                name: 'syncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    //console.log('syncFilter');
                    return this.queue.length < 10;
                }
            });


            uploader.filters.push({
                name: 'asyncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                    //console.log('asyncFilter');
                    setTimeout(deferred.resolve, 1e3);
                }
            });


            /**
             * Фильтр проверяет рассширение
             * Доступны для загрузки только xlsx файлы
             */
            uploader.filters.push({
                name: 'expFilter',
                fn: function (item) {
                    if (item.name.slice(-3) !== 'jpg') {
                        toastr.error('Расширение файла должно быть jpg.', 'Ошибка!');
                        return false;
                    }
                    $scope.uploaderButtonPrice = true;
                    return true;
                }
            });

            // CALLBACKS

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);

            };
            uploader.onBeforeUploadItem = function (item) {
                console.info('onBeforeUploadItem', item);
                item.formData.push({id: $stateParams.userId});

            };


            uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);

            };
            uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);

            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem);
                console.info('onSuccessItem2', response);
                console.info('onSuccessItem3', status);
                console.info('onSuccessItem4', headers);


            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                $scope.pathToReport = response.avatarFd;
                $scope.goReport = response.goReport;
                $scope.statusErr = 'Отклонено';
                toastr.error(response.message, 'Ошибка! Статус ' + status);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.log('uploader.onCancelItem');
                console.log(status);
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            $scope.$watch('item.avatarUrl', function (value) {
                $scope.item.avatarUrl = value;

            });
            //
            //$scope.$watch('item.lastName', function (value) {
            //    console.log(value);
            //    $scope.getLdap();
            //});
            $scope.getLdap = function () {
                console.log($scope.item.lastName);
                $http.post('/users/ldap', {
                        name: $scope.item.lastName
                    })
                    .then(function onSuccess(sailsResponse) {
                        console.log('sailsResponse: ');
                        console.log(sailsResponse);
                        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                        // window.location = '#/profile/' + $scope.editProfile.properties.id;
                        //window.location = '/profile';
                        toastr.success('Пароль обновлён!');
                        $scope.editProfile.loading = false;
                    }, (err)=>{
                        console.log('ERRROR!: ', err);
                    })
                    .catch(function onError(sailsResponse) {
                        // console.log('sailsresponse: ', sailsResponse)
                        // Otherwise, display generic error if the error is unrecognized.
                        $scope.editProfile.changePassword.errorMsg = $scope.unexpected + (sailsResponse.data || sailsResponse.status);
                        toastr.error($scope.editProfile.changePassword.errorMsg);
                    })
                    .finally(function eitherWay() {
                        $scope.editProfile.loading = false;
                    });


            };

            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                //console.info('onCompleteItem', fileItem, response, status, headers);
                console.info('onCompleteItem', fileItem);
                console.info('status', status);


                if (status == 200) {
                    fileItem.pathToReport = '/images/foto/' + response.avatarFd;
                    fileItem.goReport = response.goReport;
                    fileItem.dateUpload = response.dateUpload;
                    toastr.success(response.message, 'Ok! ');
                    fileItem.progress = response.progress;
                    fileItem.errorPercent = '0';
                    fileItem.statusOk = response.message;
                    $interval(function () {
                        $scope.refresh();
                        //location.reload()
                    }, 2000, 1);

                    // fileItem.allEr = response.allEr;
                }
                switch (response.status) {
                    case 202:
                        //toastr.success(response.message, ' Статус ' + response.status);
                        fileItem.progress = response.progress;
                        fileItem.errorPercent = '(' + response.errorPercent + '%)';
                        //fileItem.pathToReport = '/images/foto/report/' + response.avatarFd;
                        fileItem.goReport = response.goReport;
                        fileItem.statusOk = response.message;
                        fileItem.allEr = response.allEr;

                        break;
                }
            };
            uploader.onCompleteAll = function (fileItem, response, status, headers) {
                //$scope.getDatePrice();
                $scope.uploaderButtonPrice = false;
            };


            $scope.options =
                [
                    {display: "Загрузить файл", value: "uploader"}
                ];
            $scope.modeSelect = $scope.options[0];
            $scope.uploaderView = "/js/private/admin/users/views/uploader.html";


            $scope.closed = function () {
                if ($scope.close) {
                    $scope.close = false;
                }
                else {
                    $scope.close = true;
                }
            };
            //console.log( $stateParams.userId);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            $scope.refresh = function () {
                let item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                        $scope.users = users;
                        console.log(users);
                        item.getBirthday();
                        item.getDateInWork();
                        item.getFiredDate();
                    }
                    //    function (err) {
                    //
                    //    toastr.error(err, 'Ошибка! User.EditController.refresh ');
                    //}
                );

                console.log($scope.item);
                console.log($scope.users);
            };

            $scope.delete2 = function (item) {
                item.$delete(item, function (success) {
                    toastr.success('Объект удалён.', 'OK! ');
                    $state.go('home.admin.users');
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/users"); });
                    // $scope.refresh();
                }, function (err) {
                    console.log(err);
                    toastr.error(err, 'Ошибка122! ');
                })
            };

            $scope.editProfile = {
                properties: {},
                errorMsg: '',
                error: false,
                saving: false,
                loading: false,
                changePassword: {}
            };

            $scope.changeMyPassword = function () {
                $http.put('/users/changePassword', {
                        id: $scope.item.id,
                        password: $scope.editProfile.properties.password
                    })
                    .then(function onSuccess(sailsResponse) {
                        console.log('sailsResponse: ');
                        console.log(sailsResponse);
                        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                        // window.location = '#/profile/' + $scope.editProfile.properties.id;
                        //window.location = '/profile';
                        toastr.success('Пароль обновлён!');
                        $scope.editProfile.loading = false;
                    })
                    .catch(function onError(sailsResponse) {
                        // console.log('sailsresponse: ', sailsResponse)
                        // Otherwise, display generic error if the error is unrecognized.
                        $scope.editProfile.changePassword.errorMsg = $scope.unexpected + (sailsResponse.data || sailsResponse.status);
                        toastr.error($scope.editProfile.changePassword.errorMsg);
                    })
                    .finally(function eitherWay() {
                        $scope.editProfile.loading = false;
                    });
            };

            $scope.delFoto = function (item) {
                item.avatarUrl = '';
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            //toastr.success(success);
                            //toastr.options.closeButton = true;
                            toastr.success('Изменения сохранены!');
                            $scope.refresh();
                        },
                        function (err) {
                            console.log(err);
                            toastr.error(err.data, 'Ошибка! EditController User');
                        }
                    );
                }

            };


            $scope.saveEdit = function (item) {
                //$scope.item.subdivision = [];

                //console.log('ITEM###: ', item);
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            //toastr.success(success);
                            //toastr.options.closeButton = true;
                            toastr.success('Изменения сохранены!');
                            $scope.refresh();
                        },
                        function (err) {
                            console.log(err);
                            toastr.error(err.data, 'Ошибка! EditController User');
                        }
                    );
                } else {
                    if (angular.isDefined(item)
                    //&& angular.isDefined(item.firstName) &&
                    //angular.isDefined(item.lastName) &&
                    //angular.isDefined(item.patronymicName)
                    /*  &&
                     angular.isDefined(item.login) &&
                     angular.isDefined(item.fired) &&
                     angular.isDefined(item.birthday) &&
                     angular.isDefined(item.email)*/
                    ) {

                        item.password = '111111';

                        item.$save(item, function (success) {
                                //console.log(success);
                                //location.reload();
                                toastr.success('Новый пользователь создан.');
                                // /admin/user/
                                //$location.path('/profile') ;
                                $state.go('home.admin.user', {userId: success.id});
                            },
                            function (err) {
                                toastr.error(err.data, 'Ошибка! EditController');
                            });
                    }
                }
            };


            //$scope.state = /^\w\w$/;
            //$scope.zip = /^\d\d\d\d\d$/;

            $scope.addContact = function () {
                if (angular.isArray($scope.item.contacts)) {
                    $scope.item.contacts.push({type: "телефон", value: ""});
                } else {
                    $scope.item.contacts = [{type: "телефон", value: ""}];
                }
            };

            $scope.removeContact = function (contact) {
                let contacts = $scope.item.contacts;
                for (let i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };

            $scope.addSubdivision = function () {
                if (angular.isArray($scope.item.subdivision)) {
                    $scope.item.subdivision.push({});
                } else {
                    $scope.item.subdivision = [{}];
                }
            };

            $scope.removeSubdivision = function (department) {
                for (let i = 0, ii = $scope.item.subdivision.length; i < ii; i++) {
                    if ($scope.item.subdivision[i].id === department.id) {
                        $scope.item.subdivision.splice(i, 1);
                        return;
                    }
                }
            };

            $scope.addPosition = function () {
                if (angular.isArray($scope.item.positions)) {
                    $scope.item.positions.push({});
                } else {
                    $scope.item.positions = [{}];
                }
            };

            $scope.removePosition = function (position) {
                $scope.item.positionRemove = [];
                if (!position.id) $scope.item.positions = [];
                for (let i = 0, ii = $scope.item.positions.length; i < ii; i++) {
                    if ($scope.item.positions[i].id === position.id) {
                        $scope.item.positions.splice(i, 1);
                        $scope.item.positionRemove.push(position.id);
                        return;
                    }
                }
            };

            $scope.isCancelDisabled = function () {
                return angular.equals(master, $scope.form);
            };

            $scope.isSaveDisabled = function () {
                return $scope.myForm.$invalid || angular.equals(item, $scope.form);
            };

            let original = angular.copy($scope.item);

            $scope.revert = function () {
                $scope.item = angular.copy(original);
                $scope.passwordRepeat = $scope.item.password;
                $scope.userInfoForm.$setPristine();
            };

            $scope.canRevert = function () {
                return !angular.equals($scope.item, original);
            };

            $scope.refresh();
        }]);
