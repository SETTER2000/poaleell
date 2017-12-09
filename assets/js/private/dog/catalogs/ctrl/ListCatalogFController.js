(function (angular) {
    'use strict';
    angular.module('CatalogFModule')
        .controller('ListCatalogFController', ['$scope', '$location', 'moment', '$http', 'toastr', 'toastrConfig',
            "$rootScope", '$state', 'CatalogsF', '$mdDialog', '$window',
            function ($scope, $location, moment, $http, toastr, toastrConfig, $rootScope, $state, CatalogsF, $mdDialog) {
                $scope.me = window.SAILS_LOCALS.me;
                $scope.status = '  ';
                $scope.customFullscreen = false;

                $scope.showAlert = function (ev) {

                    /**
                     * Добавление диалога к document.body для покрытия sidenav в приложении docs
                     * Модальные диалоги должны полностью охватывать приложение
                     * для предотвращения взаимодействия вне диалога
                     */
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Это заголовок предупреждения')
                            .textContent('Здесь вы можете указать текст описания.')
                            .ariaLabel('Диалоговое окно оповещения')
                            .ok('Ok!')
                            .targetEvent(ev)
                    );
                };

                // $scope.showConfirm = function(ev) {
                //     // Appending dialog to document.body to cover sidenav in docs app
                //     var confirm = $mdDialog.confirm()
                //         .title('Would you like to delete your debt?')
                //         .textContent('All of the banks have agreed to forgive you your debts.')
                //         .ariaLabel('Lucky day')
                //         .targetEvent(ev)
                //         .ok('Please do it!')
                //         .cancel('Sounds like a scam');
                //
                //     $mdDialog.show(confirm).then(function() {
                //         $scope.status = 'You decided to get rid of your debt.';
                //     }, function() {
                //         $scope.status = 'You decided to keep your debt.';
                //     });
                // };
                //
                // $scope.showPrompt = function(ev) {
                //     // Appending dialog to document.body to cover sidenav in docs app
                //     var confirm = $mdDialog.prompt()
                //         .title('What would you name your dog?')
                //         .textContent('Bowser is a common name.')
                //         .placeholder('Dog name')
                //         .ariaLabel('Dog name')
                //         .initialValue('Buddy')
                //         .targetEvent(ev)
                //         .required(true)
                //         .ok('Okay!')
                //         .cancel('I\'m a cat person');
                //
                //     $mdDialog.show(confirm).then(function(result) {
                //         $scope.status = 'You decided to name your dog ' + result + '.';
                //     }, function() {
                //         $scope.status = 'You didn\'t name your dog.';
                //     });
                // };
                //
                // $scope.showAdvanced = function(ev) {
                //     $mdDialog.show({
                //         controller: DialogController,
                //         templateUrl: 'dialog1.tmpl.html',
                //         parent: angular.element(document.body),
                //         targetEvent: ev,
                //         clickOutsideToClose:true,
                //         fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                //     })
                //         .then(function(answer) {
                //             $scope.status = 'You said the information was "' + answer + '".';
                //         }, function() {
                //             $scope.status = 'You cancelled the dialog.';
                //         });
                // };
                //
                // $scope.showTabDialog = function(ev) {
                //     $mdDialog.show({
                //         controller: DialogController,
                //         templateUrl: 'tabDialog.tmpl.html',
                //         parent: angular.element(document.body),
                //         targetEvent: ev,
                //         clickOutsideToClose:true
                //     })
                //         .then(function(answer) {
                //             $scope.status = 'You said the information was "' + answer + '".';
                //         }, function() {
                //             $scope.status = 'You cancelled the dialog.';
                //         });
                // };
                //
                // $scope.showPrerenderedDialog = function(ev) {
                //     $mdDialog.show({
                //         contentElement: '#myDialog',
                //         parent: angular.element(document.body),
                //         targetEvent: ev,
                //         clickOutsideToClose: true
                //     });
                // };

                function DialogController($scope, $mdDialog) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.answer = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }


                $scope.$on('defaultRowsTable', function (event, data) {
                    console.log('defaultRowsTable', data); // Данные, которые нам прислали
                    return $scope.defaultRows = data.defaultRows;
                });

                $scope.defaultRows = ($scope.me.defaultRows) ? $scope.me.defaultRows : 15;


                $scope.limitRows = [2, 3, 5, 7, 10, 15, 30, 50, 70, 100];
                $scope.currentPage = 1; // инициализируем кнопку постраничной навигации

                $scope.$watch('defaultRows', function (value, old) {
                    $http.put('/user/update-rows', {
                        defaultRows: $scope.defaultRows
                    })
                        .then(function onSuccess(sailsResponse) {
                            console.log('sailsResponse in ListController: ', sailsResponse.data[0].defaultRows);
                            $scope.defaultRows = $scope.me.defaultRows = sailsResponse.data[0].defaultRows;

                            // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                            // window.location = '#/profile/' + $scope.editProfile.properties.id;
                            //window.location = '/profile';
                            //toastr.success(info.passChange);
                            //$scope.editProfile.loading = false;
                        })
                        .catch(function onError(sailsResponse) {
                            // console.log('sailsresponse: ', sailsResponse)
                            // Otherwise, display generic error if the error is unrecognized.
                            //$scope.editProfile.changePassword.errorMsg = $scope.unexpected + (sailsResponse.data || sailsResponse.status);
                            toastr.error('ERRDDD!', $scope.editProfile.changePassword.errorMsg);
                        })
                        .finally(function eitherWay() {
                            $scope.editProfile.loading = false;
                        });
                    //console.log('value NEW', value);
                    //console.log('value OLD', old);
                    //$scope.countDefaultRows();
                });

                $scope.debug = false;
                $scope.nameHeader = {
                    fioArea: 'Имя',
                    genderArea: 'Пол',
                    weightArea: 'Вес',
                    growthArea: 'Рост',
                    varietyArea: 'Тип',
                    colorArea: 'Окрас',
                    salesArea: 'Продаётся',
                    breederArea: 'Заводчик',
                    ownerArea: 'Владелец',
                    messagesArea: 'Сообщения',
                };
                $scope.added = 'Добавить собаку';
                $scope.showBt = ($scope.me.kadr || $scope.me.admin) ? 1 : 0; // показать кнопку $scope.added
                $scope.urlBt = 'home.admin.catalogs.create';
                // показать формочку выбора кол-ва строк на странице
                $scope.showContIt = ($scope.me.admin) ? 1 : 0;
                $scope.str = 'Петров';
                $scope.countChar = '3';
                $scope.filedName = 'kennels';
                $scope.more = 'Подробнее';
                $scope.sort = 'updatedAt';
                $scope.param = 'updatedAt';
                $scope.fieldName = 'Внутренний телефон';
                $scope.charText = '';
                $scope.searchText = '';
                $scope.page_number = 0;
                $scope.limitAll = 1000;
                $scope.where = {};
                $scope.alfavit = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
                $scope.enabledButton = false;
                $scope.styleObj = {
                    color: false,
                    border: false,
                    size: false
                };
                $scope.help = {
                    dogsOnCatalog: 'В каталоге представлены собаки питомника Poale Ell, а так же собаки из других питомников.',
                };
                //$scope.days = moment.duration(2).days();
                //$scope.hours = moment.duration(2).hours();
                //$scope.month = moment.duration().months();
                //$scope.months = moment.duration().asMonths();
                //$scope.seconds = moment.duration(1000).seconds();
                //var a = moment('2016-01-21 09:38:00', ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
                //var b = moment('2016-01-21 13:54:00', ['DD.MM.YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
                //$scope.diff = b.diff(a, 'm');
                //$scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
                //$scope.local = moment().local().format("ddd, hA");
                //$scope.local = moment().local().format("dddd, MMMM Do YYYY, h:mm:ss a");
                //$scope.localTime = moment().local().format();
                //$scope.localTime = moment.parseZone('2016-05-03T22:15:01+02:00').local().format();
                //$scope.localTime = moment().utc().local().hours();
                //var start = moment([2007, 0, 5]);
                //var end = moment([2007, 0, 10]);
                //end.from(start);       // "in 5 days"
                //$scope.end = end.from(start, true); // "5 days"

                if (moment().isLeapYear()) {
                    $scope.yearLeap = 'Да!';
                } else {
                    $scope.yearLeap = 'Нет';
                }

                $scope.yearLeap = moment(1316116057189).fromNow();

                $scope.message = {
                    text: 'hello world!',
                    time: new Date()
                };

                //$scope.calendar = moment().calendar(null, {
                //    sameDay: function (now) {
                //        if (this.isBefore(now)) {
                //            return '[Случится сегодня]';
                //        } else {
                //            return '[Произошло сегодня]';
                //        }
                //        /* ... */
                //    }
                //});
                $scope.filterTemplate = {
                    all: {action: true},
                    action: {action: false},
                    male: {gender: 'кобель', action: true},
                    female: {gender: 'сука', action: true},
                    poaleell: {action: true},
                };

                $scope.filterKennel = {
                    poaleell: "star", // задаем логин владельца и заводчика
                };


                if ($scope.me.admin || $scope.me.kadr) {
                    $scope.filterTemplate['all'] = {};
                }


                $scope.$watch('modeSelect.value', function (value, old) {
                    $scope.ftObj = $scope.filterTemplate[value];
                    $scope.ftKennel = $scope.filterKennel[value];
                });

                $scope.$watch('searchText', function (value, old) {
                    $scope.searchText = value;
                });

                $scope.options =
                    [
                        {display: "Dog kennel Poale Ell", value: "poaleell"},
                        {display: "Кобели", value: "male"},
                        {display: "Суки", value: "female"},
                        {display: "Все", value: "all"},

                    ];
                if ($scope.me.admin) $scope.options.push({display: "Не активированы / Заблокированы", value: "action"});


                $scope.modeSelect = $scope.options[0];
                // $scope.tableView = "/js/private/admin/catalogs/views/home.admin.catalogs.table.html";
                // $scope.listView = "/js/private/admin/catalogs/views/home.admin.catalogs.list.html";
                // $scope.actionView = "/js/private/admin/catalogs/views/home.admin.catalogs.action.html";
                // $scope.workView = "/js/private/admin/catalogs/views/home.admin.catalogs.work.html";

                $scope.getLastName = function (item) {
                    $http.post('/att', item)
                        .then(function (attendance) {
                            $scope.differ(attendance);
                            $scope.numPages = Math.floor($scope.items.length / $scope.defaultRows) + 1;
                        });
                };

                $scope.differ = function (attendance) {
                    var data = [];
                    for (var i = 0; i < attendance.data.length; i++) {
                        (function () { // каждая созданная функция будет работать со своей локальной переменной.
                            var local = i;
                            var a, b;
                            a = moment(attendance.data[local].time_in, ['HH:mm:ss']);
                            b = moment(attendance.data[local].time_out, ['HH:mm:ss']);

                            data.push({
                                'getFullName': function () {
                                    return this.lname + ' ' + this.fname + ' ' + this.pname;
                                },
                                getContact: function (fieldName) {
                                    return this.date;
                                },
                                'pname': attendance.data[local].pname,
                                'lname': attendance.data[local].lname,
                                'fname': attendance.data[local].fname,
                                'date': attendance.data[local].date,
                                'birthday': attendance.data[local].time_in,
                                'login': attendance.data[local].time_out,
                                'email': attendance.data[local].email,
                                'diff': $scope.getTimeFormatMilliseconds(b.diff(a), 1, 'Неизвестно')
                            });
                        })();
                    }
                    $scope.items = data;
                };

                /**
                 * Проверка на точное соответствие аргумента n числу
                 * @param n
                 * @returns {boolean}
                 */
                $scope.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };

                $scope.getTimeFormatMilliseconds = function (milliseconds, secondAdd, mess) {
                    if ($scope.isNumeric(milliseconds)) {
                        var a = {};
                        var sec;
                        sec = (secondAdd) ? ':00' : '';
                        // всего минут
                        a.min = (milliseconds / 1000) / 60;
                        // минуты после целого, т.е. часов
                        a.minCeil = (a.min % 60);
                        // Добавляем ведущий ноль
                        a.minCeil = (a.minCeil < 10) ? ('0' + a.minCeil) : a.minCeil;
                        a.hoursCeil = Math.floor(a.min / 60); // минуты после целого, т.е. часов
                        // Добавляем ведущий ноль (один час был: 1 стал 01)
                        a.hoursCeil = (a.hoursCeil < 10) ? ('0' + a.hoursCeil) : a.hoursCeil;
                        milliseconds = a.time = a.hoursCeil + ':' + a.minCeil + sec;
                    } else {
                        // Сообщение если отсутствует значение или оно не корректно
                        milliseconds = mess;
                    }
                    return milliseconds;
                };

                $scope.$watch('where', function (value) {
                    $scope.refresh(value);
                });

                $scope.refresh = function (where) {
                    if (where) {
                        $scope.where = where;
                    } else {
                        $scope.where = {};
                    }
                    $scope.query = {
                        where: $scope.where,
                        sort: $scope.sort,
                        limit: $scope.limitAll,
                        property: 'name',
                        char: $scope.charText + '%'
                    };

                    $scope.items = CatalogsF.query($scope.query, function (catalogs) {
                        // console.log('CatalogsF LIST:', catalogs);
                        $scope.items = catalogs;
                        $scope.countCurrentView = catalogs.length;
                        $scope.objectName = catalogs;


                    }, function (err) {
                        toastr.error(err.data.details, 'Ошибка77! ' + err.data.message);
                    });
                };

                $scope.showPopup = function (text, num) {

                    // angular.extend(toastrConfig, {
                    // "allowHtml": true,
                    // autoDismiss: false,
                    // containerId: 'toast-container',
                    // maxOpened: 0,
                    // newestOnTop: true,
                    // positionClass: 'toast-top-right',
                    // // positionClass: 'toast-top-left',
                    // positionClass: 'toast-top-full-width',
                    // preventDuplicates: false,
                    // preventOpenDuplicates: true,
                    // target: 'body',
                    // // closeButton:true,
                    // extendedTimeOut:1000,
                    // "showDuration": "100",
                    // "hideDuration": "300",
                    // "timeOut": "5000",
                    // "progressBar": true,
                    // });
                    if (!angular.isNumber(num)) return;
                    if (num === 1) toastr.info(text, 'Информация!', {
                        "allowHtml": true,
                        // iconClass:'toast-pink',
                        // autoDismiss: false,
                        // containerId: 'toast-container',
                        // maxOpened: 0,
                        // newestOnTop: true,
                        // positionClass: 'toast-top-right',
                        // // positionClass: 'toast-top-left',
                        // positionClass: "toast-top-full-width",
                        // preventDuplicates: false,
                        // preventOpenDuplicates: true,
                        // target: 'body',
                        // // closeButton:true,
                        // extendedTimeOut:1000,
                        // "showDuration": "100",
                        // "hideDuration": "300",
                        // "timeOut": "5000",
                        "progressBar": true,
                    });
                };
                $scope.getMode = function (t) {
                    if (t) {
                        $scope.refresh({"fired": false});
                        $scope.t = false;
                    } else {
                        $scope.refresh({"fired": true});
                        $scope.t = true;
                    }
                };

                $scope.getPage = function (num) {
                    $scope.page_number = num;
                };

                $scope.delete = function (item) {
                    item.$delete(item, function (success) {
                        $scope.refresh();
                    }, function (err) {
                        console.log(err);
                    })
                };

                $scope.propertyName = 'lastName';

                $scope.reverse = true;


                $scope.msd = ['settings', 'home', 'options', 'other'];

                $scope.selectionMode = $scope.msd[0];

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
                if ($scope.me.admin) if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
                breadcrumb.set('Catalog', 'home.admin.catalogs' + $state.current.url);
                $scope.breadcrumbs = breadcrumb;

                $scope.refresh();
            }]);
})(window.angular);