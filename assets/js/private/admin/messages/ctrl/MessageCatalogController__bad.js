angular.module('MessageModule')
    .controller('MessageCatalogController', ['$scope', '$state', 'toastr', 'moment', 'Catalogs', '$stateParams',
        function ($scope, $state, toastr, moment, Catalogs, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            $scope.newMessage = {
                email: $scope.me.email,
                maxLength: 250,
                clear: function () { //Очищает объект
                    this.message = '';
                }
            };
            // if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            //$scope.message = moment({start:'1995-12-25',end:'2000-10-10'}).year(2009).hours(0).minutes(0).seconds(0);
            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Catalogs.getFullName()
             */
            $scope.debug = false;

            // $scope.items = [1,2,3,4,5];
            $scope.selected = [1];
            $scope.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };

            $scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };

            $scope.isIndeterminate = function() {
                return ($scope.selected.length !== 0 &&
                    $scope.selected.length !== $scope.item.messages.length);
            };

            $scope.isChecked = function() {
                return $scope.selected.length === $scope.item.messages.length;
            };

            $scope.toggleAll = function() {
                if ($scope.selected.length === $scope.item.messages.length) {
                    $scope.selected = [];
                } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                    $scope.selected = $scope.item.messages.slice(0);
                }
            };


            $scope.refresh = function () {
                $scope.item = Catalogs.get({id: $stateParams.catalogId}, function (catalogs) {
                    console.log('catalogs', catalogs);
                    $scope.catalogs = catalogs;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 88900! ' + err.data.message);
                });
            };
            $scope.wind = false;
            $scope.openWindow = function () {
                // toastr.success('OK');
                return $scope.wind = (!$scope.wind);
            };
            $scope.saveEdit = function (mess) {
                if (angular.isDefined(mess.email) && angular.isString(mess.email) &&
                    angular.isDefined(mess.message) && mess.message.length) {

                    $scope.item.$update($scope.item, function (success) {
                            toastr.success( mess.message + ' ' + mess.email, 'Ok! Сообщение отправлено.');
                            // $state.go($scope.item.getShowUrl($scope.item.id, me), {catalogId: success.id});
                        },
                        function (err) {
                            toastr.error(err.data, 'Ошибка!');
                            // if(err.data['originalError'].code == 11000) return toastr.error('Объект уже существует.',  'Ошибка '+err.data['originalError'].code+'!');

                        });



                    // $scope.wind = false;
                }
            };


            $scope.delete=function (selected) {
                console.log('selected',selected);
              toastr.success( selected,'Ok!');
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
            breadcrumb.set('Catalog', 'home.admin.catalogs');
            breadcrumb.set('Message', 'home.admin.catalogs.message' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
