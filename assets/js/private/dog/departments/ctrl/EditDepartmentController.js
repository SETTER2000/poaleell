angular.module('DepartmentModule')
    .controller('EditDepartmentController', ['$scope', '$http', 'toastr', '$state', 'moment', 'Departments', '$stateParams', 'CONF_MODULE_DEPARTMENT',
        function ($scope, $http, toastr, $state, moment, Departments, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            $scope.edit = $state.includes('home.admin.kennels.edit');
            //if (!$scope.me.admin) $location.path('/');
            // $state.transitionTo('admin.users.show.id');
            $scope.closeInfo = 0; // скрыть панель информации
           // $scope.inlinePanel = 0; // растянуть панель редактирования
            moment.locale('ru');

            $scope.nameArea = 'Наименование питомника';
            $scope.registerArea = 'Номер питомника';
            $scope.rightNameArea = 'Наименование питомника писать';
            $scope.dateCreateArea = 'Дата регистрации';
            $scope.suiteArea = 'Сайт';
            $scope.mode=true;
            // $scope.message = 'false';
            //
            // $scope.onChange = function(cbState) {
            //     $scope.message = cbState;
            // };
            var info = {
                changed: 'Изменения сохранены!',
                passChange: 'Пароль обновлён!',
                error: 'Ошибка!',
                requiredJpg: 'Расширение файла должно быть jpg.',
                isSimilar: 'Есть похожий: ',
                ok: 'OK!',
                objectDelete: 'Объект удалён.',
                newOk: 'Объект создан.',
                passDefault: '111111',
                redirectSelf: 'home.admin.catalogs',
                ru: 'ru',
                dateFormat: "d.m.Y",
                minDate: "01-01-1990",
                maxDate: "31-12-2020",

            };
            let reversValue = function (item) {
                item.dateCreate = ( item.dateCreate) ? new Date(moment(item.dateCreate, ['DD.MM.YYYY']).format('YYYY-MM-DD')) : null;

                return item;
            };
            $scope.dateOpts = {
                locale: info.ru,
                //mode: "range",
                dateFormat: info.dateFormat,
                minDate: info.minDate,
                maxDate: 'today'
                //defaultDate: 'today'
            };


            $scope.removeDateCreate = function (item) {
                item.dateCreate = null;
                item = reversValue(item);
                if (angular.isDefined(item.id)) {
                    item.$update(item, function (success) {
                            toastr.success(info.changed);
                            $scope.refresh();
                        },
                        function (err) {
                            //console.log('ERR: ', err);
                            toastr.error(err.data.invalidAttributes, info.error + ' 7006!');
                        });
                }
            };


            $scope.refresh = function () {
                //if(!angular.isDefined($stateParams.depId)) return;
                let item = $scope.item = Departments.get({id: $stateParams.depId}, function (kennels) {

                    $scope.kennels = kennels;
                    item.getDateCreate();
                    console.log('kennels:', kennels);
                }, function (err) {
                    if (err) console.log(err.message);
                });
            };
            $scope.saveEdit = function (item) {
                if (angular.isDefined(item.id)) {
                    //console.log('FFF: ', $scope.item.children[0].id);


                    //Departments.get({id: $scope.item.children[0].id}, function (dep) {
                    //    console.log('DEPPPARTMEN', dep);
                    //   item.childrenObj.push(dep);
                    //
                    //    console.log('ITEM: ' , item);
                    //
                    //
                    //}, function (err) {
                    //    if (err) console.log(err.message);
                    //});

                    item = reversValue(item);
                    item.$update(item.id, function (success) {
                            console.log('UPDATE ITEM: ', item);
                            toastr.success('Данные обновлены!');
                            $scope.refresh();
                        },
                        function (err) {
                            toastr.error(err.data, 'Ошибка 1 EditDepartmentController!');
                        }
                    );


                } else {
                    //$scope.refresh();
                    item.$save(item.id, function (success) {
                            console.log('success', success.id);
                            toastr.success('Объект создан.', 'OK! ');
                            $state.go('home.admin.kennel', {depId: success.id});
                        },
                        function (err) {
                            toastr.error(err.data, 'Ошибка! EditDepartmentController!');
                        });
                    //item.$save(item.id, function (success) {
                    //    console.log('SAVE ITEM: ',item);
                    //    toastr.success('Новый отдел создан.');
                    //    // /admin/user/
                    //    //$location.path('/profile') ;
                    //    $state.go('home.admin.department', {depId: success.id});
                    //}, function (err) {
                    //    toastr.error(err.data,'Ошибка! EditDepartmentController!');
                    //});

                }
            };

            //$scope.addContact = function () {
            //    if (angular.isArray($scope.item.owner)) {
            //        $scope.item.owner.push({type: "телефон", value: ""});
            //    } else {
            //        $scope.item.owner = [{type: "телефон", value: ""}];
            //    }
            //};
            $scope.addSubdivision = function () {
                if (angular.isArray($scope.item.children)) {
                    $scope.item.children.push({});
                } else {
                    $scope.item.children = [{}];
                }
            };
            $scope.removeSubdivision = function (department) {
                for (var i = 0, ii = $scope.item.children.length; i < ii; i++) {
                    if ($scope.item.children[i].id === department.id) {
                        $scope.item.children.splice(i, 1);
                        return;
                    }
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


            $scope.delete = function (item) {
                item.$delete(item, function (success) {
                    toastr.success(info.objectDelete,info.ok);
                    $state.go('home.admin.kennels');
                }, function (err) {
                    toastr.error(err, 'Ошибка 3 EditDepartmentController!');
                })
            };
            /**
             *  Конструктор хлебных крошек
             * @constructor
             */
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

            breadcrumb.set('Home', 'home');
            if ($scope.me.admin) breadcrumb.set('Admin', 'home.admin');
            breadcrumb.set('Kennels', 'home.admin.kennels');
            breadcrumb.set('Edit', 'home.admin.kennels.edit' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
