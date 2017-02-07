angular.module('UserModule')
    .controller('EditController', ['$scope',  '$state', 'Users', '$stateParams', '$rootScope',
        function ($scope,  $state, Users, $stateParams,$rootScope) {
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
            //console.log( $stateParams.userId);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                $scope.users = users;
                // кол-во пользователей
                console.log(users);
                //if (users.birthday) {
                //    item.birthday = new Date(users.birthday);
                //}
                item.getBirthday();
                item.getDateInWork();
                item.getFiredDate();
                //console.log(item);
                // console.log('USSS1: ' +  $scope.newBirthday);
                // console.log('USSS2: ' + $scope.item.dt());
                // // $scope.item.birthday = $scope.newBirthday;
                // console.log('USSS3: ' + item.birthday);
                // console.log('USSS4: ' + $scope.item.birthday);

            }, function (err) {
                if (err) console.log(err.message);
            });

            //$scope.newBirthday = item.birthday;
            //$scope.newFiredDate = item.dateInWork;
            //$scope.newDateInWork = item.firedDate;
            //
            //console.log($scope.newBirthday  );
            //console.log($scope.newFiredDate );
            //console.log($scope.newDateInWork);

            // $scope.deleteEdit = function (item) {
            //     // console.log(item);
            //     item.$delete(item, function (success) {
            //         console.log(success);
            //         $scope.refresh();
            //         // $scope.items.splice($scope.items.indexOf(item), 1);
            //     }, function (err) {
            //         console.log(err);
            //         alert(err);
            //     })
            // };

            $scope.delete2 = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    console.log(success);
                    alert('OK! Объект удалён.');
                 $scope.redirect('/admin/users');
                    // $scope.items.splice($scope.items.indexOf(item), 1);
                }, function (err) {
                    console.log(err);
                    // alert();
                })
            };
            $scope.saveEdit = function (item) {
                //item.birthday   =  $scope.newBirthday;
                //item.dateInWork =  $scope.newDateInWork;
                //item.firedDate  =  $scope.newFiredDate;

                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
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
                    //$scope.item.subdivision= $scope.department;
                    item.$save(item)
                }
            };

            //$scope.state = /^\w\w$/;
            //$scope.zip = /^\d\d\d\d\d$/;
            $scope.addDepartment = function () {
                if(angular.isArray(item.departments)){
                    item.departments.push({});
                } else{
                    item.departments = [{}];
                }
                // item.contacts = [{type: "телефон", value: ""}];
                // item.contacts.push({type: "телефон", value: ""});
            };
            $scope.addContact = function () {
                if(angular.isArray(item.contacts)){
                    item.contacts.push({type: "телефон", value: ""});
                } else{
                    item.contacts = [{type: "телефон", value: ""}]; 
                } 
                // item.contacts = [{type: "телефон", value: ""}];
                // item.contacts.push({type: "телефон", value: ""});
            };
            $scope.removeContact = function (contact) {
                var contacts = $scope.item.contacts;
                for (var i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };
            $scope.removeDepartment = function (department) {
                //var contacts = $scope.item.contacts;
                //for (var i = 0, ii = contacts.length; i < ii; i++) {
                //    if (contact === contacts[i]) {
                //        contacts.splice(i, 1);
                //    }
                //}
            };
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

            // $scope.refresh();
        }]);
