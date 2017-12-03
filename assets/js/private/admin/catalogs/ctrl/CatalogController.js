angular.module('CatalogModule')
    .controller('CatalogController', ['$scope', '$location','$state', '$http', 'toastr', 'toastrConfig',"$rootScope", 'moment', 'Catalogs', '$stateParams',
        function ($scope, $location, $state,$http, toastr,toastrConfig,$rootScope, moment, Catalogs, $stateParams) {
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
            $scope.debug = true;

            /**
             * Очищает объект
             */



            $scope.refresh = function () {
                $scope.item = Catalogs.get({id: $stateParams.catalogId}, function (catalogs) {
                    console.log('catalogs', catalogs);
                    $scope.catalogs = catalogs;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 889! ' + err.data.message);
                });
            };
            $scope.wind = false;
            $scope.handshake = function () {
                $rootScope.$broadcast('newDogMessage',{
                    item:$scope.item,
                });
                return $scope.wind = (!$scope.wind);
            };


            // слушаем событие в нужном нам $scope
            $scope.$on('newData', function (event, data) {
                console.log(data); // Данные, которые нам прислали
                return $scope.wind = data.wind;
            });


            $scope.saveEdit = function (mess) {
                if (angular.isDefined(mess.email) && angular.isString(mess.email) &&
                    angular.isDefined(mess.message) && mess.message.length) {

                    mess.user = {
                        login: $scope.me.login,
                        fullName: $scope.me.fullName,
                        lastName: $scope.me.lastName,
                        contacts:  $scope.me.contacts,
                        avatarUrl:  $scope.me.avatarUrl,
                        id: $scope.me.id,
                    };
                    $scope.item.messages.push(mess);
                    $scope.item.$update($scope.item, function (success) {
                            toastr.success( mess.message + ' ' + mess.email, 'Ok! Сообщение отправлено555.');
                            // $state.go($scope.item.getShowUrl($scope.item.id, me), {catalogId: success.id});
                        },
                        function (err) {
                            toastr.error(err.data, 'Ошибка!');
                            // if(err.data['originalError'].code == 11000) return toastr.error('Объект уже существует.',  'Ошибка '+err.data['originalError'].code+'!');

                        });



                    $scope.wind = false;
                }
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
            breadcrumb.set('Show', 'home.admin.catalogs.show' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
