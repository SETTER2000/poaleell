(function (angular) {
    'use strict';
    angular.module('CalendarModule')
        .controller('CalendarController', ['$scope', '$http', 'moment', 'Calendars', '$location', '$stateParams', '$rootScope',
            function ($scope, $http, moment, Calendars, $location, $stateParams, $rootScope) {

                this.$stateParams = $stateParams;
                $scope.solo = true;
                $scope.inDate = '';
                moment.locale('ru');
                $scope.tbody = "/js/private/admin/calendars/views/view.tbody.html";
                var interval = {
                    start: moment().startOf($scope.globalPeriod).date(1).hours(0).minutes(0).seconds(0).milliseconds(0),
                    end: moment().endOf($scope.globalPeriod)
                };


                console.log('$STATE_PARAMS');
                console.log(this.$stateParams);
                $scope.data = [
                    {dlt: '1:30', date: '2017-03-12', lastName: 'Абрамов', firstName: 'Александр', patronymicName: 'Павлович'},
                    {dlt: '7:30', date: '2017-03-12', lastName: 'Авилкин', firstName: 'Андрей', patronymicName: 'Владимирович'},
                    {dlt: '1:30', date: '2017-03-12', lastName: 'Адушкина ', firstName: 'алина', patronymicName: 'Сергеевна'},
                    {dlt: '4:34', date: '2017-03-12', lastName: 'Аксиньина', firstName: 'Наталья', patronymicName: 'Васильевна'},
                    {dlt: '1:36', date: '2017-03-12', lastName: 'Андреев', firstName: 'Денис', patronymicName: 'Игоревич'},
                    {dlt: '2:20', date: '2017-03-12', lastName: 'Аникеев', firstName: 'Игорь', patronymicName: 'Юрьевич'},
                    {dlt: '1:30', date: '2017-03-12', lastName: 'Анисимова', firstName: 'Ирина', patronymicName: 'Игоревна'},
                    {dlt: '7:20', date: '2017-03-12', lastName: 'Аршавская', firstName: 'Екатерина', patronymicName: 'Александровна'},
                    {dlt: '4:34', date: '2017-03-12', lastName: 'Бакалин', firstName: 'Сергей', patronymicName: 'Иванович'},
                    {dlt: '6:25', date: '2017-03-12', lastName: 'Балабанов', firstName: 'Александр', patronymicName: 'Николаевич'},
                    {dlt: '2:39', date: '2017-03-12', lastName: 'Баранов', firstName: 'Дмитрий', patronymicName: 'Борисович'},
                    {dlt: '6:11', date: '2017-03-12', lastName: 'Белых', firstName: 'Сергей', patronymicName: 'Николаевич'},
                    {dlt: '1:30', date: '2017-03-12', lastName: 'Беляев', firstNam: 'Александр', patronymicName: 'Игоревич'},
                    {dlt: '5:30', date: '2017-03-12', lastName: 'Бессмертный', firstName: 'Вячеслав', patronymicName: 'Виталиевич'},
                    {dlt: '7:30', date: '2017-03-12', lastName: 'Бирюков', firstName: 'Алексей', patronymicName: 'Викторович'},
                    {dlt: '2:10', date: '2017-03-12', lastName: 'Богомолова', firstName: 'Галина', patronymicName: 'Анатольевна'},
                    {dlt: '8:33', date: '2017-03-12', lastName: 'Большакова', firstName: 'Татьяна', patronymicName: 'Ивановна'},
                    {dlt: '1:30', date: '2017-03-11', lastName: 'Абрамов', firstName: 'Александр', patronymicName: 'Павлович'},
                    {dlt: '7:30', date: '2017-03-11', lastName: 'Авилкин', firstName: 'Андрей', patronymicName: 'Владимирович'},
                    {dlt: '1:30', date: '2017-03-11', lastName: 'Адушкина ', firstName: 'алина', patronymicName: 'Сергеевна'},
                    {dlt: '4:34', date: '2017-03-11', lastName: 'Аксиньина', firstName: 'Наталья', patronymicName: 'Васильевна'},
                    {dlt: '1:36', date: '2017-03-11', lastName: 'Андреев', firstName: 'Денис', patronymicName: 'Игоревич'},
                    {dlt: '2:20', date: '2017-03-11', lastName: 'Аникеев', firstName: 'Игорь', patronymicName: 'Юрьевич'},
                    {dlt: '1:30', date: '2017-03-11', lastName: 'Анисимова', firstName: 'Ирина', patronymicName: 'Игоревна'},
                    {dlt: '7:20', date: '2017-03-11', lastName: 'Аршавская', firstName: 'Екатерина', patronymicName: 'Александровна'},
                    {dlt: '4:34', date: '2017-03-11', lastName: 'Бакалин', firstName: 'Сергей', patronymicName: 'Иванович'},
                    {dlt: '6:25', date: '2017-03-11', lastName: 'Балабанов', firstName: 'Александр', patronymicName: 'Николаевич'},
                    {dlt: '2:39', date: '2017-03-11', lastName: 'Баранов', firstName: 'Дмитрий', patronymicName: 'Борисович'},
                    {dlt: '6:11', date: '2017-03-11', lastName: 'Белых', firstName: 'Сергей', patronymicName: 'Николаевич'},
                    {dlt: '1:30', date: '2017-03-11', lastName: 'Беляев', firstNam: 'Александр', patronymicName: 'Игоревич'},
                    {dlt: '5:30', date: '2017-03-11', lastName: 'Бессмертный', firstName: 'Вячеслав', patronymicName: 'Виталиевич'},
                    {dlt: '7:30', date: '2017-03-11', lastName: 'Бирюков', firstName: 'Алексей', patronymicName: 'Викторович'},
                    {dlt: '2:10', date: '2017-03-11', lastName: 'Богомолова', firstName: 'Галина', patronymicName: 'Анатольевна'},
                    {dlt: '8:33', date: '2017-03-11', lastName: 'Большакова', firstName: 'Татьяна', patronymicName: 'Ивановна'},
                    {dlt: '1:30', date: '2017-03-10', lastName: 'Абрамов', firstName: 'Александр', patronymicName: 'Павлович'},
                    {dlt: '7:30', date: '2017-03-10', lastName: 'Авилкин', firstName: 'Андрей', patronymicName: 'Владимирович'},
                    {dlt: '1:30', date: '2017-03-10', lastName: 'Адушкина ', firstName: 'алина', patronymicName: 'Сергеевна'},
                    {dlt: '4:34', date: '2017-03-10', lastName: 'Аксиньина', firstName: 'Наталья', patronymicName: 'Васильевна'},
                    {dlt: '1:36', date: '2017-03-10', lastName: 'Андреев', firstName: 'Денис', patronymicName: 'Игоревич'},
                    {dlt: '2:20', date: '2017-03-10', lastName: 'Аникеев', firstName: 'Игорь', patronymicName: 'Юрьевич'},
                    {dlt: '1:30', date: '2017-03-10', lastName: 'Анисимова', firstName: 'Ирина', patronymicName: 'Игоревна'},
                    {dlt: '7:20', date: '2017-03-10', lastName: 'Аршавская', firstName: 'Екатерина', patronymicName: 'Александровна'},
                    {dlt: '4:34', date: '2017-03-10', lastName: 'Бакалин', firstName: 'Сергей', patronymicName: 'Иванович'},
                    {dlt: '6:25', date: '2017-03-10', lastName: 'Балабанов', firstName: 'Александр', patronymicName: 'Николаевич'},
                    {dlt: '2:39', date: '2017-03-10', lastName: 'Баранов', firstName: 'Дмитрий', patronymicName: 'Борисович'},
                    {dlt: '6:11', date: '2017-03-10', lastName: 'Белых', firstName: 'Сергей', patronymicName: 'Николаевич'},
                    {dlt: '1:30', date: '2017-03-10', lastName: 'Беляев', firstNam: 'Александр', patronymicName: 'Игоревич'},
                    {dlt: '5:30', date: '2017-03-10', lastName: 'Бессмертный', firstName: 'Вячеслав', patronymicName: 'Виталиевич'},
                    {dlt: '7:30', date: '2017-03-10', lastName: 'Бирюков', firstName: 'Алексей', patronymicName: 'Викторович'},
                    {dlt: '2:10', date: '2017-03-10', lastName: 'Богомолова', firstName: 'Галина', patronymicName: 'Анатольевна'},
                    {dlt: '8:33', date: '2017-03-10', lastName: 'Большакова', firstName: 'Татьяна', patronymicName: 'Ивановна'},
                    {dlt: '1:30', date: '2016-03-10', lastName: 'Абрамов', firstName: 'Александр', patronymicName: 'Павлович'},
                    {dlt: '7:30', date: '2016-03-10', lastName: 'Авилкин', firstName: 'Андрей', patronymicName: 'Владимирович'},
                    {dlt: '1:30', date: '2016-03-10', lastName: 'Адушкина ', firstName: 'алина', patronymicName: 'Сергеевна'},
                    {dlt: '4:34', date: '2016-03-10', lastName: 'Аксиньина', firstName: 'Наталья', patronymicName: 'Васильевна'},
                    {dlt: '1:36', date: '2016-03-10', lastName: 'Андреев', firstName: 'Денис', patronymicName: 'Игоревич'},
                    {dlt: '2:20', date: '2016-03-10', lastName: 'Аникеев', firstName: 'Игорь', patronymicName: 'Юрьевич'},
                    {dlt: '1:30', date: '2016-03-10', lastName: 'Анисимова', firstName: 'Ирина', patronymicName: 'Игоревна'},
                    {dlt: '7:20', date: '2016-03-10', lastName: 'Аршавская', firstName: 'Екатерина', patronymicName: 'Александровна'},
                    {dlt: '4:34', date: '2016-03-10', lastName: 'Бакалин', firstName: 'Сергей', patronymicName: 'Иванович'},
                    {dlt: '6:25', date: '2016-03-10', lastName: 'Балабанов', firstName: 'Александр', patronymicName: 'Николаевич'},
                    {dlt: '2:39', date: '2016-03-10', lastName: 'Баранов', firstName: 'Дмитрий', patronymicName: 'Борисович'},
                    {dlt: '6:11', date: '2016-03-10', lastName: 'Белых', firstName: 'Сергей', patronymicName: 'Николаевич'},
                    {dlt: '1:30', date: '2016-03-10', lastName: 'Беляев', firstNam: 'Александр', patronymicName: 'Игоревич'},
                    {dlt: '5:30', date: '2016-03-10', lastName: 'Бессмертный', firstName: 'Вячеслав', patronymicName: 'Виталиевич'},
                    {dlt: '7:30', date: '2016-03-10', lastName: 'Бирюков', firstName: 'Алексей', patronymicName: 'Викторович'},
                    {dlt: '2:10', date: '2016-03-10', lastName: 'Богомолова', firstName: 'Галина', patronymicName: 'Анатольевна'},
                    {dlt: '8:33', date: '2016-03-10', lastName: 'Большакова', firstName: 'Татьяна', patronymicName: 'Ивановна'},

                ];

                console.log('$SCOPE.DAYSpERIOD');
                console.log($scope.daysPeriod);
                console.log($scope.inDate);
                $scope.getDataAttendances = function (item) {
                    //return   item.date == '2017-03-10' || item.date == '2017-03-11';
                };


                $scope.send = function () {
                    $scope.data = [
                        {dlt: '1:30', date: '2017-03-12', lastName: 'Абрамов', firstName: 'Александр', patronymicName: 'Павлович'},
                        {dlt: '7:30', date: '2017-03-12', lastName: 'Авилкин', firstName: 'Андрей', patronymicName: 'Владимирович'},
                        {dlt: '1:30', date: '2017-03-12', lastName: 'Адушкина ', firstName: 'алина', patronymicName: 'Сергеевна'},
                        {dlt: '4:34', date: '2017-03-12', lastName: 'Аксиньина', firstName: 'Наталья', patronymicName: 'Васильевна'},
                        {dlt: '1:36', date: '2017-03-12', lastName: 'Андреев', firstName: 'Денис', patronymicName: 'Игоревич'},
                        {dlt: '2:20', date: '2017-03-12', lastName: 'Аникеев', firstName: 'Игорь', patronymicName: 'Юрьевич'},
                        {dlt: '1:30', date: '2017-03-12', lastName: 'Анисимова', firstName: 'Ирина', patronymicName: 'Игоревна'},
                        {dlt: '7:20', date: '2017-03-12', lastName: 'Аршавская', firstName: 'Екатерина', patronymicName: 'Александровна'},
                        {dlt: '4:34', date: '2017-03-12', lastName: 'Бакалин', firstName: 'Сергей', patronymicName: 'Иванович'},
                        {dlt: '6:25', date: '2017-03-12', lastName: 'Балабанов', firstName: 'Александр', patronymicName: 'Николаевич'},
                        {dlt: '2:39', date: '2017-03-12', lastName: 'Баранов', firstName: 'Дмитрий', patronymicName: 'Борисович'},
                        {dlt: '6:11', date: '2017-03-12', lastName: 'Белых', firstName: 'Сергей', patronymicName: 'Николаевич'},
                        {dlt: '1:30', date: '2017-03-12', lastName: 'Беляев', firstNam: 'Александр', patronymicName: 'Игоревич'},
                        {dlt: '5:30', date: '2017-03-12', lastName: 'Бессмертный', firstName: 'Вячеслав', patronymicName: 'Виталиевич'},
                        {dlt: '7:30', date: '2017-03-12', lastName: 'Бирюков', firstName: 'Алексей', patronymicName: 'Викторович'},
                        {dlt: '2:10', date: '2017-03-12', lastName: 'Богомолова', firstName: 'Галина', patronymicName: 'Анатольевна'},
                        {dlt: '8:33', date: '2017-03-12', lastName: 'Большакова', firstName: 'Татьяна', patronymicName: 'Ивановна'}
                    ];
                };

                $scope.$on("userNewArr", function (event, args) {
                    $scope.data = args.arr;
                });
                $scope.currentPeriod = function (period) {
                    $scope.globalPeriod = (period === 'week') ? 'week' : 'month';
                    $scope.section = (period === 'week') ? 'неделя' : 'месяц';
                    $scope.interval = {};
                    $scope.interval = interval;
                    $scope.interval.start = moment().startOf($scope.globalPeriod).date(1);
                    $scope.restart();
                    //$scope.send();
                };


                //$rootScope.$broadcast('userNewArr', {arr: $scope.users});


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
                    var dForm = [];
                    var daysPeriod = {data: []};
                    if (angular.isDefined($scope.interval)) {
                        var start = $scope.interval.start;
                        var end = $scope.interval.end;
                        recurrence = moment().recur(start, end).every(1).days(1);
                        recurrence.start.subtract(1, 'days');
                        recurrence.end.subtract(1, 'days');
                        daysPeriod.data = recurrence.next(31);
                        console.log('DAYSpERIOD.DATA');
                        console.log(daysPeriod.data);
                        console.log(daysPeriod.data[0].format('YYYY-MM-DD'));


                        console.log('LENGTH-D: ');
                        console.log(dForm);
                        daysPeriod.currentDate = moment().format('DD.MM.YYYY');
                        daysPeriod.periodMonth = daysPeriod.data[0].format('MMMM');
                        daysPeriod.periodYear = daysPeriod.data[0].format('YYYY');
                    }
                    else {
                        $scope.currentPeriod();
                    }
                    console.log('LENGTH: ' + daysPeriod.data.length);

                    daysPeriod.data.forEach(function (item, i) {
                        //if(item.format('YYYY-MM-DD') === '2017-03-05'){
                        if (item.format('YYYY-MM-DD')) {
                            dForm.push(item.format('YYYY-MM-DD'));
                        }
                    });
                    daysPeriod.dForm = dForm;
                    $scope.daysPeriod = daysPeriod;
                };
                $scope.getDtForm = function (item) {
                    if (angular.isDefined(item) && angular.isDefined($scope.daysPeriod)) {
                        var numberColumn = '';
                        if ($scope.daysPeriod.dForm.indexOf(item.date) > 0) {
                            numberColumn = $scope.daysPeriod.dForm.indexOf(item.date);
                            console.log(numberColumn);
                            item.numberColumn = numberColumn+1;

                            console.log(item);
                            return item;

                        }
                    }

                    //console.log($scope.daysPeriod.dForm);

                    //for (var i = 0; i < daysPeriod.data.length; i++) {
                    //    daysPeriod.dForm.push(daysPeriod.data[i].format('YYYY-MM-DD'));
                    //}
                };

                //$scope.$watch('daysPeriod', function (value) {
                //    $scope.getDtForm();
                //    console.log('HHHH');
                //});
                //console.log('DAYSpERIOD.DATA');
                //console.log($scope.daysPeriod.data);
                //dForm.push($scope.daysPeriod.data);
                //console.log('$SCOPE.DfORM-23');
                //console.log($scope.daysPeriod.data[0]);

                //$scope.daysPeriod.data.filter(function (item) {
                //    return item.format('YYYY-MM-DD') == '2017-03-05';
                //});
                console.log('$SCOPE.DfORM-2');
                console.log($scope.dForm);
                //console.log($scope.daysPeriod.data[0].format('YYYY-MM-DD'));

                $scope.toggleTop = function () {
                    $scope.solo = ($scope.solo) ? false : true;
                };

                $scope.toggleBlur = function (mx) {
                    $scope.solo = ($scope.solo) ? false : true;
                    $scope.interval.start = moment(mx).hours(0).minutes(0).seconds(0).milliseconds(0);
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
    ;
})(window.angular);