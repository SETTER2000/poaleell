angular.module('SkdModule', ['ui.router', 'ngResource', 'vAccordion', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.skds', {
                url: '/skds',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/skds/tpl/list.tpl.html',
                        controller: 'ListSkdController'
                    }
                }
            })
            //.state('home.admin.skds.settings', {
            //    url: '/settings',
            //    templateUrl: '/js/private/admin/skds/views/home.admin.skds.settings.html',
            //    controller: 'ListSkdController'
            //})
            //.state('home.admin.skds.list', {
            //    url: '/list',
            //    views: {
            //        'list@home.admin.skds': {
            //            templateUrl: '/js/private/admin/skds/views/home.admin.skds.list.html',
            //            controller: 'ListSkdController'
            //        }
            //    }
            //})
            .state('home.admin.skds.work', {
                url: '/work',
                views: {
                    'list@home.admin.skds': {
                        templateUrl: '/js/private/admin/skds/views/home.admin.skds.work.html',
                        controller: 'ListSkdController'
                    }
                }
            })
            .state('home.admin.skds.accordion', {
                url: '/accordion',
                views: {
                    'list@home.admin.skds': {
                        templateUrl: '/js/private/admin/skds/views/home.admin.skds.accordion.html',
                        controller: 'ListSkdController'
                    }
                }
            })
            .state('home.admin.skds.test', {
                url: '/test',
                views: {
                    'list@home.admin.skds': {
                        templateUrl: '/js/private/admin/skds/views/test.html',
                        controller: 'ListSkdController'
                    }
                }
            })
            .state('home.admin.skd', {
                url: '/skd/:skdId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/skds/tpl/show.tpl.html',
                        controller: 'SkdController'
                    }
                }
            })
            //.state('home.admin.skds.attendance', {
            //    url: '/attendance',
            //    views: {
            //        'attendance@home.admin.skds': {
            //            templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //            controller: 'ListAttendanceController'
            //        }
            //    }
            //})
            //.state('home.admin.skds.edit', {
            //    url: '/edit/:skdId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/skds/tpl/edit.tpl.html',
            //            controller: 'EditController'
            //        }
            //    }
            //})
            //.state('home.admin.user', {
            //    url: '/user/:skdId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/skds/tpl/show.tpl.html',
            //            controller: 'UserController'
            //        }
            //    }
            //})
            //.state('home.admin.skds.create', {
            //    url: '/create/:skdId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/skds/tpl/edit.tpl.html',
            //            controller: 'EditController'
            //        }
            //    }
            //})
            //.state('home.admin.skds.administration', {
            //    url: '/administration',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/skds/tpl/administration.tpl.html',
            //            controller: 'AdministrationController'
            //        }
            //    }
            //})
            //.state('home.admin.skds.exit', {
            //    url: '/exit',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/skds/tpl/exit.html',
            //            controller: 'EditController'
            //        }
            //    }
            //})
        ;
    })
    .config(function (accordionConfig) {
        accordionConfig.expandAnimationDuration = 0.3;
    })
    .constant('CONF_MODULE_SKD', {baseUrl: '/skds/:skdId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Skds', function ($resource, $state, moment, CONF_MODULE_SKD) {
        var Skds = $resource(
            CONF_MODULE_SKD.baseUrl,
            {skdId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Skds.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };

        Skds.prototype.getFullName = function () {
            return this._id.name;
        };

        Skds.prototype.formMinStart = function () {
            return moment(this.minStart).utc().format('LT');
        };
        Skds.prototype.getPeriodTime = function (e) {
                return moment(e).utc().format('LT');
        };
        Skds.prototype.getOwner = function () {
                return this._id.owner;
        };

        Skds.prototype.formMaxEnd = function () {
            return moment(this.maxEnd).utc().format('LT');
        };
        Skds.prototype.formWorkTime = function () {
            return moment(this.workTime).utc().format('LT');
        };
        Skds.prototype.formDayOfWeek = function () {

            return moment(this._id.date).format('dd');
        };
        Skds.prototype.formDate = function () {
            return moment(this._id.date).utc().format('L');
        };
        Skds.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        Skds.prototype.sc = function () {
            return this.section;
        };
        Skds.prototype.scs = function () {
            return this.sections;
        };
        Skds.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Skds.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Skds.prototype.lastDateSetting = function () {
            return new Date();
        };
        Skds.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                this.birthday = tm;
            }
        };
        Skds.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                this.dateInWork = tm;
            }
        };
        Skds.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                this.firedDate = tm;
            }
        };
        Skds.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Skds.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };
        Skds.prototype.getListUrl = function () {
            return '/admin/skds';
        };
        Skds.prototype.getEditUrl = function (id) {
            return '/admin/users/edit/' + id;
        };
        Skds.prototype.getShowUrl = function (id) {
            return '/admin/skds/' + id;
        };
        Skds.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Skds.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Skds.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Skds;
    })
    //.directive('whenScrolled', function () {
    //    return function (scope, elm, attr) {
    //        var raw = elm[0];
    //
    //        elm.bind('scroll', function () {
    //            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
    //                scope.$apply(attr.whenScrolled);
    //            }
    //        });
    //    };
    //})
/**
 * Выборка фамилий по первой букве
 */
    //.filter('firstChar', function () {
    //    return function (value, param, char) {
    //        if (char.length > 0) {
    //            if (angular.isArray(value) && angular.isString(param)) {
    //                var arr = [];
    //                for (var i = 0, ii = value.length; i < ii; i++) {
    //                    // console.log(value[i].getFullName()[0]);
    //                    if (value[i].getFullName()[0] === char) {
    //                        arr.push(value[i]);
    //                    }
    //                }
    //                return arr;
    //            }
    //        }
    //        return value;
    //    }
    //})
    //.filter("skipItems", function () {
    //    return function (value, count) {
    //        // isArray - проверка, что переменная является массивом
    //        // isNumber - проверка, что переменная является числом
    //        if (angular.isArray(value) && angular.isNumber(count)) {
    //            if (count > value.length || count < 1) {
    //                return value;
    //            } else {
    //                return value.slice(count);
    //            }
    //        } else {
    //            return value;
    //        }
    //    }
    //})
    .directive('pagination2', function () { // функция компиляции директивы (фабричная функция)
        return {
            restrict: 'E',
            scope: {
                //numPages: '=', // кол-во страниц (кнопок)
                defaultRows: '=', // по умолчанию сколько строк должно показываться на одной странице
                limitRows: '=',  // массив содержащий значения кол-ва строк для одной страницы [20,30,50,70,100]
                lengthObject: '=', // кол-во объектов в обрабатываемой коллекции объектов
                currentPage: '=',
                onSelectPage: '&',
                added:'='
            },
            templateUrl: '/js/private/admin/skds/views/pagination.html',
            replace: true,
            link: function (scope) {


                scope.$watch('added', function (value) {
                    scope.added = value;
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
    .directive('alfavit2', function () {
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
            templateUrl: '/js/private/admin/skds/views/alfavit.html',
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
                    var resurs = scope.objectName;
                    //console.log('scope.filedName');
                    //console.log(scope.filedName);
                    for (var key in resurs) {
                        var obj = resurs[key];

                        //console.log('obj');
                        //console.log(obj);
                        for (var prop in obj) {

                            //console.log(prop);
                            var chars;
                            if (prop === scope.filedName) {
                                //console.log('obj[prop]');
                                //console.log(obj[prop].name);
                                chars = obj[prop].name.substr(0,1);
                                parts.push(chars);
                            }
                        }
                    }

                    //console.log('parts');
                    //console.log(parts);
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
                    cntChar = (scope.isNumeric(countChar)) ? countChar : 2;
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
                        scope.where='^'+ch ;
                        scope.charText = ch;
                    } else {
                        scope.charText = '';
                    }

                };

                scope.getCharText = function (ch) {
                    //console.log(ch);

                    if (angular.isString(ch) && ch.length>0) {
                        scope.where='^'+ch;
                        scope.charText = ch;
                    } else {
                        // $scope.defaultRows;
                        scope.charText = '';
                        scope.where ='^.';
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
    .directive('wordPart2', function () {
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
            templateUrl: '/js/private/admin/skds/views/wordPart.html',
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
                                chars = obj[prop].name.substr(0,scope.countChar);
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
                    cntChar = (scope.isNumeric(countChar)) ? countChar : scope.countChar;
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
                        scope.where = '^'+ch;
                        scope.charText = ch;
                        //console.log('WHERE');
                        //console.log(scope.where);
                    } else {
                        // $scope.defaultRows;
                        scope.charText = '.';
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

;
