angular.module('CalendarModule')
    .controller('CalendarController', ['$scope', 'moment', 'Calendars', '$stateParams',
        function ($scope, moment, Calendars, $stateParams) {

            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Users.getFullName()
             */
            moment.locale('ru');
            $scope.solo = true;
            $scope.section = 'месяц';
            $scope.mx = new Date();


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


            // var recurrence;
            // $scope.m =moment();
            // console.log('SAAAAAA');
            // console.log($scope.m);

            // $scope.startPeriod = moment().year($scope.y).month($scope.m).date($scope.d);
            // // $scope.endPeriod = moment().year($scope.y).month().date($scope.d);
            // recurrence = moment().recur(moment().day($scope.d), moment().date(31)).every(1).days();
            // $scope.daysPeriod = recurrence.next(31);
            // $scope.periodMonth = $scope.daysPeriod[0].format('MMMM');
            // $scope.periodYear = $scope.daysPeriod[0].format('YYYY');
            $scope.toggleTop = function () {
                $scope.solo = ($scope.solo) ? false : true;
            };

            $scope.toggleBlur = function () {
                $scope.solo = ($scope.solo) ? false : true;
                $scope.startPeriod = moment($scope.mx).format("YYYY-MM-DD");
                $scope.m = moment($scope.mx).format("M");
                $scope.m--;
                $scope.d = moment($scope.mx).format("D");
                $scope.d--;
                $scope.y = moment($scope.mx).format("YYYY");
                console.log('PERIODDD');
                console.log($scope.m);
                console.log($scope.d);
                console.log($scope.y);
                console.log($scope.startPeriod);
                $scope.restart();
            };

            $scope.currentPeriod = function () {
                $scope.y = moment().year();
                $scope.m = moment().month();
                $scope.d = 0;
                $scope.restart();
            };

            $scope.nextOfMonth = function () {
                if ($scope.m) {
                    $scope.m++;
                } else {
                    $scope.currentPeriod();
                }
                $scope.restart();
            };
            $scope.prevOfMonth = function () {
                if ($scope.m) {
                    $scope.m--;
                } else {
                    $scope.currentPeriod();
                }

                $scope.restart();
            };

            // $scope.$watch('m', function (value) {
            //     $scope.m = value;
            //     console.log('МЕСЯЦ3');
            //     console.log($scope.m);
            //     $scope.restart();
            // });

            // $scope.$watch('m', function (value) {
            //     $scope.m = value;
            //     $scope.restart();
            // });
            $scope.restart = function () {
                console.log('PERIODDD2');
                console.log($scope.m);
                var en = $scope.m;
                $scope.startPeriod = moment().year($scope.y).month($scope.m).date($scope.d);
                $scope.endPeriod = moment().year($scope.y).month(en++).date($scope.d);
                recurrence = moment().recur(moment($scope.startPeriod), moment($scope.endPeriod).date(31)).every(1).days();
                $scope.daysPeriod = recurrence.next(31);
                $scope.periodMonth = $scope.daysPeriod[0].format('MMMM');
                $scope.periodYear = $scope.daysPeriod[0].format('YYYY');
            };
            // $scope.startPeriod = moment().year($scope.y).month($scope.m).date($scope.d);
            // $scope.endPeriod = moment().year($scope.y).month($scope.m).date($scope.d);
            // // $scope.startPeriod = moment().recur().every(1).month();
            //
            //
            // recurrence = moment().recur(moment($scope.startPeriod), moment( $scope.endPeriod).date(31)).every(1).days();
            // $scope.daysPeriod = recurrence.next(31);
            //
            //
            // /**
            //  * Calendar
            //  */
            // $scope.periodMonth = $scope.daysPeriod[0].format('MMMM');
            // $scope.periodYear = $scope.daysPeriod[0].format('YYYY');
            // $scope.period = moment($scope.dateStart).format('MMM');
            // recurrence = moment().recur(moment($scope.dateStart).date(1), moment($scope.dateEnd).date(31)).every(1).days();
            //recurrence = moment().recur(moment().date(1),moment().date(31)).every(1).months();
            // $scope.getDayWeek = function (day) {
            //     return moment({'day': day}).format('dd');
            // };
            // $scope.dn = moment().format('dd');
            //$scope.dateDayInterval = recurrence.next(3);
            // $scope.dateDayInterval = recurrence.all("L");
            //$scope.dateDayInterval = recurrence.next(3, "L");


            $scope.refresh = function () {
                $scope.item = Calendars.get({id: $stateParams.calendarId}, function (calendars) {
                    $scope.calendars = calendars;

                }, function (err) {
                    if (err) console.log(err.message);
                });
            };

            // $scope.toggleSelected = function () {
            //     $scope.selected = !$scope.selected;
            // };
            // $scope.isSelected = function () {
            //     return $scope.selected;
            // };
            //console.log($scope.items.login);


            // Обновление элемента
            //$scope.update = function (item) {
            //    item.$save();
            //    //$scope.currentView = 'table';
            //};


            //$scope.currentItem = ;
            // редеактирование существующего или создание нового элемента
            //$scope.editOrCreate = function (item) {
            //    $scope.currentItem = 'GOOOOOO';
            //    $location.path("/user/edit");
            //
            //};
            //$scope.goToViewEdit = function () {
            //    $location.path("/user/edit");
            //};

            $scope.refresh();

        }]);
