(function(angular) {
    'use strict';
angular.module('CalendarModule')
    .controller('CalendarController', ['$scope', '$http', 'moment', 'Calendars', '$location', '$stateParams', '$rootScope',
        function ($scope, $http, moment, Calendars, $location, $stateParams, $rootScope) {

            //this.$uiRoute = ;

            //this.$location = $location;
            this.$stateParams = $stateParams;

            console.log('$STATE_PARAMS');
            console.log( this.$stateParams);

            $scope.tbody = "/js/private/admin/calendars/views/view.tbody.html";
            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Users.getFullName()
             */
            moment.locale('ru');
            // $scope.globalPeriod = 'month';
            // $scope.globalPeriod = 'week';
            var interval = {
                start: moment().startOf($scope.globalPeriod).date(1).hours(0).minutes(0).seconds(0).milliseconds(0),
                end: moment().endOf($scope.globalPeriod)
            };
            //
            // console.log('STAT PARAM');
            // console.log($scope.section);
            //
            // console.log('START #1 PERIOD');
            // console.log(interval.start);
            //
            // console.log('END  #1 PERIOD');
            // console.log(interval.end);
            //

            $scope.solo = true;


            // $http.get('http://basicdata.ru/api/json/calend')
            //     .then(function (attendance) {
            //         console.log('attendance^^');
            //         console.log(attendance);
            //
            //         $scope.differ(attendance);
            //         console.log('DDD:');
            //         console.log($scope.items);
            //
            //     });


            $scope.users = [
                {lname: 'Абрамов', fname: 'Александр', pname: 'Павлович'},
                {lname: 'Авилкин', fname: 'Андрей', pname: 'Владимирович'},
                {lname: 'Адушкина ', fname: 'алина', pname: 'Сергеевна'},
                {lname: 'Аксиньина', fname: 'Наталья', pname: 'Васильевна'},
                {lname: 'Андреев', fname: 'Денис', pname: 'Игоревич'},
                {lname: 'Аникеев', fname: 'Игорь', pname: 'Юрьевич'},
                {lname: 'Анисимова', fname: 'Ирина', pname: 'Игоревна'},
                {lname: 'Аршавская', fname: 'Екатерина', pname: 'Александровна'},
                {lname: 'Бакалин', fname: 'Сергей', pname: 'Иванович'},
                {lname: 'Балабанов', fname: 'Александр', pname: 'Николаевич'},
                {lname: 'Баранов', fname: 'Дмитрий', pname: 'Борисович'},
                {lname: 'Белых', fname: 'Сергей', pname: 'Николаевич'},
                {lname: 'Беляев', fname: 'Александр', pname: 'Игоревич'},
                {lname: 'Бессмертный', fname: 'Вячеслав', pname: 'Виталиевич'},
                {lname: 'Бирюков', fname: 'Алексей', pname: 'Викторович'},
                {lname: 'Богомолова', fname: 'Галина', pname: 'Анатольевна'},
                {lname: 'Большакова', fname: 'Татьяна', pname: 'Ивановна'}
            ];

            $scope.currentPeriod = function (period) {

                $scope.globalPeriod = (period === 'week') ? 'week' : 'month';
                $scope.section = (period === 'week') ? 'неделя' : 'месяц';
                $scope.interval = {};
                // console.log('CURRENT DATE');
                // console.log(moment().startOf($scope.globalPeriod).date(1));
                //

                $scope.interval = interval;
                $scope.interval.start = moment().startOf($scope.globalPeriod).date(1);
                $scope.restart();
            };

            $scope.periodPrevNext = function (n, operator) {
                var t = 0;
                var y = $scope.interval.end;
                if (operator == 1) {
                    t = (n) ? (t + n) : t++;
                } else {
                    t = (n) ? (t - n) : t--;
                }
                if ($scope.globalPeriod === 'week') {
                    $scope.interval = $scope.interval.start.recur().every(1).weeks();
                    $scope.interval.end = y.recur().every(1).weeks().start;
                }
                if ($scope.globalPeriod === 'month') {
                    $scope.interval = $scope.interval.start.recur().every(1).months();
                    $scope.interval.end = y.recur().every(1).months().start;
                }


                $scope.interval.start.add(t, $scope.globalPeriod);
                $scope.interval.end.add(t, $scope.globalPeriod);
                $scope.restart();
            };

            $scope.restart = function () {
                var recurrence;
                var daysPeriod = {data: []};
                if (angular.isDefined($scope.interval)) {
                    var start = $scope.interval.start;
                    var end = $scope.interval.end;
                    recurrence = moment().recur(start, end).every(1).days(1);
                    // console.log('RECURRENCE');
                    recurrence.start.subtract(1, 'days');
                    recurrence.end.subtract(1, 'days');
                    // console.log(recurrence);
                    daysPeriod.data = recurrence.next(31);

                    // console.log('SPISOK DNEY');
                    // console.log(daysPeriod);

                    daysPeriod.currentDate = moment().format('DD.MM.YYYY');
                    // console.log('SPISOK333 DNEY');
                    // console.log(daysPeriod.currentDate);
                    daysPeriod.periodMonth = daysPeriod.data[0].format('MMMM');
                    daysPeriod.periodYear = daysPeriod.data[0].format('YYYY');
                }
                else {
                    $scope.currentPeriod();
                }
                $scope.daysPeriod = daysPeriod;
                // $rootScope.$broadcast('eventNextPeriod', daysPeriod);
            };

            // $scope.$on("eventNextPeriod", function (event, args) {
            //     $scope.daysPeriod = args;
            // });


            $scope.toggleTop = function () {
                $scope.solo = ($scope.solo) ? false : true;
            };

            $scope.toggleBlur = function (mx) {
                $scope.solo = ($scope.solo) ? false : true;
                $scope.interval.start = moment(mx).hours(0).minutes(0).seconds(0).milliseconds(0);

                // console.log('PERIODDD BLUR');
                // console.log($scope.interval);

                $scope.restart();
            };


            $scope.refresh = function () {
                $scope.item = Calendars.get({id: $stateParams.calendarId}, function (calendars) {
                    $scope.calendars = calendars;
                    $scope.restart();
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };

            $scope.refresh();
        }])

    //.controller('PeriodController', ['$stateParams', function ($stateParams) {
    //    this.name = 'PeriodController';
    //    this.params = $stateParams;
    //}])


;
})(window.angular);