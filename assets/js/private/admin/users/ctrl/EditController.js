angular.module('UserModule')
    .controller('EditController', ['$scope', '$http','$state', 'Users', '$stateParams', 'CONF_MODULE',
        function ($scope, $http,$state, Users, $stateParams) {
            // $state.transitionTo('admin.users.show.id');
           // $scope.refresh = function () {
           // return console.log($stateParams.id);
               var item =   $scope.item = Users.get({id: $stateParams.userId}, function (users) {
                    $scope.users = users;
                    // кол-во пользователей
                    console.log($scope.users.length);
                    console.log($scope.users);
                }, function (err) {
                    if (err) console.log(err.message);
                });
            // };

            // сохранение изменений
            $scope.saveEdit = function (item) {
                console.log(item);
                if (angular.isDefined(item.id)) {
                    //item.$update(item);
                    item.$update(item, function (success) {
                            console.log('SUCCESS: OK!');
                            item.ok();
                        },
                        function (err) {
                            console.log('ERROR: ' + err.status);
                            console.log(err);
                        }
                    );
                } else {
                    item.$save(item)
                }
            };

            // $scope.item.contacts = [{type:'phone', value:'1(234) 555-1212'}];

            $scope.state = /^\w\w$/;
            $scope.zip = /^\d\d\d\d\d$/;
            
            $scope.addContact = function() {
                item.contacts.push({type:'телефон', value:''});
            };
            $scope.removeContact = function(contact) {
                var contacts = $scope.item.contacts;
                for (var i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };
            $scope.isCancelDisabled = function() {
                return angular.equals(master, $scope.form);
            };

            $scope.isSaveDisabled = function() {
                return $scope.myForm.$invalid || angular.equals(item, $scope.form);
            };
            // $scope.refresh();
        }]);
