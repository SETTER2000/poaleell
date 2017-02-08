angular.module('UserModule')
    .controller('EditController', ['$scope', '$state', 'Users', '$stateParams', '$rootScope',
        function ($scope, $state, Users, $stateParams, $rootScope) {
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

                console.log(users);

                item.getBirthday();
                item.getDateInWork();
                item.getFiredDate();


            }, function (err) {
                if (err) console.log(err.message);
            });

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
                $scope.item.subdivision = [];
                //$scope.item.removeDivision = '589b22e8789b83a241b56056';
                if (angular.isDefined(item.id)) {
                    for (var i = 0; i < item.departments.length; i++) {
                        $scope.item.subdivision.push(item.departments[i].id);
                    }
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
                    if (angular.isDefined(item) &&
                        angular.isDefined(item.firstName) &&
                        angular.isDefined(item.lastName) &&
                        angular.isDefined(item.patronymicName) &&
                        angular.isDefined(item.login) &&
                        angular.isDefined(item.fired) &&
                        angular.isDefined(item.birthday) &&
                        angular.isDefined(item.email)
                    ) {
                        item.$save(item)
                    }
                }
            };

            //$scope.state = /^\w\w$/;
            //$scope.zip = /^\d\d\d\d\d$/;
            $scope.addDepartment = function () {
                if (angular.isArray(item.departments)) {
                    item.departments.push({});
                } else {
                    item.departments = [{}];
                }
            };
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
            var t = [];
            $scope.removeDepartment = function (department) {
                t.push(department.id);
                var departments = $scope.item.departments;
                for (var i = 0, ii = departments.length; i < ii; i++) {
                    if (department === departments[i]) {
                        departments.splice(i, 1);
                    }
                }
                $scope.item.removeDivision = t;
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

            // $scope.refresh();
        }]);
