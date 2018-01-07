'use strict';
angular.module('PhotoModule')
    .controller('EditPhotoController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Photos', 'moment', 'Positions', 'Departments', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Photos, moment, Positions, Departments, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            let info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newUserOk: 'Успешно создан.',
                redirectSelf: 'home.admin.photos',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-1950",
                notEmptyName: 'Название не может быть пустым.'
                //maxDate:"31-12-2002"
            };


            if (!$scope.me.admin && !$scope.me.kadr) $state.go(info.redirectSelf);

            $scope.close = 1;
            $scope.debug = true;

            $scope.loginAdmin = false;

            $scope.edit = $state.includes('home.admin.photos.edit');

            $scope.dateOpts = {
                locale: info.ru, // язык
                mode: "range", // диапазон дат выбрать
                dateFormat: info.dateFormat, // формат даты
                minDate: info.minDate, // минимальная дата
                allowInput: true, // ручной ввод даты
                inline: true, // календарь открыт
                onDayCreate: function (dObj, dStr, fp, dayElem) {
                    // dayElem.dateObj является соответствующей датой
                    // dObj - массив с выбранными датами

                    //const firstDate = moment();
                    //const secondDate = moment(dayElem.dateObj);
                    //
                    //console.log('DDDD',firstDate.isSameOrBefore(secondDate));
                    //console.log('dStr', dayElem.dateObj);
                    //console.log('dayElem.dateObj', a);
                    //if (t == a) {
                    //    console.log('dayElem.dateObj', a);
                    //    //console.log('t', t);
                    //    dayElem.innerHTML += "<span class='event'></span>";
                    //}
                    if (Math.random() < 0.15)
                        dayElem.innerHTML += "<span class='event'></span>";
                    else if (Math.random() > 0.85)
                        dayElem.innerHTML += "<span class='event busy'></span>";
                }
                //parseDate: function (str) {
                //    console.log('new Date(str)',new Date(str.selectedDates));
                //    return new Date(str.selectedDates);
                //}
                //maxDate: info.maxDate // максимальная дата
                //defaultDate: 'today' // по умолчанию какая дата отображается
            };

            $scope.flatpicker = {};


            /**
             * Это функция срабатывает каждый раз после выбора даты
             * Принимает объект flatpicker c вновь выбранными датами или одной датой
             * по сути это обработчик события onChange в документации Flatpickr
             * https://chmln.github.io/flatpickr/options/#eventsAPI
             *
             * изменяет текущий месяц на один вперед
             * console.log('changeMonth', fpItem.changeMonth(1));
             * изменяет текущий месяц на январь, после каждого клика
             * console.log('changeMonth', fpItem.changeMonth(0, false));
             *
             * @param fpItem
             * @returns {*}
             */
            $scope.datePostSetup = function (fpItem) {
                $scope.flatpicker = fpItem;

                //console.log('flatpickr', fpItem.parseDate());
                //console.log('flatpickr', fpItem.redraw());
                //console.log('$scope.item.location', $scope.item.location);
            };

            /**
             * Очищает непосредственно объект Flatpicker в отличие
             * от revert() которая очищает всю форму
             */
            $scope.clear = function () {
                $scope.flatpicker.clear();
            };

            /**
             * Загрузка Аватара
             * @type {FileUploader|*}
             */
            const uploader = $scope.uploader = new FileUploader({
                url: '/file/uploadPhoto',
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
                        toastr.error(info.requiredJpg, info.error + '10005');
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
                console.log(' $stateParams.photoId', $stateParams.photoId);
                console.info('onBeforeUploadItem', item);
                if (angular.isUndefined($scope.item.name)) return toastr.error(info.notEmptyName, info.error);
                item.formData.push({
                    id: $stateParams.photoId,
                    action: $scope.item.action,
                    name: $scope.item.name,
                    catalogs: (angular.isObject($scope.item.catalogs)) ? $scope.item.catalogs.id : '',
                    description: (angular.isUndefined($scope.item.description)) ? '' : $scope.item.description,
                    descriptionEn: (angular.isUndefined($scope.item.descriptionEn)) ? '' : $scope.item.descriptionEn,
                });

                console.log(' item.formData', item.formData);

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
                // console.log('fileItem', fileItem);
                $scope.pathToReport = response.avatarFd;
                $scope.goReport = response.goReport;
                $scope.statusErr = 'Отклонено';
                // console.log('REWWWWW', response);
                toastr.error(response, info.error + ' 8878899');
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
            $scope.uploaderView = "/js/private/admin/photos/views/uploader.html";


            $scope.removeCatalogItem = function (obj) {
                $scope.item.catalogs = '';
                $scope.saveEdit($scope.item);
            };


            $scope.refresh = function () {
                let item = $scope.item = Photos.get({id: $stateParams.photoId}, function (photos) {
                        $scope.photos = photos;

                        //$scope.flatpicker.set('currentYear',2017);
                        $scope.flatpicker.setDate(photos.name);
                        item.getBirthday();
                        item.getDateInWork();
                        item.getFiredDate();
                        item.getDecree();
                    }
                );
            };

            $scope.delete = function (item) {
                item.$delete({id: item.id}, function (success) {
                    toastr.success(info.objectDelete, info.ok);
                    $state.go(info.redirectSelf);
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/photos"); });
                    // $scope.refresh();
                }, function (err) {
                    //console.log(err);
                    toastr.error(err, info.error + ' 12122! ');
                })
            };


            $scope.saveEdit = function (item) {
                console.log('PERED ', item);
                if (!angular.isDefined(item)) return toastr.error('Нет объекта для сохранения.', info.error);
                if (!angular.isDefined(item.name)) return toastr.error(info.notEmptyName, info.error);
                if (angular.isDefined(item.id) && angular.isDefined(item.name)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.data.invalidAttributes, info.error + ' 11445!');
                        }
                    );
                } else {
                    if (angular.isDefined(item)) {
                        item.$save(item, function (success) {
                                toastr.success(info.newUserOk);
                                //$location.path('/profile') ;
                                $state.go('home.admin.photos', {photoId: success.id});
                            },
                            function (err) {
                                toastr.error(err);
                                //toastr.error(err.data.invalidAttributes, info.error + ' 89336!');
                            });
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
            $scope.addFurlough = function () {
                if (angular.isArray($scope.item.furloughs)) {
                    $scope.item.furloughs.push({});
                } else {
                    $scope.item.furloughs = [{}];
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
            };

            $scope.canRevert = function () {
                return !angular.equals($scope.item, original);
            };


            $scope.addDamField = function () {
                if (angular.isArray($scope.item.catalogs)) {
                    $scope.item.catalogs.push({id: 'x'});
                } else {
                    $scope.item.catalogs = [{id: 'x'}];
                }
            };

            $scope.removeDamItem = function (obj) {
                $scope.item.objRidam = [];
                let catalogs = [];
                $scope.item.catalogs.forEach(function (value, key, mapObj) {
                    if (obj == undefined) return;
                    if (value.id === obj.id) {
                        $scope.item.objRidam.push(obj.id);
                    } else {
                        catalogs.push(value);
                    }
                });
                $scope.item.catalogs = catalogs;
                $scope.item.$save($scope.item, function (success) {
                        toastr.success(info.changed);
                        $scope.refresh();
                    },
                    function (err) {
                        toastr.error(err.data.invalidAttributes, info.error + ' 9900!');
                    });
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

            let breadcrumb = new BreadCrumb();

            breadcrumb.set('Home', 'home');
            if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Photos', 'home.admin.photos');
            if ($scope.edit) breadcrumb.set('Edit', 'home.admin.photos.edit' + $state.current.url);
            if (!$scope.edit) breadcrumb.set('Create', 'home.admin.photos.edit' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            $scope.refresh();
        }]);
