angular.module('PositionModule')
    .controller('EditPositionController', ['$scope', '$state', 'Positions', '$stateParams', '$rootScope',
        function ($scope, $state, Positions, $stateParams, $rootScope) {
            // $scope.deleteEdit = function (item) {
            //     // $emit - отправка события от текущего scope к родительским scope
            //     // $scope.$emit("deleteUser", item);
            //     // $broadcast - отправка события всем scope от rootScope
            //     // $rootScope.$broadcast("deleteUser", {
            //     //     message: 'GOOOO'
            //     // });
            //     $rootScope.$broadcast("deleteUser", {
            //         message: 'GOOOO'
            //     });
            // };
            //
            // $scope.$on("deleteUser", function (event, args) {
            //     //event.stopPropagation(); // останавливаем распространение события
            //     // $scope.info = args.message;
            //     // $scope.delete(args);
            //     $scope.info = args.message;
            // });

            //console.log('EEEE:');
            //io.socket.on('User', function (event){
            //    console.log(event);
            //    // => see below
            //});
            //
            //io.socket.on('user', function (event) {
            //    console.log('EVA:');
            //    console.log(event);
            //});
            ////io.socket.on('message', function (data){
            ////    console.log(data.greeting);
            ////});
            //
            //io.socket.on('user', function (event) {
            //    console.log('DEPAR:');
            //    console.log(event);
            //});
            //
            //
            //
            //
            //

            //console.log( $stateParams.userId);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            $scope.refresh = function () {
                var item = $scope.item = Positions.get({id: $stateParams.positionId}, function (positions) {
                    $scope.positions = positions;

                    console.log(positions);

                    item.getBirthday();
                    item.getDateInWork();
                    item.getFiredDate();


                }, function (err) {
                    if (err) console.log(err.message);
                });
            };
            $scope.delete = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    $scope.refresh();
                    console.log('SUCCESS: OK!');
                    item.ok();
                }, function (err) {
                    console.log('ERROR: ' + err.status);
                    console.log(err);
                    item.er();
                })
            };

            $scope.saveEdit = function (item) {
                //console.log('OBJECT DEPART:');
                //console.log(item);

                if (angular.isDefined(item.id)) {
                    //item.$update(item);
                    item.$update(item, function (success) {
                            $scope.refresh();
                            console.log('SUCCESS: OK!');
                            item.ok();
                        },
                        function (err) {

                            console.log('ERROR: ' + err.status);
                            console.log(err);
                            item.er();
                        }
                    );
                } else {
                    item.$save(item,function (success) {
                        $scope.refresh();
                        console.log('SUCCESS: OK!');
                        item.ok();
                    },
                    function (err) {

                        console.log('ERROR: ' + err.status);
                        console.log(err);
                        item.er();
                    });
                }
            };

            //$scope.saveEdit = function (item) {
            //    $scope.item.subdivision = [];
            //    //$scope.item.removeDivision = '589b22e8789b83a241b56056';
            //    if (angular.isDefined(item.id)) {
            //        for (var i = 0; i < item.positions.length; i++) {
            //            $scope.item.subdivision.push(item.positions[i].id);
            //        }
            //        item.$update(item, function (success) {
            //                console.log('SUCCESS: OK!');
            //                item.ok();
            //            },
            //            function (err) {
            //                console.log('ERROR: ' + err.status);
            //                console.log(err);
            //                item.er();
            //            }
            //        );
            //    } else {
            //        if (angular.isDefined(item) &&
            //            angular.isDefined(item.firstName) &&
            //            angular.isDefined(item.lastName) &&
            //            angular.isDefined(item.patronymicName) &&
            //            angular.isDefined(item.login) &&
            //            angular.isDefined(item.fired) &&
            //            angular.isDefined(item.birthday) &&
            //            angular.isDefined(item.email)
            //        ) {
            //            item.$save(item)
            //        }
            //    }
            //};

           

           
            
            $scope.addContact = function () {
                if (angular.isArray(item.contacts)) {
                    item.contacts.push({type: "телефон", value: ""});
                } else {
                    item.contacts = [{type: "телефон", value: ""}];
                }
            };
            $scope.removeContact = function (contact) {
                var contacts = $scope.item.contacts;
                for (var i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };
           


            //$scope.removeDepartment = function (department) {
            //    $scope.item.removeDivision = [];
            //    $scope.removeDepart(department);
            //    var subdivision = $scope.item.subdivision;
            //    for (var i = 0, ii = subdivision.length; i < ii; i++) {
            //        if (department.id === subdivision[i]) {
            //            subdivision.splice(i, 1);
            //        }
            //    }
            //    $scope.item.removeDivision = $scope.item.subdivision;
            //};

            $scope.isCancelDisabled = function () {
                return angular.equals(master, $scope.form);
            };

            $scope.isSaveDisabled = function () {
                return $scope.myForm.$invalid || angular.equals(item, $scope.form);
            };


            var original = angular.copy($scope.item);
            $scope.revert = function () {
                $scope.item = angular.copy(original);
                $scope.passwordRepeat = $scope.item.password;
                $scope.userInfoForm.$setPristine();
            };
            $scope.canRevert = function () {
                return !angular.equals($scope.item, original);
            };

            $scope.refresh();
        }]);
