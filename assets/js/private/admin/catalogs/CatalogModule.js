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
                    },


                    // Абсолютное позиционирование вида 'workView' в  состоянии home.admin.catalogs.
                    // <div ui-view='workView'/> внутри /js/private/admin/catalogs/tpl/list.tpl.html
                    // "workView@home.admin.catalogs" : { }
                    "actionView@home.admin.catalogs": {templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.action.html'},

                }
            })
            // .state('home.admin.catalogs.work', {
            //     url: '/work',
            //     "td@home.admin.catalogs.work": {templateUrl: '/js/private/admin/catalogs/views/home.admin.catalogs.work.html'}
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
            if (this.kennels instanceof Array && (this.kennels.length > 0) && this.name) {
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
                for (let item in value) {
                    // console.log('GENDER ITEM ID:', value[item].id);
                    if (value[item].id !== param) ar.push(value[item]);
                    // console.log('Это оно 101!!:', value[item]);
                }
                return ar;

            }
        }
    })



;
