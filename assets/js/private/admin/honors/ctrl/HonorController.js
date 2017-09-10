angular.module('HonorModule')
//.constant('baseUrl', 'http://localhost:1337')
    .controller('HonorController', ['$scope', '$http', 'toastr', '$templateCache', '$window', '$state', 'FileUploader', '$interval', '$stateParams', '$resource', '$rootScope',
        function ($scope, $http, toastr, $templateCache, $window, $state, FileUploader, $interval, angularFileUpload, $stateParams, $resource, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            
            $scope.nameButton = 'Добавить';
            $scope.isMIME = 1;
            $scope.messMimeErr = '';
            $scope.goReport = false;
            $scope.download = false;
            /*********************************/

            $scope.getReport = function (fileName) {
                console.log('fileName');
                console.log(fileName);
                var url = "/images/honor/report/" + fileName;
                var oReq = new XMLHttpRequest();
                oReq.open("GET", url, true);
                oReq.responseType = "arraybuffer";

                oReq.onload = function (e) {
                    var arraybuffer = oReq.response;
                    var data = new Uint8Array(arraybuffer);
                    var arr = new Array();
                    if (data.length > 0) {
                        alert('URA ' + data.length + ' ' + String.fromCharCode(data[0]));
                    } else {
                        alert('Нет данных !' + data.length);
                    }
                    for (var i = 0; i != data.length; ++i) {
                        arr[i] = String.fromCharCode(data[i]);
                    }
                    var bstr = arr.join("");
                    var workbook = XLSX.read(bstr, {type: "binary"});
                    var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
                    var wbout = XLSX.write(workbook, wopts);
                    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "report.xlsx");
                };

                oReq.send();
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            };


            var uploader = $scope.uploader = new FileUploader({
                url: '/honor/upload',
                autoUpload: true
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
            // uploader.filters.push({
            //     name: 'expFilter',
            //     fn: function (item) {
            //         if (item.name.slice(-4) !== 'xlsx') {
            //             toastr.error('Расширение файла должно быть xlsx.', 'Ошибка!');
            //             return false;
            //         }
            //         $scope.uploaderButtonPrice = true;
            //         return true;
            //     }
            // });

            /**
             * Фильтр проверяет рассширение
             * Доступны для загрузки только jpg файлы
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

            /**
             * Фильтр перед загрузкой на сервер.
             * Проверяет имя файла на соответствие массиву вендоров.
             * Если имя файла не соответствует ни одному вендору,
             * то файл не ставится в очередь на загрузку.
             */
            // uploader.filters.push({
            //     name: 'nameFileFilter',
            //     fn: function (item) {
            //         if ($scope.rs = arrNameVendorIdeal.indexOf(item.name.slice(0, -5)) < 0) {
            //             toastr.error('Имя файла должно соответствовать названию вендора.', 'Ошибка!');
            //             return false;
            //         }
            //         return true;
            //     }
            // });
            
            // CALLBACKS
            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                //console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                //console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function (item) {
                //console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);

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
                toastr.error(response.message, 'Ошибка! Статус ' + status);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.log('uploader.onCancelItem');
                console.log(status);
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                //console.info('onCompleteItem', fileItem, response, status, headers);
                console.info('onCompleteItem', fileItem);
                if (status == 200) {
                    fileItem.pathToReport = '/images/honor/' + response.avatarFd;
                    fileItem.goReport = response.goReport;
                    fileItem.dateUpload = response.dateUpload;
                    toastr.success(response.message, 'Ok! ');
                    fileItem.progress = response.progress;
                    fileItem.errorPercent = '0';
                    fileItem.statusOk = response.message;
                    // fileItem.allEr = response.allEr;

                }
                switch (response.status) {
                    case 202:
                        //toastr.success(response.message, ' Статус ' + response.status);
                        fileItem.progress = response.progress;
                        fileItem.errorPercent = '(' + response.errorPercent + '%)';
                        fileItem.pathToReport = '/images/honor/report/' + response.avatarFd;
                        fileItem.goReport = response.goReport;
                        fileItem.statusOk = response.message;
                        fileItem.allEr = response.allEr;
                        break;
                }
            };
            uploader.onCompleteAll = function (fileItem, response, status, headers) {
                $scope.getDatePrice();
                $scope.uploaderButtonPrice = false;
            };

            console.log('UPLOADER:');
            console.log(uploader);

          
            $scope.getDatePrice = function () {
                $http.get('/honor/date').then(function successCallback(response) {
                        console.log(response.data);
                        if (response.data === '00:00:00') {
                            $scope.uploaderButtonPrice = true;
                        }
                        $scope.datePrice = response.data;
                    },
                    function errorCallback(response) {

                    }
                );
            };

            $scope.getDatePrice();

            toastr.options = {
                "closeButton": true
            };

            $scope.$watch('isMIME', function (value) {
                $scope.isMIME = value;
            });

            $scope.kb = function (ch) {
                var size = (ch / 1024).toFixed(2);
                if (size > 1023) {
                    return ((ch / 1024) / 1024).toFixed(2) + " Mb";
                }
                return size + " Kb";
            };

            $scope.fileNameChanged = function (ele) {
                var files = ele.files;
                var l = files.length;
                var namesArr = [];
                for (var i = 0; i < l; i++) {
                    if (files[i].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        $scope.isMIME = 0;
                        $scope.messMimeErr = '';
                        namesArr.push('Добавлен файл: ' + files[i].name + ' (' + $scope.kb(files[i].size) + ')');
                    } else {
                        $scope.isMIME = 1;
                        $scope.messMimeErr = 'Ошибка: Расширение не поддерживается. Создайте файл с расширением xlsx';
                    }
                }
                var promise = $http.post('/honor/upload', ele);
                promise.then(fullfilled, rejected);
                toastr.success('Объект удалён.', 'OK! ');
                $scope.namesString = namesArr.join(' ,');
                $scope.$apply();
            };

            $scope.addNewPrice = function (newPrice, isValid) {
                var req = {
                    method: 'POST',
                    url: '/honor/upload',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: newPrice
                };
                var promise = $http(req);
                promise.then(fullfilled, rejected);
                return false
            };

            function fullfilled(response) {
                console.log('Status: ' + response.status);
                console.log('Type: ' + response.headers('content-type'));
                console.log('Length: ' + response.headers('content-length'));
                console.log('Length: ' + response.data);

                toastr.success(response.data, 'Ok!');
                //$scope.items = response.data.users;
            }

            function rejected(err) {
                console.log(err.data);
                toastr.error(err.data, 'Ошибка! HonorController');
            }
        }]);