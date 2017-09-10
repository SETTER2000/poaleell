'use strict';
angular.module('VacationModule')
    .controller('EditVacationController', ['$scope', '$http', 'toastr', '$interval', '$state', 'Vacations', 'moment', 'Positions', 'Departments', '$stateParams', 'FileUploader', '$rootScope',
        function ($scope, $http, toastr, $interval, $state, Vacations, moment, Positions, Departments, $stateParams, FileUploader, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            var info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newUserOk: 'Успешно создан.',
                redirectSelf: 'home.admin.vacations',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-1950"
                //maxDate:"31-12-2002"
            };


            if (!$scope.me.admin && !$scope.me.kadr) $state.go(info.redirectSelf);

            $scope.close = 1;

            $scope.loginAdmin = false;

            $scope.edit = $state.includes('home.admin.vacations.edit');

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


            //console.log( $stateParams.vacationId);
            //var item = $scope.item = Vacations.get({id: $stateParams.vacationId}, function (vacations) {
            $scope.refresh = function () {
                let item = $scope.item = Vacations.get({id: $stateParams.vacationId}, function (vacations) {
                        $scope.vacations = vacations;

                        //$scope.flatpicker.set('currentYear',2017);
                        $scope.flatpicker.setDate(vacations.name);
                        item.getBirthday();
                        item.getDateInWork();
                        item.getFiredDate();
                        item.getDecree();
                    }
                );
            };

            $scope.delete2 = function (item) {
                console.log('item', item);
                item.$delete(item, function (success) {
                    toastr.success(info.objectDelete, info.ok);
                    $state.go(info.redirectSelf);
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/vacations"); });
                    // $scope.refresh();
                }, function (err) {
                    //console.log(err);
                    toastr.error(err, info.error + ' 122! ');
                })
            };


            $scope.saveEdit = function (item) {
                if (!angular.isDefined(item))toastr.error('Нет объекта для сохранения.', 'Ошибка!');
                if (!angular.isDefined(item.name)) return toastr.error('Дата не может быть пустой.', 'Ошибка!');
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
                                $state.go('home.admin.vacation', {vacationId: success.id});
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

            $scope.refresh();
        }]);
