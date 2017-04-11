angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', 'toastr', '$state', 'Users', 'Positions', 'Departments', '$stateParams', '$rootScope',
        function ($scope, $http, toastr, $state, Users, Positions, Departments, $stateParams, $rootScope) {
            $scope.close = 1;
            $scope.loginAdmin = false;
            //console.log('window.SAILS_LOCALS.me.email');
            //console.log(SAILS_LOCALS.me.email);
            //var emAdmin = SAILS_LOCALS.me.email;
            $scope.me = window.SAILS_LOCALS.me;
            var t = [];
            //if (emAdmin == 'apetrov@landata.ru') {
            //    $scope.loginAdmin = true;
            //}

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

            // console.log('EEEE:');
            // io.socket.on('User', function (event){
            //     console.log(event);
            //     // => see below
            // });
            //
            // io.socket.on('user', function (event) {
            //     console.log('EVA:');
            //     console.log(event);
            // });
            // //io.socket.on('message', function (data){
            // //    console.log(data.greeting);
            // //});
            //
            // io.socket.on('user', function (event) {
            //     console.log('DEPAR:');
            //     console.log(event);
            // });
            //
            //


            // $scope.items = Departments.query({limit: 300}, function (posts) {
            //     $scope.posts = posts;
            //     console.log(posts);
            // }, function (err) {
            //     if (err) console.log(err.message);
            // });

            console.log('STATE2: ');
            console.log($state);
            console.log($state.$current.url.source);

            $scope.closed = function () {
                if ($scope.close) {
                    $scope.close = false;
                }
                else {
                    $scope.close = true;
                }
            };
            //console.log( $stateParams.userId);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            $scope.refresh = function () {
                var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                    $scope.users = users;
                    console.log(users);
                    item.getBirthday();
                    item.getDateInWork();
                    item.getFiredDate();
                }
                //    function (err) {
                //
                //    toastr.error(err, 'Ошибка! User.EditController.refresh ');
                //}
                );

                console.log($scope.item);
                console.log($scope.users);
            };

            $scope.delete2 = function (item) {
                item.$delete(item, function (success) {
                    toastr.success('Объект удалён.', 'OK! ');
                    $state.go('home.admin.users');
                    // $location.path("/table");
                    // $scope.$apply(function() { $location.path("/admin/users"); });
                    // $scope.refresh();
                }, function (err) {
                    console.log(err);
                    toastr.error(err, 'Ошибка122! ');
                })
            };

            $scope.editProfile = {
                properties: {},
                errorMsg: '',
                error: false,
                saving: false,
                loading: false,
                changePassword: {}
            };

            $scope.changeMyPassword = function () {
                $http.put('/user/changePassword', {
                        id: $scope.item.id,
                        password: $scope.editProfile.properties.password
                    })
                    .then(function onSuccess(sailsResponse) {
                        console.log('sailsResponse: ');
                        console.log(sailsResponse);
                        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
                        // window.location = '#/profile/' + $scope.editProfile.properties.id;
                        //window.location = '/profile';
                        toastr.success('Пароль обновлён!');
                        $scope.editProfile.loading = false;
                    })
                    .catch(function onError(sailsResponse) {
                        // console.log('sailsresponse: ', sailsResponse)
                        // Otherwise, display generic error if the error is unrecognized.
                        $scope.editProfile.changePassword.errorMsg = $scope.unexpected + (sailsResponse.data || sailsResponse.status);
                        toastr.error($scope.editProfile.changePassword.errorMsg);
                    })
                    .finally(function eitherWay() {
                        $scope.editProfile.loading = false;
                    });
            };

            $scope.saveEdit = function (item) {
                $scope.item.subdivision = [];
                $scope.item.position = [];
                //$scope.item.removeDivision = '589b22e8789b83a241b56056';
                if (angular.isDefined(item.id)) {
                    //if (angular.isDefined(item.departments)) {
                        for (var i = 0; i < item.departments.length; i++) {
                            $scope.item.subdivision.push(item.departments[i].id);
                        }
                    //}

                    //if (angular.isDefined(item.positions)) {
                        for (var z = 0; z < item.positions.length; z++) {
                            $scope.item.position.push(item.positions[z].id);
                        }
                    //}
                    console.log(item);
                    item.$update(item, function (success) {
                            toastr.success('Изменения сохранены!');
                            $scope.refresh();
                            //console.log('SUCCESS: OK!');
                            //item.ok();
                        },
                        function (err) {
                            console.log(err);
                            toastr.error(err, 'Ошибка33!');
                            //console.log('ERROR: ' + err.status);

                            //item.er();
                        }
                    );
                } else {
                    if (angular.isDefined(item) &&
                        angular.isDefined(item.firstName) &&
                        angular.isDefined(item.lastName) &&
                        angular.isDefined(item.patronymicName)  /*  &&
                     angular.isDefined(item.login) &&
                     angular.isDefined(item.fired) &&
                     angular.isDefined(item.birthday) &&
                     angular.isDefined(item.email)*/
                    ) {
                        item.$save(item, function (success) {
                                toastr.success('Пользователь создан!');
                                //$location.path('/profile') ;
                                location.reload();

                                //$scope.refresh();
                            },
                            function (err) {
                                toastr.error(err, 'Ошибка44!');
                                //console.log('ERROR: ' + err.status);
                                //console.log(err);
                                //item.er();
                            });

                    }
                }
            };

            //$scope.state = /^\w\w$/;
            //$scope.zip = /^\d\d\d\d\d$/;
            $scope.addDepartment = function () {
                if (angular.isArray($scope.item.departments)) {
                    $scope.item.departments.push({});
                } else {
                    $scope.item.departments = [{}];
                }
            };

            $scope.addContact = function () {
                if (angular.isArray($scope.item.contacts)) {
                    $scope.item.contacts.push({type: "телефон", value: ""});
                } else {
                    $scope.item.contacts = [{type: "телефон", value: ""}];
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

            $scope.removeDepartment = function (department) {
                if (angular.isDefined(department) &&
                    angular.isDefined(department.id)) {
                    t.push(department.id);
                }

                var departments = $scope.item.departments;
                for (var i = 0, ii = departments.length; i < ii; i++) {
                    if (department === departments[i]) {
                        departments.splice(i, 1);
                    }
                }
                $scope.item.removeDivision = t;
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

            $scope.refresh();
        }]);
