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

            moment.locale('ru');
            var localLocale = moment();

            //$scope.numberMonth = moment().date(); // Номер текущего месяца
            $scope.numberMonth = moment.locale(); // Номер текущего месяца
            //$scope.numberMonth = moment.lang(); // Номер текущего месяца
            $scope.numberMonth = moment.monthsShort(); // Номер текущего месяца
            $scope.numberMonth = moment.weekdaysShort(); // Номер текущего месяца
            $scope.numberMonth = moment.weekdaysShort(3); // Номер текущего месяца
            $scope.numberMonth = moment().date(1).format("ddd, DD MMM"); //Текущий месяц
            //$scope.numberMonth = moment().dayOfYear(22).get('date'); // Номер текущего месяца
            $scope.numberMonth = moment().year(200).month(1).date(); // Номер текущего месяца
            $scope.numberMonth = moment().year(2017); // Номер текущего месяца
            $scope.numberMonth = moment().dayOfYear(365); // Номер текущего месяца
            $scope.numberMonth = moment.duration(2, 'years');// Номер текущего месяца
            $scope.numberMonth = moment.duration().asDays();// Номер текущего месяца
            $scope.numberMonth = moment.duration(2, 'months').days();// Номер текущего месяца
            $scope.numberMonth = moment.duration(2, 'months');// Номер текущего месяца

            //$scope.numberMonth = moment().day(-7); // Номер текущего месяца


            // Create a recurrence using today as the start date.
            //recurrence = moment().recur();
            //recurrence = moment.recur( start, end );
            //recurrence = moment.recur({
            //    start: "01/01/2014",
            //    end: "01/01/2015"
            //});
            //
            //// Will match any date that is on Sunday or Monday.
            //$scope.numberMonth =  moment.recur().every(["Sunday", 1]).daysOfWeek();


            //
            //require('moment-recur');


// Create recurrence without a start date. Note: this will not work with intervals.
            $scope.numberMonth = recurrence = moment.recur({
                start: "01/01/2016",
                end: "01/01/2017"
            });
            console.log('GGGG: ');
            console.log($scope.numberMonth);

            var myDate;

// Create a date to start from
            myDate = moment();

// You can pass the units to recur on, and the measurement type.
//            $scope.numberMonth = myDate.recur().every(1, "days");

// You can also chain the measurement type instead of passing it to every.
//            $scope.numberMonth = myDate.recur().every(1).day();
//
//// It is also possible to pass an array of units.
//            $scope.numberMonth = myDate.recur().every([3, 5]).days();
//
//// When using the dayOfWeek measurement, you can pass days names.
//            $scope.numberMonth = myDate.recur().every(["Monday", "wed"]).daysOfWeek();
//
//// Month names also work when using monthOfYear.
//            $scope.numberMonth = myDate.recur().every(["Jan", "february"], "monthsOfYear");



            var recurrence;
            $scope.cal = moment.recur().every("January").monthsOfYear();
            $scope.cal = myDate.recur().every([3, 5]).days();
            $scope.cal = moment.recur().every([1, 10]).daysOfMonth();

            $scope.cal = myDate.recur().every(1).every(5).days();
            /**
             * Calendar
             */


           var  recurrence = moment().recur().every(1).months();
            $scope.call=  recurrence.next(3);




            $scope.period = moment($scope.dateStart).format('MMM');
            recurrence = moment().recur(moment($scope.dateStart).date(1), moment($scope.dateEnd).date(31)).every(1).days();
            //recurrence = moment().recur(moment().date(1),moment().date(31)).every(1).months();
            $scope.getDayWeek= function (day) {
                return moment({'day': day}).format('dd');
            };
            $scope.dn = moment().format('dd');
            //$scope.dateDayInterval = recurrence.next(3);
            $scope.dateDayInterval = recurrence.all("L");
            //$scope.dateDayInterval = recurrence.next(3, "L");












            $scope.refresh = function () {
                $scope.item = Calendars.get({id: $stateParams.calendarId}, function (calendars) {
                    $scope.calendars = calendars;
                    // кол-во пользователей
                    // console.log($scope.users.length);
                    // console.log($scope.users);
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
