angular.module('AttendanceModule')
    .controller('EditAttendanceModule', ['$scope', '$http', '$state', 'Attendances', '$stateParams', 'CONF_MODULE',
        function ($scope, $http, $state, Attendances, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            
            $scope.refresh = function () {
                var item = $scope.item = Attendances.get(
                    {id: $stateParams.attendanceId}, function (attendances) {
                    $scope.attendances = attendances;
                    // кол-во пользователей
                    //console.log($scope.attendances.length);
                    //console.log($scope.attendances);
                    // console.log('USSS1: ' +  $scope.newBirthday);
                    // console.log('USSS2: ' + $scope.item.dt());
                    // // $scope.item.birthday = $scope.newBirthday;
                    // console.log('USSS3: ' + item.birthday);
                    // console.log('USSS4: ' + $scope.item.birthday);

                }, function (err) {
                    if (err) console.log(err.message);
                });
            };
                $scope.saveEdit = function (item) {
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
                        $scope.refresh();
                        item.$save(item)
                    }
                };
            
            // $scope.item.contacts = [{type:'phone', value:'1(234) 555-1212'}];

            // $scope.state = /^\w\w$/;
            // $scope.zip = /^\d\d\d\d\d$/;

            $scope.addContact = function () {
                item.contacts.push({type: 'телефон', value: ''});
            };
            $scope.removeContact = function (contact) {
                var contacts = $scope.item.contacts;
                for (var i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };
            $scope.isCancelDisabled = function () {
                return angular.equals(master, $scope.form);
            };

            $scope.isSaveDisabled = function () {
                return $scope.myForm.$invalid || angular.equals(item, $scope.form);
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
            $scope.refresh();
        }]);
