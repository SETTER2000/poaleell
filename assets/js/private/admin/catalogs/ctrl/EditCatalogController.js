'use strict';
angular.module('CatalogModule')
    .controller('EditCatalogController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Catalogs', 'moment', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Catalogs, moment, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            moment.locale('ru');
            var info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newOk: 'Объект создан.',
                passDefault: '111111',
                redirectSelf: 'home.admin.catalogs',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-2002",
                maxDate: "31-12-2020",

            };
            $scope.newObjectName = 'Новая собака';
            $scope.close = 1;
            $scope.loginAdmin = false;
            $scope.edit = $state.includes('home.admin.catalogs.edit');
            $scope.dateOpts = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate,
                maxDate: 'today'
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

            /**
             * Загрузка титулов
             * @type {FileUploader|*}
             */
            var uploadTitles = $scope.uploadTitles = new FileUploader({
                url: '/file/uploadTitles',
                autoUpload: true,
                removeAfterUpload: true,
                queueLimit: 1,
                withCredentials: true
            });
            uploadTitles.filters.push({
                name: 'syncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < 10;
                }
            });
            uploadTitles.filters.push({
                name: 'asyncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                    setTimeout(deferred.resolve, 1e3);
                }
            });
            /**
             * Фильтр проверяет расширение
             * Доступны для загрузки только jpg файлы
             */
            uploadTitles.filters.push({
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
            uploadTitles.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                //console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploadTitles.onAfterAddingFile = function (fileItem) {
                //console.info('onAfterAddingFile', fileItem);
            };
            uploadTitles.onAfterAddingAll = function (addedFileItems) {
                //console.info('onAfterAddingAll', addedFileItems);

            };

            $scope.getTitle = function (obj) {
                $scope.idTitle = obj.id;
            };

            uploadTitles.onBeforeUploadItem = function (item) {
                //console.info('onBeforeUploadItem', item);
                item.formData.push({id: $stateParams.catalogId});
                item.formData.push({idTitle: $scope.idTitle});
            };
            // uploadTitles.onBeforeUploadItem = function (item) {
            //     //console.info('onBeforeUploadItem', item);
            //     item.formData.push({id: $stateParams.catalogId});
            //     item.formData.push({idT: $stateParams.catalogId});
            //
            // };
            uploadTitles.onProgressItem = function (fileItem, progress) {
                //console.info('onProgressItem', fileItem, progress);

            };
            uploadTitles.onProgressAll = function (progress) {
                //console.info('onProgressAll', progress);

            };
            uploadTitles.onSuccessItem = function (fileItem, response, status, headers) {
                //console.info('onSuccessItem', fileItem);
                //console.info('onSuccessItem2', response);
                //console.info('onSuccessItem3', status);
                //console.info('onSuccessItem4', headers);


            };
            uploadTitles.onErrorItem = function (fileItem, response, status, headers) {
                $scope.pathToReport = response.avatarFd;
                $scope.goReport = response.goReport;
                $scope.statusErr = 'Отклонено';
                toastr.error(response.message, info.error + ' Статус ' + status);
            };
            uploadTitles.onCancelItem = function (fileItem, response, status, headers) {
                //console.log('uploader.onCancelItem');
                //console.log(status);
                ////console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploadTitles.onCompleteItem = function (fileItem, response, status, headers) {
                ////console.info('onCompleteItem', fileItem, response, status, headers);


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
            uploadTitles.onCompleteAll = function (fileItem, response, status, headers) {
                //$scope.getDatePrice();
                $scope.uploaderButtonPrice = false;
            };


            /**
             * Загрузка тестов
             * @type {FileUploader|*}
             */
            var uploadReactions = $scope.uploadReactions = new FileUploader({
                url: '/file/uploadReactions',
                autoUpload: true,
                removeAfterUpload: true,
                queueLimit: 1,
                withCredentials: true
            });
            uploadReactions.filters.push({
                name: 'syncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < 10;
                }
            });
            uploadReactions.filters.push({
                name: 'asyncFilter',
                fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                    setTimeout(deferred.resolve, 1e3);
                }
            });
            /**
             * Фильтр проверяет расширение
             * Доступны для загрузки только jpg файлы
             */
            uploadReactions.filters.push({
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
            uploadReactions.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                //console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploadReactions.onAfterAddingFile = function (fileItem) {
                //console.info('onAfterAddingFile', fileItem);
            };
            uploadReactions.onAfterAddingAll = function (addedFileItems) {
                //console.info('onAfterAddingAll', addedFileItems);

            };


            $scope.getReaction = function (obj) {
                $scope.idReaction = obj.id;
            };
            uploadReactions.onBeforeUploadItem = function (item) {
                //console.info('onBeforeUploadItem', item);
                item.formData.push({id: $stateParams.catalogId});
                item.formData.push({idReaction: $scope.idReaction});
            };
            // uploadTitles.onBeforeUploadItem = function (item) {
            //     //console.info('onBeforeUploadItem', item);
            //     item.formData.push({id: $stateParams.catalogId});
            //     item.formData.push({idT: $stateParams.catalogId});
            //
            // };
            uploadReactions.onProgressItem = function (fileItem, progress) {
                //console.info('onProgressItem', fileItem, progress);

            };
            uploadReactions.onProgressAll = function (progress) {
                //console.info('onProgressAll', progress);

            };
            uploadReactions.onSuccessItem = function (fileItem, response, status, headers) {
                //console.info('onSuccessItem', fileItem);
                //console.info('onSuccessItem2', response);
                //console.info('onSuccessItem3', status);
                //console.info('onSuccessItem4', headers);


            };
            uploadReactions.onErrorItem = function (fileItem, response, status, headers) {
                $scope.pathToReport = response.avatarFd;
                $scope.goReport = response.goReport;
                $scope.statusErr = 'Отклонено';
                toastr.error(response.message, info.error + ' Статус ' + status);
            };
            uploadReactions.onCancelItem = function (fileItem, response, status, headers) {
                //console.log('uploader.onCancelItem');
                //console.log(status);
                ////console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploadReactions.onCompleteItem = function (fileItem, response, status, headers) {
                ////console.info('onCompleteItem', fileItem, response, status, headers);


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
            uploadReactions.onCompleteAll = function (fileItem, response, status, headers) {
                //$scope.getDatePrice();
                $scope.uploaderButtonPrice = false;
            };


            /**
             * Загрузка Аватара
             * @type {FileUploader|*}
             */
            var uploader = $scope.uploader = new FileUploader({
                url: '/file/uploadDogs',
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
             * Фильтр проверяет расширение
             * Доступны для загрузки только jpg файлы
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
                //console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                //console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                //console.info('onAfterAddingAll', addedFileItems);

            };
            uploader.onBeforeUploadItem = function (item) {
                //console.info('onBeforeUploadItem', item);
                item.formData.push({id: $stateParams.catalogId});

            };
            uploader.onProgressItem = function (fileItem, progress) {
                //console.info('onProgressItem', fileItem, progress);

            };
            uploader.onProgressAll = function (progress) {
                //console.info('onProgressAll', progress);

            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                //console.info('onSuccessItem', fileItem);
                //console.info('onSuccessItem2', response);
                //console.info('onSuccessItem3', status);
                //console.info('onSuccessItem4', headers);


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
                ////console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                ////console.info('onCompleteItem', fileItem, response, status, headers);


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
            $scope.uploaderView = "/js/private/admin/catalogs/views/uploader.html";
            $scope.closed = function () {
                if ($scope.close) {
                    $scope.close = false;
                }
                else {
                    $scope.close = true;
                }
            };
            //console.log( $stateParams.catalogId);
            //var item = $scope.item = Catalogs.get({id: $stateParams.catalogId}, function (catalogs) {
            $scope.refresh = function () {
                let item = $scope.item = Catalogs.get({id: $stateParams.catalogId}, function (catalogs) {
                        $scope.catalogs = catalogs;
                        console.log('catalogs', catalogs);
                        item.getBirthday();
                        item.getDeath();
                        item.getFiredDate();
                        item.getDecree();
                    }
                    //    function (err) {
                    //
                    //    toastr.error(err, 'Ошибка! User.EditController.refresh ');
                    //}
                );

                //console.log($scope.item);
                //console.log($scope.catalogs);
            };
            $scope.delete2 = function (item) {
                item.$delete(item, function (success) {
                    toastr.success(info.objectDelete, info.ok);
                    $state.go(info.redirectSelf);
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/catalogs"); });
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
                item.death = (item.death) ? new Date(moment(item.death, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.decree = ( item.decree) ? new Date(moment(item.decree, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                return item;
            };
            $scope.lengthWeightMin = 2200;


            /**
             * Сохранить изменения
             * @param item
             */
            $scope.saveEdit = function (item) {
                let lengthNicknameMin = 1;
                console.log('item-555:', item);
                // if (item.name.length < lengthNicknameMin) return toastr.error('Имя меньше ' + lengthNicknameMin + ' символов', 'Ошибка!');
                if (!item.kennels) return toastr.error('Питомник не заполнен.', 'Ошибка!');
                if (!item.sires) return toastr.error('Отец не установлен.', 'Ошибка!');
                console.log('item.sires', item.sires);
                // if (item.nickname.length < lengthNicknameMin) return toastr.error('Кличка меньше ' + lengthNicknameMin + ' символов', 'Ошибка!');
                // if (item.weight < $scope.lengthWeightMin) return toastr.error('Вес меньше ' + $scope.lengthWeightMin + ' символов', 'Ошибка!');

                item = reversValue(item);
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err, info.error + ' 1001!');
                            $scope.refresh();
                        }
                    );
                } else {
                    if (angular.isDefined(item) &&
                        angular.isDefined(item.name)
                    ) {
                        // (item.variety.length < 5 && item.variety.length > 5) ? toastr.error('Не корректная длинна типа собаки.', 'Ошибка!') : '';
                        item.password = info.passDefault;
                        item.$save(item, function (success) {
                                //console.log(success);
                                //location.reload();
                                toastr.success(info.newOk);
                                // /admin/catalog/
                                //$location.path('/profile') ;
                                $state.go('home.admin.catalog', {catalogId: success.id});
                            },
                            function (err) {
                                toastr.error(err.data, 'Ошибка!');
                            });
                    } else {
                        toastr.error('Не все поля заполнены.', 'Ошибка!');
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

            $scope.removeBirthday = function (item) {
                item.birthday = null;
                item = reversValue(item);
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

            $scope.removeDeath = function (item) {
                item.death = null;
                item = reversValue(item);
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
            $scope.getMultiplicity = function (option) {
                if (option.multiplicity !== null && option.multiplicity !== undefined) return option.multiplicity + 'x';
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
                            // console.log(info.error, err);
                            toastr.error(err.data.invalidAttributes, info.error + ' 90!');
                        });
                }
            };


            $scope.addOwnerField = function () {
                if (angular.isArray($scope.item.owners)) {
                    $scope.item.owners.push({});
                } else {
                    $scope.item.owners = [{}];
                }
            };


            $scope.addBreederField = function () {
                if (angular.isArray($scope.item.breeders)) {
                    $scope.item.breeders.push({id: 'x'});
                } else {
                    $scope.item.breeders = [{id: 'x'}];
                }
            };


            $scope.addKennelField = function () {
                if (angular.isArray($scope.item.kennels)) {
                    $scope.item.kennels.push({id: 'x'});
                } else {
                    $scope.item.kennels = [{id: 'x'}];
                }
            };

            $scope.addSireField = function () {
                if (angular.isArray($scope.item.sires)) {
                    $scope.item.sires.push({id: 'x'});
                } else {
                    $scope.item.sires = [{id: 'x'}];
                }
            };

            $scope.addDamField = function () {
                if (angular.isArray($scope.item.dams)) {
                    $scope.item.dams.push({id: 'x'});
                } else {
                    $scope.item.dams = [{id: 'x'}];
                }
            };


            $scope.addItem = function () {
                if (angular.isArray($scope.item.titles)) {
                    $scope.item.titles.push({id: 'x'});
                } else {
                    $scope.item.titles = [{id: 'x'}];
                }
            };

            $scope.addReaction = function () {
                if (angular.isArray($scope.item.reactions)) {
                    $scope.item.reactions.push({id: 'x'});
                } else {
                    $scope.item.reactions = [{id: 'x'}];
                }
            };
            $scope.addFurlough = function () {
                if (angular.isArray($scope.item.furloughs)) {
                    $scope.item.furloughs.push({});
                } else {
                    $scope.item.furloughs = [{}];
                }
            };
            $scope.addedPhoto = function () {

            };

            //** Удалить объекты титулов
            $scope.removeReaction = function (obj, filtered) {
                $scope.item.objDelReaction = [];
                $scope.item.objDelete = [];
                var photos = [];
                var reactions = [];

                $scope.item.reactions.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objDelReaction.push(obj.id);
                    } else {
                        reactions.push(value);
                    }
                });
                $scope.item.photos.forEach(function (value, key, mapObj) {
                    if (filtered == undefined) return;
                    if (value.id === filtered.id) {
                        $scope.item.objDelete.push(filtered.id);
                    } else {
                        photos.push(value);
                    }
                });
                $scope.item.reactions = reactions;
                $scope.item.photos = photos;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        // $state.go('home.admin.catalogs.edit', {catalogId: success.id});
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 89336!');
                    });
            };


            $scope.removeItem = function (obj, filtered) {
                $scope.item.objRemove = [];
                $scope.item.objDelete = [];
                var photos = [];
                var titles = [];

                $scope.item.titles.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRemove.push(obj.id);
                    } else {
                        titles.push(value);
                    }
                });
                $scope.item.photos.forEach(function (value, key, mapObj) {
                    if (filtered == undefined) return;
                    if (value.id === filtered.id) {
                        $scope.item.objDelete.push(filtered.id);
                    } else {
                        photos.push(value);
                    }
                });
                $scope.item.titles = titles;
                $scope.item.photos = photos;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                        // $state.go('home.admin.catalogs.edit', {catalogId: success.id});
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 8000!');
                    });
            };


            $scope.removeOwnerItem = function (obj) {
                $scope.item.objRd = [];
                var owners = [];
                $scope.item.owners.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRd.push(obj.id);
                    } else {
                        owners.push(value);
                    }
                });
                $scope.item.owners = owners;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
                    });
            };


            $scope.removeBreederItem = function (obj) {
                $scope.item.objRm = [];
                var breeders = [];
                $scope.item.breeders.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRm.push(obj.id);
                    } else {
                        breeders.push(value);
                    }
                });
                $scope.item.breeders = breeders;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9970!');
                    });
            };


            $scope.removeKennelItem = function (obj) {
                $scope.item.objRk = [];
                var kennels = [];
                $scope.item.kennels.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRk.push(obj.id);
                    } else {
                        kennels.push(value);
                    }
                });
                $scope.item.kennels = kennels;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
                    });
            };


            $scope.removeSireItem = function (obj) {
                $scope.item.objRisir = [];
                var sires = [];
                $scope.item.sires.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRisir.push(obj.id);
                    } else {
                        sires.push(value);
                    }
                });
                $scope.item.sires = sires;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
                    });
            };

            $scope.removeDamItem = function (obj) {
                $scope.item.objRidam = [];
                var dams = [];
                $scope.item.dams.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRidam.push(obj.id);
                    } else {
                        dams.push(value);
                    }
                });
                $scope.item.dams = dams;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
                    });
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

            breadcrumb.set('Home', '/');
            breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Catalogs', 'home.admin.catalogs');
            breadcrumb.set('Edit', 'home.admin.catalogs.edit' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;

            $scope.refresh();
        }
    ]);
