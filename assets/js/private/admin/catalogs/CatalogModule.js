angular.module('CatalogModule', ['ui.router', 'toastr', 'ngResource', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.catalogs', {
                url: '/catalogs',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/list.tpl.html',
                        controller: 'ListCatalogController'
                    }
                }
            })
            // .state('home.admin.catalogs.settings', {
            //     url: '/settings',
            //     templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.settings.html',
            //     controller: 'ListCatalogController'
            // })
            .state('home.admin.catalogs.list', {
                url: '/list',
                views: {
                    'list@home.admin.catalogs': {
                        templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.list.html',
                        controller: 'ListCatalogController'
                    }
                }
            })
            // .state('home.admin.catalogs.work', {
            //     url: '/work',
            //     views: {
            //         'list@home.admin.catalogs': {
            //             templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.work.html',
            //             controller: 'ListCatalogController'
            //         }
            //     }
            // })
            // .state('home.admin.catalogs.attendance', {
            //     url: '/attendance',
            //     views: {
            //         'attendance@home.admin.catalogs': {
            //             templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //             controller: 'ListAttendanceController'
            //         }
            //     }
            // })
            .state('home.admin.catalogs.edit', {
                url: '/edit/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/edit.tpl.html',
                        controller: 'EditCatalogController'
                    }
                }
            })

            .state('home.admin.catalog', {
                url: '/catalog/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/show.tpl.html',
                        controller: 'CatalogController'
                    }
                }
            })
            .state('home.admin.catalogs.create', {
                url: '/create/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/catalogs/tpl/edit.tpl.html',
                        controller: 'EditCatalogController'
                    }
                }
            })
        // .state('home.admin.catalogs.administration', {
        //     url: '/administration',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/catalogs/tpl/administration.tpl.html',
        //             controller: 'AdministrationController'
        //         }
        //     }
        // })
        // .state('home.file.upload', {
        //     url: 'upload',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/catalogs/views/upload.html',
        //             controller: 'EditCatalogController'
        //         }
        //     }
        // })
        //.state('home.admin.catalogs.exit', {
        //    url: '/exit',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/catalogs/tpl/exit.html',
        //            controller: 'EditCatalogController'
        //        }
        //    }
        //})
        ;
    })
    .constant('CONF_MODULE_CATALOG', {baseUrl: '/catalogs/:catalogId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Catalogs', function ($resource, $state, CONF_MODULE_CATALOG) {
        var Catalogs = $resource(
            CONF_MODULE_CATALOG.baseUrl,
            {catalogId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Catalogs.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };
        Catalogs.prototype.kennelName = function () {
            // console.log('this.kennels',this.kennels);
            if (this.kennels instanceof Array && this.kennels.length > 0) return this.kennels[0].name;
            return 'неизвестен'

        };

        Catalogs.prototype.sireName = function () {
            console.log('this.sires', this.sires);
            // if(this.kennels instanceof Array && this.kennels.length>0) return this.kennels[0].name ;
            return this.sires.kennelName() + ' ' + this.sires.name

        };
        Catalogs.prototype.getClasses = function () {
            let arr = [];
            let periods = [];
            let current = moment();
            let birthday = this.birthday;
            periods.push({name: 'baby', step: 'months', start: 3, end: 6});
            periods.push({name: 'puppy', step: 'months', start: 6, end: 9});
            periods.push({name: 'junior', step: 'months', start: 9, end: 18});
            periods.push({name: 'intermediate', step: 'months', start: 15, end: 24});
            periods.push({name: 'open', step: 'months', start: 15, end: 200});
            periods.push({name: 'winner', step: 'months', start: 15, end: 200});
            periods.push({name: 'champion', step: 'months', start: 15, end: 200});
            periods.push({name: 'nkp', step: 'months', start: 15, end: 200});
            periods.push({name: 'veteran', step: 'years', start: 8, end: 20});

            _.forEach(periods, function (value, key) {
                let nStart = periods[key].name + 'Start';
                let nEnd = periods[key].name + 'End';
                periods[key][nStart] = moment(birthday, ["DD.MM.YYYY"]).add(periods[key].start, periods[key].step);
                periods[key][nEnd] = moment(birthday, ["DD.MM.YYYY"]).add(periods[key].end, periods[key].step);
                if (periods[key][nStart].diff(current) < 0 && periods[key][nEnd].diff(current) > 0) {
                    arr.push(periods[key].name.toUpperCase());
                }
            });
            return arr;
        };

        Catalogs.prototype.getFullName = function () {
            if (this.kennels instanceof Array && (this.kennels.length > 0)) {
                return this.kennels[0].name + ' ' + this.name;
            } else {
                return this.name;
            }


        };

        Catalogs.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        Catalogs.prototype.sc = function () {
            return this.section;
        };
        Catalogs.prototype.scs = function () {
            return this.sections;
        };
        Catalogs.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Catalogs.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Catalogs.prototype.getTimeBirthday = function () {
            console.log('this.timeBirthday:', this.timeBirthday);
            return this.timeBirthday;
        };


        Catalogs.prototype.breederName = function (int) {
            let t = '';
            if (int) {
                this.breeders.forEach(function (item, i, arr) {
                    t += (i >= 1) ? ', ' : '';
                    t += item.lastName + ' ' + item.firstName;
                    t += (item.patronymicName) ? ' ' + item.patronymicName : '';

                });
            } else {
                this.breeders.forEach(function (item, i, arr) {
                    t += (i >= 1) ? ', ' : '';
                    t += item.lastName + ' ' + item.firstName[0] + '.';
                    t += (item.patronymicName[0]) ? ' ' + item.patronymicName[0] + '.' : '';

                });
            }
            return t;
        };
        Catalogs.prototype.ownerName = function (int) {
            let t = '';
            if (int) {
                this.owners.forEach(function (item, i, arr) {
                    t += (i >= 1) ? ', ' : '';
                    t += item.lastName + ' ' + item.firstName;
                    t += (item.patronymicName) ? ' ' + item.patronymicName : '';
                });
            } else {
                this.owners.forEach(function (item, i, arr) {
                    t += (i >= 1) ? ', ' : '';
                    t += item.lastName + ' ' + item.firstName[0] + '.';
                    t += (item.patronymicName[0]) ? ' ' + item.patronymicName[0] + '.' : '';
                });
            }
            return t;
        };
        Catalogs.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        Catalogs.prototype.lastDateSetting = function () {
            return new Date();
        };
        Catalogs.prototype.getBirthday = function () {
            if (this.birthday) {
                var tm;
                tm = new Date(this.birthday);
                //console.log('TMMM: ', tm);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.birthday = tm;
            }
        };
        Catalogs.prototype.getDeath = function () {
            if (this.death) {
                var tm;
                tm = new Date(this.death);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.death = tm;
            }
        };
        Catalogs.prototype.getFiredDate = function () {
            if (this.firedDate) {
                var tm;
                tm = new Date(this.firedDate);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.firedDate = tm;
            }
        };
        Catalogs.prototype.getDecree = function () {
            if (this.decree) {
                var tm;
                tm = new Date(this.decree);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.decree = tm;
            }
        };
        Catalogs.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Catalogs.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };


        Catalogs.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };

        Catalogs.prototype.age = function () {
            var now = moment();
            var event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Catalogs.prototype.getListUrl = function () {
            return '/admin/catalogs';
        };
        Catalogs.prototype.getEditUrl = function (id) {
            return '/admin/catalogs/edit/' + id;
        };
        Catalogs.prototype.getShowUrl = function (id) {
            return '/admin/catalog/' + id;
        };
        Catalogs.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Catalogs.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Catalogs.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Catalogs;
    })
    .directive('unknownValueError', function () {
        return {
            require: ['ngModel', 'select'],
            link: function (scope, element, attrs, ctrls) {
                let ngModelCtrl = ctrls[0]; // ангулар модель выбрана элемента select
                /**
                 *  выбран сам элемент select со страницы, т.е. его контроллер (SelectController),
                 *  для внесения изменений в логику контроллера(управления) выбором (option)
                 */
                let selectCtrl = ctrls[1];
                console.log('ngModelCtrl', ngModelCtrl);
                console.log('selectCtrl', selectCtrl);

                /**
                 *  ВНИАМАНИЕ!!
                 *  https://docs.angularjs.org/api/ng/type/select.SelectController
                 *  В документации не верно указаны функции контроллера (SelectController), для Angular 1.6
                 *  они не актуальны, следует смотреть методы конкретно по объекту.
                 *  $isUnknownOptionSelected() в 1.6  это unselectEmptyOption()
                 */
                ngModelCtrl.$validators.unknownValue = function (modelValue, viewValue) {
                    console.log('selectCtrl.readValue()', selectCtrl.readValue());
                    console.log('selectCtrl.unselectEmptyOption()', selectCtrl.unselectEmptyOption());
                    console.log('selectCtrl.unknownOption', selectCtrl.unknownOption);
                    return (selectCtrl.readValue());
                    // condition?true:false or condition?false:true. These expressions may be safely simplified to condition or !condition , respectively.
                };
            }
        }
    })
    .directive('unknownValueRequired', function () {
        return {
            priority: 1, // This directive must run after the required directive has added its validator
            require: ['ngModel', 'select'],
            link: function (scope, element, attrs, ctrls) {
                var ngModelCtrl = ctrls[0];
                var selectCtrl = ctrls[1];

                var originalRequiredValidator = ngModelCtrl.$validators.required;

                ngModelCtrl.$validators.required = function () {
                    if (attrs.required && selectCtrl.$isUnknownOptionSelected()) {
                        return false;
                    }

                    return originalRequiredValidator.apply(this, arguments);
                };
            }
        };
    })
    .directive('customSelect', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                'ngModel': '=',
                'options': '=',
            },
            templateUrl: '/js/private/admin/catalogs/views/select.view.html',
            link: function (scope, $element, attributes) {
                scope.selectable_options = scope.options;
            }
        };
    })

        
    /**
     * Это не я.
     * Фильтр выбрасывает меня из папы или из мамы
     * Я не могу быть сам себе родителем )
     */
    .filter('itsNotMe', function () {
        return function (value, param) {
            if (angular.isArray(value) && angular.isString(param)) {
                // console.log('GENDER PAPA77:', value);
                let ar = [];
                for(let item in value){
                    // console.log('GENDER ITEM ID:', value[item].id);
                    if(value[item].id !== param) ar.push(value[item]);
                        // console.log('Это оно 101!!:', value[item]);
                }
               return ar;

            }
        }
    })
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
//         templateUrl: '/js/private/admin/catalogs/views/pagination.html',
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
//         templateUrl: '/js/private/admin/catalogs/views/wordPart.html',
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
//         templateUrl: '/js/private/admin/catalogs/views/alfavit.html',
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
