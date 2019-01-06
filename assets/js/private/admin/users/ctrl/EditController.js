'use strict';
angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Users', 'moment', 'Positions', 'Departments', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Users, moment, Positions, Departments, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            $scope.closeInfo = 0; // скрыть панель информации
            $scope.inlinePanel = 0; // растянуть панель редактирования
            $scope.edit = $state.includes('home.admin.users.edit');
            var info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newUserOk: 'Новый пользователь создан.',
                passDefault: '111111',
                redirectSelf: 'home.admin.users',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-1920",
                maxDate: "31-12-2002"
            };

            $scope.debug = true;
            if (!$scope.me.admin && !$scope.me.kadr) $state.go(info.redirectSelf);


            $scope.loginAdmin = false;



            $scope.dateOpts = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate,
                maxDate: info.maxDate
                //defaultDate: 'today'
            };

            $scope.dateOpts2 = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate
                //defaultDate: 'today'
            };

            $scope.dateOpts3 = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate
                //defaultDate: 'today'
            };
            $scope.dateOpts4 = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate
                //defaultDate: 'today'
            };

            $scope.toggleBlur = function (mx) {
                //if(!mx) mx.selectedDates = new Date();
                ////console.log('mx.selectedDates: ', mx.selectedDates);
                ////console.log('SelectedDates XX7:',moment.parseZone(mx.selectedDates[1]).format());
                //
                //$scope.query.sd = mx.selectedDates;
                //$scope.mx = mx.selectedDates;
                //$scope.refresh();
            };

            var uploader = $scope.uploader = new FileUploader({
                url: '/file/upload',
                autoUpload: true,
                removeAfterUpload: true,
                queueLimit: 1

            });

            uploader.filters.push({
                name: 'syncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < 10;
                }
            });


            uploader.filters.push({
                name: 'asyncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
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
                        toastr.error(info.requiredJpg, info.error);
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
                toastr.error(response.message, info.error + ' Статус ' + status);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                //console.log('uploader.onCancelItem');
                //console.log(status);
                //console.info('onCancelItem', fileItem, response, status, headers);
            };
            //$scope.$watch('item.avatarUrl', function (value) {
            //    $scope.item.avatarUrl = value;
            //
            //});
            //

            $scope.getLdap = function () {
                //console.log($scope.item.lastName);
                $http.post('/users/ldap', {
                    name: $scope.item.lastName
                })
                    .then(function onSuccess(sailsResponse) {
                        //console.log('sailsResponse: ',sailsResponse);
                        let objectContacts = {};
                        $scope.item.contacts = [];
                        objectContacts.type = "муж/жена";
                        objectContacts.value = sailsResponse.data[0].telephoneNumber;

                        let patronymic = sailsResponse.data[0].displayName.split(' ')[2];
                        //$scope.item.lastName = sailsResponse.data[0].sn;
                        $scope.item.firstName = sailsResponse.data[0].givenName;
                        $scope.item.login = sailsResponse.data[0].sAMAccountName;
                        $scope.item.room = sailsResponse.data[0].physicalDeliveryOfficeName;
                        $scope.item.email = sailsResponse.data[0].mail;
                        $scope.item.contacts.push(objectContacts);
                        $scope.item.patronymicName = patronymic;

                        //[{"type":"Мобильный","value":"8-985-729-37-74"},{"type":"Телефон","value":"+7 (495) 444-18-61"},{"type":"муж/жена","value":"(050) 4322"}]
                        //$scope.item.patronymicName = patronymic;
                        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                        // window.location = '#/profile/' + $scope.editProfile.properties.id;
                        //window.location = '/profile';
                        for (let op in sailsResponse.data) {
                            toastr.success(info.isSimilar + sailsResponse.data[op].displayName);
                        }

                        $scope.editProfile.loading = false;
                    }, function (err) {
                        console.log(info.error, err);
                    })
                    .catch(function onError(sailsResponse) {
                        $scope.editProfile.changePassword.errorMsg = $scope.unexpected + (sailsResponse.data || sailsResponse.status);
                        toastr.error($scope.editProfile.changePassword.errorMsg);
                    })
                    .finally(function eitherWay() {
                        $scope.editProfile.loading = false;
                    });
            };

            uploader.onCompleteItem = function (fileItem, response, status, headers) {
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


            $scope.inline = function () {
                $scope.inlinePanel = ($scope.inlinePanel) ? false : true;
                $scope.closeInfo =  (!$scope.closeInfo) ?  true : false;
            };
            //console.log( $stateParams.userId);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            $scope.refresh = function () {
                let item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                        $scope.users = users;
                        console.log('users', users);
                        item.getBirthday();
                        item.getDateInWork();
                        item.getFiredDate();
                        item.getDecree();
                    }
                    //    function (err) {
                    //
                    //    toastr.error(err, 'Ошибка! User.EditController.refresh ');
                    //}
                );

                //console.log($scope.item);
                //console.log($scope.users);
            };

            $scope.delete2 = function (item) {
                item.$delete(item, function (success) {
                    toastr.success(info.objectDelete, info.ok);
                    $state.go(info.redirectSelf);
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/users"); });
                    // $scope.refresh();
                }, function (err) {
                    //console.log(err);
                    toastr.error(err, info.error + ' 122! ');
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
                        //console.log('sailsResponse: ');
                        //console.log(sailsResponse);
                        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                        // window.location = '#/profile/' + $scope.editProfile.properties.id;
                        //window.location = '/profile';
                        toastr.success(info.passChange);
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
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            //console.log(err);
                            toastr.error(err.data.invalidAttributes, info.error + ' 87445!');
                        }
                    );
                }

            };

            var reversValue = function (item) {
                item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.decree = ( item.decree) ? new Date(moment(item.decree, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                return item;
            };

            $scope.saveEdit = function (item) {

                //item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                item = reversValue(item);
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.data, info.error + ' 11484!');
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
                        item.password = info.passDefault;
                        item.$save(item, function (success) {
                                //console.log(success);
                                //location.reload();
                                toastr.success(info.newUserOk);
                                // /admin/user/
                                //$location.path('/profile') ;
                                $state.go('home.admin.user', {userId: success.id});
                            },
                            function (err) {
                                toastr.error(err.data, info.error + ' 89336!');
                            });
                    }
                }
            };

            $scope.addContact = function () {
                if (angular.isArray($scope.item.contacts)) {
                    $scope.item.contacts.push({type: "телефон", value: ""});
                } else {
                    $scope.item.contacts = [{type: "телефон", value: ""}];
                }
            };

            //$scope.addFurlough = function () {
            //    if (angular.isArray($scope.item.fur)) {
            //        $scope.item.fur.push({type: "отпуск", from: "", to:""});
            //    } else {
            //        $scope.item.fur = [{type: "отпуск", from: "", to: ""}];
            //    }
            //};

            //$scope.removeFurlough = function (obj) {
            //    let furloughs = $scope.item.fur;
            //    for (let i = 0, ii = furloughs.length; i < ii; i++) {
            //        if (obj === furloughs[i]) {
            //            furloughs.splice(i, 1);
            //        }
            //    }
            //};
            $scope.removeContact = function (contact) {
                let contacts = $scope.item.contacts;
                for (let i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };

            $scope.addDepartment = function () {
                if (angular.isArray($scope.item.departments)) {
                    $scope.item.departments.push({});
                } else {
                    $scope.item.departments = [{}];
                }
            };

            // $scope.removeSubdivision = function (department) {
            //     for (let i = 0, ii = $scope.item.departments.length; i < ii; i++) {
            //         if ($scope.item.departments[i].id === department.id) {
            //             $scope.item.departments.splice(i, 1);
            //             return;
            //         }
            //     }
            // };

            $scope.removeDepartment = function (department) {
                $scope.item.departmentRemove = [];
                if (!department.id) $scope.item.departments = [];
                for (let i = 0, ii = $scope.item.departments.length; i < ii; i++) {
                    if ($scope.item.departments[i].id === department.id) {
                        $scope.item.departments.splice(i, 1);
                        $scope.item.departmentRemove.push(department.id);
                        return;
                    }
                }
            };


            $scope.removeBirthday = function (item) {
                item.birthday = null;
                item = reversValue(item);
                //item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            //console.log('ERR: ', err);
                            toastr.error(err.data.invalidAttributes, info.error + ' 44006!');
                        });
                }
            };

            $scope.removeDateInWork = function (item) {
                item.dateInWork = null;
                item = reversValue(item);
                //item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.data.invalidAttributes, info.error + ' 44016!');
                        });
                }
            };
            $scope.removeDecree = function (item) {
                item.decree = null;
                item = reversValue(item);
                //item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.data.invalidAttributes, info.error + ' 44016!');
                        });
                }
            };
            $scope.removeFired = function (item) {
                item.firedDate = null;
                item = reversValue(item);
                //item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.dateInWork = (item.dateInWork) ? new Date(moment(item.dateInWork, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                //item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                            //$scope.item.firedDate = success.getFiredDate;
                        },
                        function (err) {
                            console.log(info.error, err);
                            toastr.error(err.data.invalidAttributes, info.error + ' 90!');
                        });
                }
            };


            $scope.addPosition = function () {
                if (angular.isArray($scope.item.positions)) {
                    $scope.item.positions.push({});
                } else {
                    $scope.item.positions = [{}];
                }
            };
            $scope.addFurlough = function () {
                if (angular.isArray($scope.item.furloughs)) {
                    $scope.item.furloughs.push({});
                } else {
                    $scope.item.furloughs = [{}];
                }
            };

            $scope.removePosition = function (obj) {
                $scope.item.positionRemove = [];
                if (!obj.id) $scope.item.positions = [];
                for (let i = 0, ii = $scope.item.positions.length; i < ii; i++) {
                    if ($scope.item.positions[i].id === obj.id) {
                        $scope.item.positions.splice(i, 1);
                        $scope.item.positionRemove.push(obj.id);
                        return;
                    }
                }
            };
            $scope.removeFurlough = function (furlough) {
                $scope.item.furloughRemove = [];
                if (!furlough.id) $scope.item.furloughs = [];
                for (let i = 0, ii = $scope.item.furloughs.length; i < ii; i++) {
                    if ($scope.item.furloughs[i].id === furlough.id) {
                        $scope.item.furloughs.splice(i, 1);
                        $scope.item.furloughRemove.push(furlough.id);
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

            /**
             *  Конструктор хлебных крошек
             * @constructor
             */
            function BreadCrumb() {
                var name;
                var path;
                this.arr = [];
            }

            BreadCrumb.prototype.add = function () {
                this.arr.push({name: this.name, path: this.path});
            };

            BreadCrumb.prototype.set = function (name, path) {
                this.name = name;
                this.path = path;
                this.add();
            };

            BreadCrumb.prototype.getAll = function () {
                return this.arr;
            };

            var breadcrumb = new BreadCrumb();

            breadcrumb.set('Home', 'home');
            if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Users', 'home.admin.users');
            breadcrumb.set('Edit', 'home.admin.users.edit' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
