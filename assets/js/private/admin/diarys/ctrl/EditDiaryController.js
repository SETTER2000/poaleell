angular.module('DiaryModule')
    .controller('EditDiaryController', ['$scope', '$state','toastr', 'Diarys', '$stateParams', '$rootScope',
        function ($scope, $state,toastr, Diarys, $stateParams, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            $scope.editObj = $state.includes('home.admin.diarys.edit');
            //if(!$scope.me.admin) $location.path('/') ;
            $scope.closeInfo = 0; // скрыть панель информации
            // $scope.inlinePanel = 0; // растянуть панель редактирования
            console.log('$STATE DIARYS: ', $state);
console.log('$state.params.catalogId:',$state.params.catalogId);

            $scope.refresh = function () {
                let item = $scope.item = Diarys.get({id: $state.params.catalogId}, function (diarys) {
                    $scope.diarys = diarys;
                    console.loc('DIARYS ITEM:',diarys);
                    // item.getBirthday();
                    // item.getDateInWork();
                    // item.getFiredDate();
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };

            $scope.delete = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    toastr.success('Объект удалён.','OK! ');
                    $state.go('home.admin.diarys');
                }, function (err) {
                    toastr.error(err,'Ошибка 3 EditDiaryController!');
                })
            };

            $scope.saveEdit = function (item) {
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success('Данные обновлены!');
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.message,'Ошибка!');
                        }
                    );
                } else {
                    $scope.refresh();
                    item.$save(item,function (success) {
                            toastr.success('Новая должность создана.');
                            $state.go('home.admin.diary', {diaryId: success.id});
                    },
                    function (err) {
                        toastr.error(err.data,'Ошибка 101!');
                        //toastr.error(err.data.originalError.errmsg,'Ошибка! EditFurloughController!');
                    });
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

            // конструктор хлебных крошек
            function BreadCrumb() {
                var name;
                var path;
                this.arr = [];
            }

            BreadCrumb.prototype.add = function () {
                this.arr.push({name: this.name, path: this.path});
            };

            BreadCrumb.prototype.set = function (name, path) {
                this.name = name;
                this.path = path;
                this.add();
            };
            BreadCrumb.prototype.getAll = function () {
                return this.arr;
            };

            var breadcrumb = new BreadCrumb();
            breadcrumb.set('Home', '/');
            breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Diarys', 'home.admin.diarys');
            breadcrumb.set('Edit', 'home.admin.diarys' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            $scope.refresh();
        }]);
