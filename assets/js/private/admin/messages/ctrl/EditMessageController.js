'use strict';
angular.module('MessageModule')
    .controller('EditMessageController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Messages', 'moment', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Messages, moment, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            moment.locale('ru');
            $scope.newObjectName = 'Новое сообщение';
            $scope.closeInfo = 0; // скрыть панель информации
            $scope.debug = true;
            $scope.loginAdmin = false;
            $scope.edit = $state.includes('home.admin.messages.edit');
            // $scope.dogs = $state.includes('home.dogs.catalog');


            $scope.inline = function () {
                $scope.item.inlinePanel = (!$scope.item.inlinePanel);
                // $scope.closeInfo = (!$scope.closeInfo) ? true : false;

                if (angular.isDefined($scope.item.id)) {
                    $scope.item.$update($scope.item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err, info.error + ' 905!');
                        }
                    );
                }


                // $scope.item.$save(
                // $scope.item, function (success) {
                //         //console.log(success);
                //         //location.reload();
                //         toastr.success(info.newOk);
                //         // /admin/message/
                //         //$location.path('/profile') ;
                //         console.log('SAVE - create');
                //         $state.go('home.admin.message', {messageId: success.id});
                //     },
                //     function (err) {
                //         toastr.error(err.data, 'Ошибка!');
                //     });
            };
            var info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newOk: 'Объект создан.',
                redirectSelf: 'home.admin.messages',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-2002",
                maxDate: "31-12-2020",
            };

            // console.log('$STATE message: ', $state);


            $scope.name = null;

            $scope.alphabetObj = function () {
                let obj = [{id: '', name: ''}];
                let ar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                ar.forEach(function (element, index, array) {
                    obj.push({id: element, name: element});
                });
                return obj;
            };

            $scope.optionsSelectSymbol = $scope.alphabetObj();

            $scope.optionsSelectGender = [
                // {id: '', name: ''},
                {id: 'сука', name: 'сука'},
                {id: 'кобель', name: 'кобель'}];

            $scope.optionsSelectPll = [
                {id: '', name: ''},
                {id: 'Чистый', name: 'Чистый'},
                {id: 'Носитель', name: 'Носитель'},
                {id: 'Болеет', name: 'Болеет'}];


            $scope.optionsSelectPll = [
                {id: '', name: ''},
                {id: 'Чистый', name: 'Чистый'},
                {id: 'Носитель', name: 'Носитель'},
                {id: 'Болеет', name: 'Болеет'}];


            $scope.timeOpts = {
                enableTime: true,
                noCalendar: true,
                enableSeconds: false, // disabled by default
                time_24hr: true, // AM/PM time picker is used by default
                // default format
                dateFormat: "H:i",
                // initial values for time. don't use these to preload a date
                // defaultHour: 12,
                // defaultMinute: 0,
                // Preload time with defaultDate instead:
                defaultDate: "13:00"
            };


            $scope.dateOpts = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate,
                maxDate: info.maxDate,
                // defaultDate: '2016-03-01 03:30:00 -0300'
                // maxDate: 'today'
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

            $scope.kennels = '';

            $scope.$watch('nameKennel', function () {
                $scope.getKennel();
            });

            $scope.datePostSetup = function (fpItem) {
                console.log('flatpickr', fpItem);
            };

            $scope.getKennel = function () {
                $http.post('/department/getParent', {name: $scope.nameKennel}).then(function (response) {
                    // console.log('RESPOOO:', response);
                    $scope.kennels = response.data;
                })
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
                item.formData.push({id: $stateParams.messageId});
                item.formData.push({idTitle: $scope.idTitle});
            };
            // uploadTitles.onBeforeUploadItem = function (item) {
            //     //console.info('onBeforeUploadItem', item);
            //     item.formData.push({id: $stateParams.messageId});
            //     item.formData.push({idT: $stateParams.messageId});
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
                item.formData.push({id: $stateParams.messageId});
                item.formData.push({idReaction: $scope.idReaction});
            };
            // uploadTitles.onBeforeUploadItem = function (item) {
            //     //console.info('onBeforeUploadItem', item);
            //     item.formData.push({id: $stateParams.messageId});
            //     item.formData.push({idT: $stateParams.messageId});
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
            const uploader = $scope.uploader = new FileUploader({
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
                item.formData.push({id: $stateParams.messageId});

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
            $scope.uploaderView = "/js/private/admin/messages/views/uploader.html";


            $scope.rating1 = 3;
            $scope.rating2 = 2;
            $scope.rating3 = 4;

            $scope.disabled1 = Math.floor(Math.random() * 100);
            $scope.disabled2 = 0;
            $scope.disabled3 = 70;

            $scope.invert = Math.floor(Math.random() * 100);

            $scope.isDisabled = false;


            $scope.refresh = function () {
                let item = $scope.item = Messages.get({id: $stateParams.messageId}, function (messages) {
                    $scope.messages = messages;

                    console.log('MESSAGES', messages);
                    $scope.name = messages.name;
                    // console.log('ITEM-+++5-SYMBOL',$scope.item.symbol );
                    // ($scope.item.symbol) ? $scope.lengthWeightMin = 0 : $scope.lengthWeightMin = 2200;
                    // console.log('messages входящий: ', messages);
                    // console.log('TYYYU: ', item.getTimeBirthday());

                    // item.getTimeBirthday();
                    item.getBirthday();
                    item.getDeath();
                    item.getFiredDate();
                    item.getDecree();
                    item.getDateWeight();
                });

            };
            $scope.delete2 = function (item) {
                item.$delete(item, function (success) {
                    toastr.success(info.objectDelete, info.ok);
                    $state.go(info.redirectSelf);
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/messages"); });
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
            const reversValue = function (item) {
                item.birthday = ( item.birthday) ? new Date(moment(item.birthday, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.dateWeight = ( item.dateWeight) ? new Date(moment(item.dateWeight, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.death = (item.death) ? new Date(moment(item.death, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.firedDate = ( item.firedDate) ? new Date(moment(item.firedDate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                item.decree = ( item.decree) ? new Date(moment(item.decree, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;
                // item.timeBirthday= (item.timeBirthday) ? item.timeBirthday : item.getBirthday();
                return item;
            };

            $scope.saveDiary = function (item) {
                $state.go('home.admin.diarys.message', {'messageId': item.id});
                // $state.go('home.admin.messages.diary', {diaryId: success.id});
            };
            $scope.saveJournal = function (item) {
                $state.go('home.admin.message.diary', {'messageId': item.id, 'diaryId': item.id});
                // $state.go('home.admin.messages.diary', {diaryId: success.id});
            };


            $scope.wind = true;
            $scope.openWindow = function () {
                $rootScope.$broadcast('newData',{
                    wind:(!$scope.wind),
                });
            };
            // слушаем событие в нужном нам $scope
            $rootScope.$on('newDogMessage', function (event, data) {
                console.log('newDogMessage:',data); // Данные, которые нам прислали
                $scope.dog = data.item;
                $scope.newMessage['dogName'] = data.item.getFullName();
            });

            /**
             * Сохранить изменения
             * @param item
             */
            $scope.saveEdit = function (item) {
                let lengthNicknameMin = 1;
                // console.log('item-555:', item);
                // console.log('KENNELS 33: ', item.kennels);
                // if (item.name.length < lengthNicknameMin) return toastr.error('Имя меньше ' + lengthNicknameMin + ' символов', 'Ошибка!');
                // if (!item.kennels.id) return toastr.error('Питомник не заполнен.', 'Ошибка!');
                // if (!item.sires) return toastr.error('Отец не установлен.', 'Ошибка!');

                // if (item.nickname.length < lengthNicknameMin) return toastr.error('Кличка меньше ' + lengthNicknameMin + ' символов', 'Ошибка!');
                // if (item.weight < $scope.lengthWeightMin) return toastr.error('Вес меньше ' + $scope.lengthWeightMin + ' символов', 'Ошибка!');

                // item = reversValue(item);
                if (item.id) {

                    console.log('UPDATE: ', item);
                    // item.price = [
                    //     {how: 10000, max: 200000, min: 1000, step: 1000, name: 'rub', title:'рубль'},
                    //     {how: 2000, max: 3000, min: 10, step: 10, name: 'usd', title:'dollar'},
                    //     {how: 1000, max: 2500, min: 10, step: 10, name: 'euro', title:'euro'}
                    // ];
                    item.$update(item, function (success) {
                            toastr.success(info.changed);

                            // console.log('UPDATE2');
                            $scope.refresh();
                        },
                        function (err) {

                            toastr.error(err.data, 'Ошибка!');
                            // $scope.refresh();
                        }
                    );
                } else {

                    // item.recipients = ['593d53194f14e7fc2864c305'];
                    
                    // if (!item.id && item.message && item.recipients) {
                    if (!item.id && item.message ) {
                        // console.log('ITEM DO', item);
                        // console.log('item.recipients', item.recipients);
                        let ar = [];
                        _.forEach(item.recipients, function (value, key) {
                            ar.push(value.id);
                        });
                       (angular.isArray(item.recipientUsers)) ? item.recipientUsers.push(ar) : item.recipientUsers=ar;

                        item.$save(item, function (success) {
                                console.log('POSLE', success);
                                //location.reload();
                                toastr.success(info.newOk);
                                // /admin/message/
                                //$location.path('/profile') ;
                                $state.go('home.admin.message', {messageId: success.id});
                            },
                            function (err) {
                                toastr.error(err.data, 'Ошибка!');
                                // if(err.data['originalError'].code == 11000) return toastr.error('Объект уже существует.',  'Ошибка '+err.data['originalError'].code+'!');

                            });
                    } else {
                        toastr.error('Нужно заполнить поля: Сообщение, Email.', 'Ошибка!');
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


            // $scope.addOwnerField = function () {
            //     if (angular.isArray($scope.item.owners)) {
            //         $scope.item.owners.push({});
            //     } else {
            //         $scope.item.owners = [{}];
            //     }
            // };


            $scope.addRecipientField = function () {
                if (angular.isArray($scope.item.recipients)) {
                    $scope.item.recipients.push({id: 'x'});
                } else {
                    $scope.item.recipients = [{id: 'x'}];
                }
            };


            // $scope.addKennelField = function () {
            //     if (angular.isArray($scope.item.kennels)) {
            //         $scope.item.kennels.push({id: 'x'});
            //     } else {
            //         $scope.item.kennels = [{id: 'x'}];
            //     }
            // };

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
                        // $state.go('home.admin.messages.edit', {messageId: success.id});
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
                        // $state.go('home.admin.messages.edit', {messageId: success.id});
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


            // $scope.removeBreederItem = function (obj) {
            //     $scope.item.objRm = [];
            //     var breeders = [];
            //     $scope.item.breeders.forEach(function (value, key, mapObj) {
            //         if (obj == undefined) return;
            //         if (value.id === obj.id) {
            //             $scope.item.objRm.push(obj.id);
            //         } else {
            //             breeders.push(value);
            //         }
            //     });
            //     $scope.item.breeders = breeders;
            //     $scope.item.$save($scope.item, function (success) {
            //             toastr.success(info.changed);
            //             $scope.refresh();
            //         },
            //         function (err) {
            //             toastr.error(err.data.invalidAttributes, info.error + ' 9970!');
            //         });
            // };
            //
            //
            // $scope.removeKennelItem = function (obj) {
            //     $scope.item.objRk = [];
            //     var kennels = [];
            //     $scope.item.kennels.forEach(function (value, key, mapObj) {
            //         if (obj == undefined) return;
            //         if (value.id === obj.id) {
            //             $scope.item.objRk.push(obj.id);
            //         } else {
            //             kennels.push(value);
            //         }
            //     });
            //     $scope.item.kennels = kennels;
            //     $scope.item.$save($scope.item, function (success) {
            //             toastr.success(info.changed);
            //             $scope.refresh();
            //         },
            //         function (err) {
            //             toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
            //         });
            // };


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

            breadcrumb.set('Home', 'home');
            if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Messages', 'home.admin.messages');
            if ($scope.edit) breadcrumb.set('Edit', 'home.admin.messages.edit' + $state.current.url);
            if (!$scope.edit) breadcrumb.set('Create', 'home.admin.messages.edit' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;

            $scope.refresh();
        }
    ]);
