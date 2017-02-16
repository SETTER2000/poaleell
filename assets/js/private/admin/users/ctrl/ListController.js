(function (angular) {
    'use strict';
    angular.module('UserModule')
        .controller('ListController', ['$scope', "$rootScope", '$state', 'Users', '$window', function ($scope, $rootScope, $state, Users) {
            /**
             * Поле сортировки объекта по умолчанию.
             * @type {string}
             */
            $scope.sort = 'lastName';
            $scope.param = 'lastName';
            $scope.fieldName = 'Внутренний телефон';
            $scope.charText = '';
            $scope.searchText = '';
            $scope.page_number = 0;


            $scope.styleObj = {
                color: false,
                border: false,
                size: false
            };

            /**
             * Кол-во строк, по умолчанию, выбраных в объект из бд
             */
            $scope.limitAllQuery = 1000;

            $scope.limit = 10;
            // // обработка события deleteUser на текущем scope
            // $scope.$on("deleteUser", function (event, args) {
            //     //event.stopPropagation(); // останавливаем распространение события
            //     // $scope.info = args.message;
            //     // $scope.delete(args);
            //     $scope.info = args.message;
            // });
            // $scope.deleteEdit = function () {
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
            //$scope.data = {counter: 1};
            //
            //$scope.$on('foo', function (event, args) {
            //    $scope.data = args;
            //});
            //
            //$scope.increment = function (val) {
            //    $scope.data.counter += val;
            //};
            //$rootScope.$broadcast('foo',$scope.data);

            //$scope.$emit("countUser", $scope.data);

            //$scope.$watch("data.counter", function (newValue, oldValue) {
            //    var data = {counter: 0};
            //    console.log("Старое значение - " + oldValue + ", новое значение - " + newValue);
            //    data.counter = newValue;
            //    console.log(data);
            //    $rootScope.$broadcast('foo2', data);
            //});

            console.log($scope.$$watchers);
            //$scope.$watch("items.length", function (newValue, oldValue) {
            //    console.log("Старое значение - " + oldValue + ", новое значение - " + newValue);
            //});
            //console.log('COUNTER: ');
            //console.log($scope.data.counter );

            console.log(Users);
            console.log('STATE: ');
            //console.log( $state.get());
            //console.log($state);
            //console.log($state.get('home.admin.user'));
            //console.log($state.$current.path);
            //console.log('NAVIGABLE-N: ' + $state.$current.navigable);
            //console.log('NAVIGABLE-P: ' + $state.$current.path);
            $scope.refresh = function () {
                $scope.itemsAll = Users.query(
                    {
                        limit: $scope.limitAllQuery,
                        sort: $scope.sort
                    },
                    function (usersAll) {
                        $scope.usersAll = usersAll;
                        console.log($scope.usersAll);
                    });
                /**
                 * При обращении к службе $resource возвращается сгенерированный конструктор,
                 * дополненный методами для взаимодействия с конечной точкой
                 * RESTful: query, get, save и delete.
                 */

                $scope.items = Users.query(
                    {
                        //limit: $scope.limit,
                        sort: $scope.sort,
                        skip: (($scope.page_number - 1) * $scope.limit),
                        limit: $scope.limit
                    },
                    function (users) {
                        $scope.users = users;
                        // кол-во пользователей
                        // console.log($scope.users.length);
                        console.log($scope.users);
                    });
            };


            $scope.see = function () {
                if ($scope.charText.length > 0) {
                    return true;
                }

                if ($scope.searchText.length > 0) {
                    return true;
                }
                return false;
            };

            $scope.getCharText = function (ch) {
                $scope.charText = ch;
            };

            $scope.getPage = function (num) {
                $scope.page_number = num;
                $scope.refresh();
            };

            $scope.getCountRowsPage = function (num) {
                $scope.limit = num;
                $scope.refresh();
            };


            $scope.delete = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    console.log(success);
                    $scope.refresh();
                    // $scope.items.splice($scope.items.indexOf(item), 1);
                }, function (err) {
                    console.log(err);
                    // alert();
                })
            };

            //$scope.showBlock = function () {
            //    if (($scope.searchText.length > 0) | ($scope.char.length > 0)) {
            //        $scope.see = true;
            //    }
            //    $scope.see = false;
            //};
            $scope.propertyName = 'lastName';
            $scope.reverse = false;
            // $scope.friends = friends;

            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };


            $scope.msd = ['settings', 'home', 'options', 'other'];
            $scope.selectionMode = $scope.msd[0];


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
            breadcrumb.set('Admin', '/admin');
            breadcrumb.set('Users', '/admin/' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;


            // $scope.resetForm = function () {
            //     return $scope.item = {};
            // };


            $scope.refresh();
        }]);
})(window.angular);