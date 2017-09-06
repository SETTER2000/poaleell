angular.module('ShowcaseModule', ['ui.router', 'toastr', 'ngResource', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.showcases', {
                url: 'showcases',
                views: {
                    '@': {
                        templateUrl: '/js/private/dashboard/showcases/tpl/list.tpl.html',
                        controller: 'ListShowcaseController'
                    }
                }
            })
            // .state('home.dashboard.showcases.settings', {
            //     url: '/settings',
            //     templateUrl: '/js/private/dashboard/showcases/views/home.dashboard.showcases.settings.html',
            //     controller: 'ListShowcaseController'
            // })
            // .state('home.dashboard.showcases.list', {
            //     url: '/list',
            //     views: {
            //         'list@home.dashboard.showcases': {
            //             templateUrl: '/js/private/dashboard/showcases/views/home.dashboard.showcases.list.html',
            //             controller: 'ListShowcaseController'
            //         }
            //     }
            // })
            // .state('home.dashboard.showcases.work', {
            //     url: '/work',
            //     views: {
            //         'list@home.dashboard.showcases': {
            //             templateUrl: '/js/private/dashboard/showcases/views/home.dashboard.showcases.work.html',
            //             controller: 'ListShowcaseController'
            //         }
            //     }
            // })
            // .state('home.dashboard.showcases.attendance', {
            //     url: '/attendance',
            //     views: {
            //         'attendance@home.dashboard.showcases': {
            //             templateUrl: '/js/private/dashboard/attendances/tpl/list.tpl.html',
            //             controller: 'ListAttendanceController'
            //         }
            //     }
            // })
            // .state('home.dashboard.showcases.edit', {
            //     url: '/edit/:showcaseId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dashboard/showcases/tpl/edit.tpl.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
            // .state('home.dashboard.user', {
            //     url: '/user/:showcaseId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dashboard/showcases/tpl/show.tpl.html',
            //             controller: 'UserController'
            //         }
            //     }
            // })
            // .state('home.dashboard.showcases.create', {
            //     url: '/create/:showcaseId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dashboard/showcases/tpl/edit.tpl.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
            // .state('home.dashboard.showcases.administration', {
            //     url: '/administration',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dashboard/showcases/tpl/administration.tpl.html',
            //             controller: 'AdministrationController'
            //         }
            //     }
            // })
            // .state('home.file.upload', {
            //     url: 'upload',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dashboard/showcases/views/upload.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
            //.state('home.dashboard.showcases.exit', {
            //    url: '/exit',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/dashboard/showcases/tpl/exit.html',
            //            controller: 'EditController'
            //        }
            //    }
            //})
        ;
    })
    .constant('CONF_MODULE_SHOWCASE', {baseUrl: '/showcases/:showcaseId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Showcases', function ($resource, $state, CONF_MODULE_SHOWCASE) {
        var Showcases = $resource(
            CONF_MODULE_SHOWCASE.baseUrl,
            {showcaseId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Showcases.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };

        Showcases.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };
        Showcases.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0,1) + '.' + this.patronymicName.substr(0,1)+'.';
        };
        Showcases.prototype.sc = function () {
            return this.section;
        };
        Showcases.prototype.scs = function () {
            return this.sections;
        };
        Showcases.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Showcases.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Showcases.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        //Showcases.prototype.delFoto= function () {
        //    return this.avatarUrl = '';
        //};
        Showcases.prototype.lastDateSetting = function () {
            return new Date();
        };
        Showcases.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                //console.log('TMMM: ', tm);
                var month = ((+tm.getMonth()+1)<10)? '0'+(+tm.getMonth()+1) : (+tm.getMonth()+1);
                var date = (+tm.getDate()<10)? '0'+tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm =  date+'.'+ month+'.'+ tm.getFullYear();
                this.birthday = tm;
            }
        };
        Showcases.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                var month = ((+tm.getMonth()+1)<10)? '0'+(+tm.getMonth()+1) : (+tm.getMonth()+1);
                var date = (+tm.getDate()<10)? '0'+tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm =  date+'.'+ month+'.'+ tm.getFullYear();
                this.dateInWork = tm;
            }
        };
        Showcases.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                var month = ((+tm.getMonth()+1)<10)? '0'+(+tm.getMonth()+1) : (+tm.getMonth()+1);
                var date = (+tm.getDate()<10)? '0'+tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm =  date+'.'+ month+'.'+ tm.getFullYear();
                this.firedDate = tm;
            }
        };
        Showcases.prototype.getDecree = function () {
            if (this.decree) {
                var tm;
                tm = new Date(this.decree);
                var month = ((+tm.getMonth()+1)<10)? '0'+(+tm.getMonth()+1) : (+tm.getMonth()+1);
                var date = (+tm.getDate()<10)? '0'+tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm =  date+'.'+ month+'.'+ tm.getFullYear();
                this.decree = tm;
            }
        };
        Showcases.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Showcases.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };

        Showcases.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork,["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return  moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Showcases.prototype.getListUrl = function () {
            return '/dashboard/showcases';
        };
        Showcases.prototype.getEditUrl = function (id) {
            return '/dashboard/showcases/edit/' + id;
        };
        Showcases.prototype.getShowUrl = function (id) {
            return '/dashboard/user/' + id;
        };
        Showcases.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Showcases.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Showcases.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Showcases;
    })
    /**
     * Выборка фамилий по первой букве
     */
    // .filter('firstChar', function () {
    //     return function (value, param, char) {
    //         if (char.length > 0) {
    //             if (angular.isArray(value) && angular.isString(param)) {
    //                 var arr = [];
    //                 for (var i = 0, ii = value.length; i < ii; i++) {
    //                     // console.log(value[i].getFullName()[0]);
    //                     if (value[i].getFullName()[0] === char) {
    //                         arr.push(value[i]);
    //                     }
    //                 }
    //                 return arr;
    //             }
    //         }
    //         return value;
    //     }
    // })
    // .filter("skipItems", function () {
    //     return function (value, count) {
    //         // isArray - проверка, что переменная является массивом
    //         // isNumber - проверка, что переменная является числом
    //         if (angular.isArray(value) && angular.isNumber(count)) {
    //             if (count > value.length || count < 1) {
    //                 return value;
    //             } else {
    //                 return value.slice(count);
    //             }
    //         } else {
    //             return value;
    //         }
    //     }
    // })
    // .directive('pagination', function () { // функция компиляции директивы (фабричная функция)
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             //numPages: '=', // кол-во страниц (кнопок)
    //             showBt:'=' ,// true|false показывать или нет кнопку добавления объекта, например юзера.
    //             urlBt:'=' ,// ссылка для кнопки.
    //             defaultRows: '=', // по умолчанию сколько строк должно показываться на одной странице
    //             limitRows: '=',  // массив содержащий значения кол-ва строк для одной страницы [20,30,50,70,100]
    //             lengthObject: '=', // кол-во объектов в обрабатываемой коллекции объектов
    //             currentPage: '=',
    //             onSelectPage: '&',
    //             added:'='
    //
    //         },
    //         templateUrl: '/js/private/dashboard/showcases/views/pagination.html',
    //         replace: true,
    //         link: function (scope) {
    //
    //             scope.$watch('added', function (value) {
    //                 scope.added = value;
    //             });
    //
    //             scope.$watch('showBt', function (value) {
    //                 scope.showBt = value;
    //             });
    //             scope.$watch('urlBt', function (value) {
    //                 scope.urlBt = value;
    //             });
    //
    //             scope.$watch('lengthObject', function (value) {
    //                 scope.numPages = Math.floor(value / scope.defaultRows) + 1;
    //                 //scope.pages = [];
    //                 //for (var i = 1; i <= value; i++) {
    //                 //    scope.pages.push(i);
    //                 //}
    //                 //if (scope.currentPage > value) {
    //                 //    scope.selectPage(value);
    //                 //}
    //             });
    //
    //
    //             scope.$watch('numPages', function (value) {
    //                 scope.pages = [];
    //                 for (var i = 1; i <= value; i++) {
    //                     scope.pages.push(i);
    //                 }
    //                 if (scope.currentPage > value) {
    //                     scope.selectPage(value);
    //                 }
    //             });
    //             scope.$watch('limitRows', function (value) {
    //                 scope.rows = [];
    //                 for (var i = 0; i <= value.length; i++) {
    //                     scope.rows.push(value[i]);
    //                 }
    //             });
    //             scope.$watch('defaultRows', function (value, oldValue) {
    //                 if (value > 0) {
    //                     scope.defaultRows = value;
    //                     scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
    //                 }
    //             });
    //             scope.noPrevious = function () {
    //                 return scope.currentPage === 1;
    //             };
    //             scope.noNext = function () {
    //                 return scope.currentPage === scope.numPages;
    //             };
    //             scope.isActive = function (page) {
    //                 return scope.currentPage === page;
    //             };
    //             scope.isActiveRow = function (row) {
    //                 return scope.defaultRows === row;
    //             };
    //
    //             scope.showBtn = function () {
    //                 return scope.showBt;
    //             };
    //             scope.urlBtn = function () {
    //                 return scope.urlBt;
    //             };
    //             scope.selectPage = function (page) {
    //                 if (!scope.isActive(page)) {
    //                     scope.currentPage = page;
    //                     scope.onSelectPage({page: page});
    //                 }
    //             };
    //             scope.selectPrevious = function () {
    //                 if (!scope.noPrevious()) {
    //                     scope.selectPage(scope.currentPage - 1);
    //                 }
    //             };
    //             scope.selectNext = function () {
    //                 if (!scope.noNext()) {
    //                     scope.selectPage(scope.currentPage + 1);
    //                 }
    //             };
    //             scope.getLimitRows = function (limitRows) {
    //                 scope.defaultRows = limitRows;
    //                 if (scope.lengthObject <= scope.defaultRows) {
    //                     scope.numPages = 1;
    //                 } else {
    //                     scope.numPages = Math.floor(scope.lengthObject / scope.defaultRows) + 1;
    //                 }
    //             };
    //         }
    //     };
    // })
    // .directive('wordPart', function () {
    //     return {
    //         restrict: 'E',
    //         // Это изолированый scope.
    //         // имена полей изолированного контекста (свойства объекта), а значение
    //         // определяет имя атрибута элемента с префиксом @, = или &
    //         /** Например:
    //          * scope: {
    //                 isolated1: ‘@attribute1’,
    //                 isolated2: ‘=attribute2’,
    //                 isolated3: ‘&attribute3’
    //                 }
    //
    //          * Если имя атрибута отсутствует в описании значения, предполагается,
    //          * что он имеет то же имя, что и поле изолированного контекста:
    //          * scope: { isolated1: ‘@’ }
    //          * Здесь предполагается, что атрибут имеет имя isolated1.
    //          * (стр. 265)
    //          */
    //         scope: {
    //             objectName: '=', // Массив оъектов с фамилиями
    //             countChar: '=', // по умолчанию сколько строк должно показываться на одной странице
    //             filedName: '=', // из какого поля берутся начальные буквы
    //             onSelectPart: '&',
    //             getCharText: '&',
    //             charText: '=',
    //             where: '='
    //         },
    //         templateUrl: '/js/private/dashboard/showcases/views/wordPart.html',
    //         replace: true,
    //         link: function (scope) {
    //             scope.$watch('objectName', function (value) {
    //
    //                 //console.log('OBJECT NAME');
    //                 //console.log(value);
    //
    //                 scope.objectName = value;
    //                 scope.checkArray();
    //             });
    //
    //             scope.checkArray = function () {
    //                 var parts = [];
    //                 var v = scope.objectName;
    //                 for (var key in v) {
    //                     var obj = v[key];
    //
    //                     //console.log(obj);
    //
    //                     for (var prop in obj) {
    //                         var chars;
    //                         if (prop === scope.filedName) {
    //                             chars = obj[prop].substr(0,3); // Кол-во первых знаков от фамилии
    //                             parts.push(chars);
    //                         }
    //                     }
    //                 }
    //                 //console.log('PARTS');
    //                 //console.log(parts);
    //                 scope.parts =  scope.uniqueValue(parts);
    //                 //console.log('UNIQUE PARTS');
    //                 //console.log(scope.parts);
    //             };
    //
    //             scope.uniqueValue = function(arr) {
    //                 var obj = {};
    //
    //                 for (var i = 0; i < arr.length; i++) {
    //                     var str = arr[i];
    //                     obj[str] = true; // запомнить строку в виде свойства объекта
    //                 }
    //
    //                 return Object.keys(obj); // или собрать ключи перебором для IE8-
    //             };
    //
    //             scope.$watch('charText', function (value) {
    //                 scope.charText = value;
    //             });
    //
    //             scope.$watch('where', function (value) {
    //                 scope.where = value;
    //             });
    //
    //             scope.isNumeric = function (n) {
    //                 return !isNaN(parseFloat(n)) && isFinite(n);
    //             };
    //             scope.getPartOfSpeech = function (str, countChar) {
    //                 var cntChar;
    //                 cntChar = (scope.isNumeric(countChar)) ? countChar : 3;
    //                 return str.substr(0, cntChar);
    //             };
    //             scope.isActive = function (part) {
    //                 return scope.currentPart === part;
    //             };
    //             scope.isActiveRow = function (row) {
    //                 return scope.defaultRows === row;
    //             };
    //             scope.getPartText = function (ch) {
    //                 if (angular.isString(ch)) {
    //                     scope.where = {"lastName": {'like': ch + '%'}};
    //                     scope.charText = ch;
    //                     //console.log('WHERE');
    //                     //console.log(scope.where);
    //                 } else {
    //                     // $scope.defaultRows;
    //                     scope.charText = '';
    //                 }
    //             };
    //
    //             scope.selectPart = function (part) {
    //                 if (!scope.isActive(part)) {
    //                     scope.currentPart = part;
    //                     scope.getPartText(part);
    //                     scope.onSelectPart({part: part});
    //                 }
    //             };
    //
    //         }
    //     };
    // })
    // .directive('alfavit', function () {
    //     return {
    //         restrict: 'E',
    //         // Это изолированый scope.
    //         // имена полей изолированного контекста (свойства объекта), а значение
    //         // определяет имя атрибута элемента с префиксом @, = или &
    //         /** Например:
    //          * scope: {
    //                 isolated1: ‘@attribute1’,
    //                 isolated2: ‘=attribute2’,
    //                 isolated3: ‘&attribute3’
    //                 }
    //
    //          * Если имя атрибута отсутствует в описании значения, предполагается,
    //          * что он имеет то же имя, что и поле изолированного контекста:
    //          * scope: { isolated1: ‘@’ }
    //          * Здесь предполагается, что атрибут имеет имя isolated1.
    //          * (стр. 265)
    //          */
    //         scope: {
    //             objectName: '=', // Массив оъектов с фамилиями
    //             countChar: '=', // по умолчанию сколько строк должно показываться на одной странице
    //             filedName: '=', // из какого поля берутся начальные буквы
    //             //onSelectPart: '&',
    //             getCharText: '&',
    //             charText: '=',
    //             where: '='
    //         },
    //         templateUrl: '/js/private/dashboard/showcases/views/alfavit.html',
    //         replace: true,
    //         link: function (scope) {
    //
    //             scope.$watch('objectName', function (value) {
    //                 //console.log('OBJECT NAME33');
    //                 //console.log(value);
    //
    //                 scope.objectName = value;
    //                 scope.checkArray();
    //             });
    //
    //             scope.checkArray = function () {
    //                 var parts = [];
    //                 var v = scope.objectName;
    //                 //console.log('obj - v');
    //                 //console.log(v);
    //                 for (var key in v) {
    //                     var obj = v[key];
    //                     //
    //                     //console.log('obj');
    //                     //console.log(obj);
    //                     for (var prop in obj) {
    //                         var chars;
    //                         if (prop === scope.filedName) {
    //                             chars = obj[prop].substr(0,1);
    //                             parts.push(chars);
    //                         }
    //                     }
    //                 }
    //                 //console.log('PARTS');
    //                 //console.log(parts);
    //                 scope.parts =  scope.uniqueValue(parts).sort();
    //                 //console.log('UNIQUE2 PARTS2');
    //                 //console.log(scope.parts);
    //             };
    //
    //             scope.uniqueValue = function(arr) {
    //                 var obj = {};
    //
    //                 for (var i = 0; i < arr.length; i++) {
    //                     var str = arr[i];
    //                     obj[str] = true; // запомнить строку в виде свойства объекта
    //                 }
    //
    //                 return Object.keys(obj); // или собрать ключи перебором для IE8-
    //             };
    //
    //             scope.$watch('charText', function (value) {
    //                 scope.charText = value;
    //             });
    //
    //             scope.$watch('where', function (value) {
    //                 scope.where = value;
    //             });
    //
    //             scope.isNumeric = function (n) {
    //                 return !isNaN(parseFloat(n)) && isFinite(n);
    //             };
    //
    //             scope.getPartOfSpeech = function (str, countChar) {
    //                 var cntChar;
    //                 cntChar = (scope.isNumeric(countChar)) ? countChar : 3;
    //                 return str.substr(0, cntChar);
    //             };
    //
    //             scope.isActive = function (part) {
    //                 return scope.currentPart === part;
    //             };
    //
    //             scope.isActiveRow = function (row) {
    //                 return scope.defaultRows === row;
    //             };
    //
    //             scope.getPartText = function (ch) {
    //                 if (angular.isString(ch)) {
    //                     scope.where = {"lastName": {'like': ch + '%'}};
    //                     scope.charText = ch;
    //                 } else {
    //                     scope.charText = '';
    //                 }
    //
    //             };
    //
    //             scope.getCharText = function (ch) {
    //                 //console.log(ch);
    //
    //                 if (angular.isString(ch) && ch.length>0) {
    //                     scope.where = {lastName: {'like': ch + '%'}};
    //                     scope.charText = ch;
    //                 } else {
    //                     // $scope.defaultRows;
    //                     scope.charText = '';
    //                     scope.where ={};
    //                 }
    //                 //scope.refresh(where);
    //             };
    //
    //             scope.selectPart = function (part) {
    //                 if (!scope.isActive(part)) {
    //                     scope.currentPart = part;
    //                     scope.getPartText(part);
    //                     scope.getCharText(part);
    //                     scope.onSelectPart({part: part});
    //                 }
    //             };
    //         }
    //     };
    // })
    // .directive('file', function () {
    //     return {
    //         scope: {
    //             file: '='
    //         },
    //         link: function (scope, el, attrs) {
    //             el.bind('change', function (event) {
    //                 var file = event.target.files[0];
    //                 scope.file = file ? file : undefined;
    //                 scope.$apply();
    //             });
    //         }
    //     };
    // })
   
;
