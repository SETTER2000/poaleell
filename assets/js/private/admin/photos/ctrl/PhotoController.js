angular.module('PhotoModule')
    .controller('PhotoController', ['$scope', '$location', '$state', '$http', 'toastr', 'moment', 'Photos', '$stateParams',
        function ($scope, $location, $state, $http, toastr, moment, Photos, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            //$scope.message = moment({start:'1995-12-25',end:'2000-10-10'}).year(2009).hours(0).minutes(0).seconds(0);
            /**
             * Метод query выполняет запрос на сервер и возвращает коллекцию,
             * которая содержит объекты с данными и дополнительными методами
             * которые используются для взаимодействия с данными на сервере $delete, $get, $remove, $save
             *
             * Так же можно определять свои методы для конструктора в фабрике модуля.
             * В данном конструкторе добавлен метод Photos.getFullName()
             */

            $scope.nameHeader = {
                nameArea: 'Имя',
                descriptionArea: 'Описание',
                descriptionEnArea: 'Описание на английском',
            };

            $scope.myInterval = 2000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            let slides = $scope.slides = [];

            // $scope.slides = [
            //     {id:1,photoUrl:'http://localhost:1340/images/photos/5a51ec39c38fac1c8827d585/IMG_8262.jpg',description: ['Nice image','Awesome photograph','That is so cool','I love that' ][1 % 9],},
            //     {id:2,photoUrl:'http://localhost:1340/images/photos/5a51dc048d22bb1610c49630/IMG_8188+.jpg',description: ['Nice image','Awesome photograph','That is so cool','I love that'][2 % 9],},
            //     {id:3,photoUrl:'http://localhost:1340/images/photos/5a51d8c6bcff7f1ab89b8e1f/IMG_8202+.jpg',description: ['Nice image','Awesome photograph','That is so cool','I love that'][3 % 9],},
            //     {id:4,photoUrl:'http://localhost:1340/images/photos/5a51d645c68e090c2480dd51/IMG_8223.jpg',description: ['Nice image','Awesome photograph','That is so cool','I love that' ][4 % 9],},
            // ];


            let currIndex = 0;

            //   Photos.get({photoId: $stateParams.photoId}) .$promise.then(function(photo) {
            //       console.log('PHOOTTT: ', photo);
            //     slides = photo;
            // });

            Photos.query({sort: 'name'}, function (photos) {
                console.log('Photos ITEMS:', photos);
                $scope.items = photos;
            }, function (err) {
                toastr.error(err, 'Ошибка ListPhotoController!');
            });


            $scope.addSlide = function (i) {
                // let newWidth = 1140 + slides.length + 1;
                $http.post('/photo-show', {})
                    .then(function (attendance) {
                        console.log('attendance^^', attendance.data);
                        for(let key in attendance.data) {
                            slides.push(attendance.data[key]);
                        }
                    });


                // slides.push({
                //     photoUrl: '//localhost:1340/images/photos/5a51ec39c38fac1c8827d585/IMG_8262.jpg',
                //     // photoUrl: '//unsplash.it/' + newWidth + '/400',
                //     description: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 9],
                //     id: currIndex++
                // });
            };
            $scope.addSlide();
            $scope.randomize = function () {
                let indexes = generateIndexesArray();
                assignNewIndexesToSlides(indexes);
            };
            // $scope.addSlide();


            // Randomize logic below

            function assignNewIndexesToSlides(indexes) {
                for (let i = 0, l = slides.length; i < l; i++) {
                    slides[i].id = indexes.pop();
                }
            }

            function generateIndexesArray() {
                let indexes = [];
                for (let i = 0; i < currIndex; ++i) {
                    indexes[i] = i;
                }
                return shuffle(indexes);
            }

            // http://stackoverflow.com/questions/962802#962890
            function shuffle(array) {
                let tmp, current, top = array.length;

                if (top) {
                    while (--top) {
                        current = Math.floor(Math.random() * (top + 1));
                        tmp = array[current];
                        array[current] = array[top];
                        array[top] = tmp;
                    }
                }

                return array;
            }


            $scope.refresh = function () {
                $scope.item = Photos.get({id: $stateParams.photoId}, function (photos) {
                    console.log('photos', photos);
                    $scope.photos = photos;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 889774119! ' + err.data.message);
                });
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
            breadcrumb.set('Photo', 'home.admin.photos');
            breadcrumb.set('Show', 'home.admin.photos.show' + $state.current.url);
            $scope.breadcrumbs = breadcrumb;
            $scope.refresh();
        }]);
