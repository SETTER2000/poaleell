angular.module('ReactionModule')
    .controller('EditReactionController', ['$scope', '$state', 'toastr', 'Reactions', '$stateParams', '$rootScope',
        function ($scope, $state, toastr, Reactions, $stateParams, $rootScope) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            $scope.editObj = $state.includes('home.admin.reactions.edit');
            //if(!$scope.me.admin) $location.path('/') ;
            $scope.namePage = 'Новый тест';
            $scope.closeInfo = 0; // скрыть панель информации
            // $scope.inlinePanel = 0; // растянуть панель редактирования
            $scope.refresh = function () {
                var item = $scope.item = Reactions.get({id: $stateParams.reactionId}, function (reactions) {
                    $scope.reactions = reactions;
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
                    toastr.success('Объект удалён.', 'OK! ');
                    $state.go('home.admin.reactions');
                }, function (err) {
                    toastr.error(err, 'Ошибка 3 EditTitleController!');
                })
            };

            $scope.saveEdit = function (item) {
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success('Данные обновлены!');
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.message, 'Ошибка!');
                        }
                    );
                } else {
                    $scope.refresh();
                    item.$save(item, function (success) {
                            toastr.success('Новая должность создана.');
                            $state.go('home.admin.reaction', {reactionId: success.id});
                        },
                        function (err) {
                            toastr.error(err.data, 'Ошибка 101!');
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
            breadcrumb.set('Reactions', 'home.admin.reactions');
            breadcrumb.set('Edit', 'home.admin.reactions' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            $scope.refresh();
        }]);
