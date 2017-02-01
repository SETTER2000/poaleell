angular.module('UserModule')
    .controller('EditController', ['$scope', '$http', '$state', 'Users', '$stateParams', 'CONF_MODULE',
        function ($scope, $http, $state, Users, $stateParams) {
            // $state.transitionTo('admin.users.show.id');
            // $scope.refresh = function () {
            // return console.log($stateParams.id);
            //var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
            var item = $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                $scope.users = users;
                // кол-во пользователей

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
                    item.$save(item)
                }
            };

            $scope.state = /^\w\w$/;
            $scope.zip = /^\d\d\d\d\d$/;

            $scope.addContact = function () {
                item.contacts.push({type: "", value: ""});
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
            // $scope.refresh();
        }]);
