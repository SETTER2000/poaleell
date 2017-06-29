angular.module('DepartmentModule')
    .controller('EditDepartmentController', ['$scope', '$http', 'toastr', '$state', 'Departments', '$stateParams', 'CONF_MODULE_DEPARTMENT',
        function ($scope, $http,toastr, $state, Departments, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            $scope.edit = $state.includes('home.admin.departments.edit');
            //if (!$scope.me.admin) $location.path('/');
            // $state.transitionTo('admin.users.show.id');
            // $scope.refresh = function () {
            // return console.log($stateParams.id);
            $scope.refresh = function () {
                var item = $scope.item = Departments.get({id: $stateParams.depId}, function (departments) {
                    $scope.departments = departments;
                    // кол-во пользователей
                    //console.log($scope.departments.length);
                    //console.log($scope.departments);
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
                    item.$update(item, function (success) {
                            toastr.success('Данные обновлены!');
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err,'Ошибка 1 EditDepartmentController!');
                        }
                    );
                } else {
                    item.$save(item, function (success) {
                        toastr.success('Новый отдел создан.');
                        // /admin/user/
                        //$location.path('/profile') ;
                        $state.go('home.admin.department', {depId: success.id});
                    }, function (err) {
                        toastr.error(err.data,'Ошибка! EditDepartmentController!');
                    });

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
                item.$delete(item, function (success) {
                    toastr.success('Объект удалён.','OK! ');
                    $state.go('home.admin.departments');
                }, function (err) {
                    toastr.error(err,'Ошибка 3 EditDepartmentController!');
                })
            };
            $scope.refresh();
        }]);
