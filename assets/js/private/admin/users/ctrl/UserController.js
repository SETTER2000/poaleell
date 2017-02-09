angular.module('UserModule')
    .controller('UserController', ['$scope', 'Users', '$stateParams',
        function ($scope, Users, $stateParams) {

            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Users.getFullName()
             */
            //io.socket.on('purchase', function (event) {
            //    console.log('EVENT:');
            //    console.log(event.data);
            //    $scope.$apply();
            //});
            //
            //io.socket.on('user', function (event) {
            //    console.log('EVENT:');
            //    console.log(event.data);
            //    //$scope.$apply();
            //});
            //io.socket.get('/user', function (resData, jwres) {
            //    console.log(resData);
            //    $scope.$apply();
            //});
            console.log('EEEE:');
            io.socket.on('User', function (event){
                console.log(event);
                // => see below
            });

            io.socket.on('user', function (event) {
                console.log('EVA:');
                console.log(event);
            });
            //io.socket.on('message', function (data){
            //    console.log(data.greeting);
            //});

            io.socket.on('user', function (event) {
                console.log('DEPAR:');
                console.log(event);
            });

            $scope.refresh = function () {
                $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                    $scope.users = users;
                    // кол-во пользователей
                    // console.log($scope.users.length);
                    // console.log($scope.users);
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };
            // $SCOPE.SAVEeDIT = FUNCTION (ITEM) {
            //     //ITEM.BIRTHDAY   =  $SCOPE.NEWbIRTHDAY;
            //     //ITEM.DATEiNwORK =  $SCOPE.NEWdATEiNwORK;
            //     //ITEM.FIREDdATE  =  $SCOPE.NEWfIREDdATE;
            //
            //     IF (ANGULAR.ISdEFINED(ITEM.ID)) {
            //         ITEM.$UPDATE(ITEM, FUNCTION (SUCCESS) {
            //                 CONSOLE.LOG('success: ok!');
            //                 ITEM.OK();
            //             },
            //             FUNCTION (ERR) {
            //                 CONSOLE.LOG('error: ' + ERR.STATUS);
            //                 CONSOLE.LOG(ERR);
            //                 ITEM.ER();
            //             }
            //         );
            //     } ELSE {
            //         CONSOLE.LOG(ITEM);
            //        
            //         ITEM.$SAVE()
            //     }
            // };
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
