angular.module('UserModule', ['ui.router', 'toastr', 'ngResource', 'AttendanceModule','angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.users', {
                url: '/users',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/list.tpl.html',
                        controller: 'ListController'
                    }
                }
            })
            .state('home.admin.users.settings', {
                url: '/settings',
                templateUrl: '/js/private/admin/users/views/home.admin.users.settings.html',
                controller: 'ListController'
            })
            .state('home.admin.users.list', {
                url: '/list',
                views: {
                    'list@home.admin.users': {
                        templateUrl: '/js/private/admin/users/views/home.admin.users.list.html',
                        controller: 'ListController'
                    }
                }
            })
            .state('home.admin.users.work', {
                url: '/work',
                views: {
                    'list@home.admin.users': {
                        templateUrl: '/js/private/admin/users/views/home.admin.users.work.html',
                        controller: 'ListController'
                    }
                }
            })
            .state('home.admin.users.attendance', {
                url: '/attendance',
                views: {
                    'attendance@home.admin.users': {
                        templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
                        controller: 'ListAttendanceController'
                    }
                }
            })
            .state('home.admin.users.edit', {
                url: '/edit/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                        controller: 'EditController'
                    }
                }
            })
            .state('home.admin.user', {
                url: '/user/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/show.tpl.html',
                        controller: 'UserController'
                    }
                }
            })
            .state('home.admin.users.create', {
                url: '/create/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/edit.tpl.html',
                        controller: 'EditController'
                    }
                }
            })
            .state('home.admin.users.administration', {
                url: '/administration',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/tpl/administration.tpl.html',
                        controller: 'AdministrationController'
                    }
                }
            })
            .state('home.file.upload', {
                url: 'upload',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/users/views/upload.html',
                        controller: 'EditController'
                    }
                }
            })
            //.state('home.admin.users.exit', {
            //    url: '/exit',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/users/tpl/exit.html',
            //            controller: 'EditController'
            //        }
            //    }
            //})
        ;
    })
    .constant('CONF_MODULE_USER', {baseUrl: '/users/:userId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Users', function ($resource, $state, CONF_MODULE_USER) {
        var Users = $resource(
            CONF_MODULE_USER.baseUrl,
            {userId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Users.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };

        Users.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };
        Users.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0,1) + '.' + this.patronymicName.substr(0,1)+'.';
        };
        Users.prototype.sc = function () {
            return this.section;
        };
        Users.prototype.scs = function () {
            return this.sections;
        };
        Users.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Users.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Users.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        //Users.prototype.delFoto= function () {
        //    return this.avatarUrl = '';
        //};
        Users.prototype.lastDateSetting = function () {
            return new Date();
        };
        Users.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                this.birthday = tm;
            }
        };
        Users.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                this.dateInWork = tm;
            }
        };
        Users.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                this.firedDate = tm;
            }
        };
        Users.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Users.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };
        Users.prototype.getListUrl = function () {
            return '/admin/users';
        };
        Users.prototype.getEditUrl = function (id) {
            return '/admin/users/edit/' + id;
        };
        Users.prototype.getShowUrl = function (id) {
            return '/admin/user/' + id;
        };
        Users.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Users.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Users.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Users;
    })
    /**
     * Выборка фамилий по первой букве
     */
    .filter('firstChar', function () {
        return function (value, param, char) {
            if (char.length > 0) {
                if (angular.isArray(value) && angular.isString(param)) {
                    var arr = [];
                    for (var i = 0, ii = value.length; i < ii; i++) {
                        // console.log(value[i].getFullName()[0]);
                        if (value[i].getFullName()[0] === char) {
                            arr.push(value[i]);
                        }
                    }
                    return arr;
                }
            }
            return value;
        }
    })
    .filter("skipItems", function () {
        return function (value, count) {
            // isArray - проверка, что переменная является массивом
            // isNumber - проверка, что переменная является числом
            if (angular.isArray(value) && angular.isNumber(count)) {
                if (count > value.length || count < 1) {
                    return value;
                } else {
                    return value.slice(count);
                }
            } else {
                return value;
            }
        }
    })
    .directive('pagination', function () { // функция компиляции директивы (фабричная функция)
        return {
            restrict: 'E',
            scope: {
                //numPages: '=', // кол-во страниц (кнопок)
                showBt:'=' ,// true|false показывать или нет кнопку добавления объекта, например юзера.
                defaultRows: '=', // по умолчанию сколько строк должно показываться на одной странице
                limitRows: '=',  // массив содержащий значения кол-ва строк для одной страницы [20,30,50,70,100]
                lengthObject: '=', // кол-во объектов в обрабатываемой коллекции объектов
                currentPage: '=',
                onSelectPage: '&',
                added:'='

            },
            templateUrl: '/js/private/admin/users/views/pagination.html',
            replace: true,
            link: function (scope) {

                scope.$watch('added', function (value) {
                    scope.added = value;
                });

                scope.$watch('showBt', function (value) {
                    scope.showBt = value;
                });

                scope.$watch('lengthObject', function (value) {
                    scope.numPages = Math.floor(value / scope.defaultRows) + 1;
                    //scope.pages = [];
                    //for (var i = 1; i <= value; i++) {
                    //    scope.pages.push(i);
                    //}
                    //if (scope.currentPage > value) {
                    //    scope.selectPage(value);
                    //}
                });


                scope.$watch('numPages', function (value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }
                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });
                scope.$watch('limitRows', function (value) {
                    scope.rows = [];
                    for (var i = 0; i <= value.length; i++) {
                        scope.rows.push(value[i]);
                    }
                });
                scope.$watch('defaultRows', function (value, oldValue) {
                    if (value > 0) {
                        scope.defaultRows = value;
                        scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
                    }
                });
                scope.noPrevious = function () {
                    return scope.currentPage === 1;
                };
                scope.noNext = function () {
                    return scope.currentPage === scope.numPages;
                };
                scope.isActive = function (page) {
                    return scope.currentPage === page;
                };
                scope.isActiveRow = function (row) {
                    return scope.defaultRows === row;
                };

                scope.showBtn = function () {
                    return scope.showBt;
                };
                scope.selectPage = function (page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage({page: page});
                    }
                };
                scope.selectPrevious = function () {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };
                scope.selectNext = function () {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };
                scope.getLimitRows = function (limitRows) {
                    scope.defaultRows = limitRows;
                    if (scope.lengthObject <= scope.defaultRows) {
                        scope.numPages = 1;
                    } else {
                        scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
                    }
                };
            }
        };
    })
    .directive('wordPart', function () {
        return {
            restrict: 'E',
            // Это изолированый scope.
            // имена полей изолированного контекста (свойства объекта), а значение
            // определяет имя атрибута элемента с префиксом @, = или &
            /** Например:
             * scope: {
                    isolated1: ‘@attribute1’,
                    isolated2: ‘=attribute2’,
                    isolated3: ‘&attribute3’
                    }

             * Если имя атрибута отсутствует в описании значения, предполагается,
             * что он имеет то же имя, что и поле изолированного контекста:
             * scope: { isolated1: ‘@’ }
             * Здесь предполагается, что атрибут имеет имя isolated1.
             * (стр. 265)
             */
            scope: {
                objectName: '=', // Массив оъектов с фамилиями
                countChar: '=', // по умолчанию сколько строк должно показываться на одной странице
                filedName: '=', // из какого поля берутся начальные буквы
                onSelectPart: '&',
                getCharText: '&',
                charText: '=',
                where: '='
            },
            templateUrl: '/js/private/admin/users/views/wordPart.html',
            replace: true,
            link: function (scope) {
                scope.$watch('objectName', function (value) {

                    //console.log('OBJECT NAME');
                    //console.log(value);

                    scope.objectName = value;
                    scope.checkArray();
                });

                scope.checkArray = function () {
                    var parts = [];
                    var v = scope.objectName;
                    for (var key in v) {
                        var obj = v[key];

                        //console.log(obj);

                        for (var prop in obj) {
                            var chars;
                            if (prop === scope.filedName) {
                                chars = obj[prop].substr(0,3); // Кол-во первых знаков от фамилии
                                parts.push(chars);
                            }
                        }
                    }
                    //console.log('PARTS');
                    //console.log(parts);
                    scope.parts =  scope.uniqueValue(parts);
                    //console.log('UNIQUE PARTS');
                    //console.log(scope.parts);
                };

                scope.uniqueValue = function(arr) {
                    var obj = {};

                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i];
                        obj[str] = true; // запомнить строку в виде свойства объекта
                    }

                    return Object.keys(obj); // или собрать ключи перебором для IE8-
                };

                scope.$watch('charText', function (value) {
                    scope.charText = value;
                });

                scope.$watch('where', function (value) {
                    scope.where = value;
                });

                scope.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                scope.getPartOfSpeech = function (str, countChar) {
                    var cntChar;
                    cntChar = (scope.isNumeric(countChar)) ? countChar : 3;
                    return str.substr(0, cntChar);
                };
                scope.isActive = function (part) {
                    return scope.currentPart === part;
                };
                scope.isActiveRow = function (row) {
                    return scope.defaultRows === row;
                };
                scope.getPartText = function (ch) {
                    if (angular.isString(ch)) {
                        scope.where = {"lastName": {'like': ch + '%'}};
                        scope.charText = ch;
                        //console.log('WHERE');
                        //console.log(scope.where);
                    } else {
                        // $scope.defaultRows;
                        scope.charText = '';
                    }
                };

                scope.selectPart = function (part) {
                    if (!scope.isActive(part)) {
                        scope.currentPart = part;
                        scope.getPartText(part);
                        scope.onSelectPart({part: part});
                    }
                };

            }
        };
    })
    .directive('alfavit', function () {
        return {
            restrict: 'E',
            // Это изолированый scope.
            // имена полей изолированного контекста (свойства объекта), а значение
            // определяет имя атрибута элемента с префиксом @, = или &
            /** Например:
             * scope: {
                    isolated1: ‘@attribute1’,
                    isolated2: ‘=attribute2’,
                    isolated3: ‘&attribute3’
                    }

             * Если имя атрибута отсутствует в описании значения, предполагается,
             * что он имеет то же имя, что и поле изолированного контекста:
             * scope: { isolated1: ‘@’ }
             * Здесь предполагается, что атрибут имеет имя isolated1.
             * (стр. 265)
             */
            scope: {
                objectName: '=', // Массив оъектов с фамилиями
                countChar: '=', // по умолчанию сколько строк должно показываться на одной странице
                filedName: '=', // из какого поля берутся начальные буквы
                //onSelectPart: '&',
                getCharText: '&',
                charText: '=',
                where: '='
            },
            templateUrl: '/js/private/admin/users/views/alfavit.html',
            replace: true,
            link: function (scope) {

                scope.$watch('objectName', function (value) {
                    //console.log('OBJECT NAME33');
                    //console.log(value);

                    scope.objectName = value;
                    scope.checkArray();
                });

                scope.checkArray = function () {
                    var parts = [];
                    var v = scope.objectName;
                    //console.log('obj - v');
                    //console.log(v);
                    for (var key in v) {
                        var obj = v[key];
                        //
                        //console.log('obj');
                        //console.log(obj);
                        for (var prop in obj) {
                            var chars;
                            if (prop === scope.filedName) {
                                chars = obj[prop].substr(0,1);
                                parts.push(chars);
                            }
                        }
                    }
                    //console.log('PARTS');
                    //console.log(parts);
                    scope.parts =  scope.uniqueValue(parts).sort();
                    //console.log('UNIQUE2 PARTS2');
                    //console.log(scope.parts);
                };

                scope.uniqueValue = function(arr) {
                    var obj = {};

                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i];
                        obj[str] = true; // запомнить строку в виде свойства объекта
                    }

                    return Object.keys(obj); // или собрать ключи перебором для IE8-
                };

                scope.$watch('charText', function (value) {
                    scope.charText = value;
                });

                scope.$watch('where', function (value) {
                    scope.where = value;
                });

                scope.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };

                scope.getPartOfSpeech = function (str, countChar) {
                    var cntChar;
                    cntChar = (scope.isNumeric(countChar)) ? countChar : 3;
                    return str.substr(0, cntChar);
                };

                scope.isActive = function (part) {
                    return scope.currentPart === part;
                };

                scope.isActiveRow = function (row) {
                    return scope.defaultRows === row;
                };

                scope.getPartText = function (ch) {
                    if (angular.isString(ch)) {
                        scope.where = {"lastName": {'like': ch + '%'}};
                        scope.charText = ch;
                    } else {
                        scope.charText = '';
                    }

                };

                scope.getCharText = function (ch) {
                    //console.log(ch);

                    if (angular.isString(ch) && ch.length>0) {
                        scope.where = {lastName: {'like': ch + '%'}};
                        scope.charText = ch;
                    } else {
                        // $scope.defaultRows;
                        scope.charText = '';
                        scope.where ={};
                    }
                    //scope.refresh(where);
                };

                scope.selectPart = function (part) {
                    if (!scope.isActive(part)) {
                        scope.currentPart = part;
                        scope.getPartText(part);
                        scope.getCharText(part);
                        scope.onSelectPart({part: part});
                    }
                };
            }
        };
    })
    .directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var file = event.target.files[0];
                    scope.file = file ? file : undefined;
                    scope.$apply();
                });
            }
        };
    });
    //.directive("fileread", [function () {
    //    return {
    //        scope: {
    //            fileread: "="
    //        },
    //        link: function (scope, element, attributes) {
    //            element.bind("change", function (changeEvent) {
    //                var reader = new FileReader();
    //                reader.onload = function (loadEvent) {
    //                    scope.$apply(function () {
    //                        scope.fileread = loadEvent.target.result;
    //                    });
    //                }
    //                reader.readAsDataURL(changeEvent.target.files[0]);
    //            });
    //        }
    //    }
    //}]);
;
