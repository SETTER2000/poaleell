angular.module('CatalogFModule', ['ui.router', 'toastr', 'ngResource', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.dog.catalogs', {
                url: '/catalogs',
                views: {
                    '@': {
                        templateUrl: '/js/private/dog/catalogs/tpl/list.tpl.html',
                        controller: 'ListCatalogFController'
                    },

                    // Абсолютное позиционирование вида 'workView' в  состоянии home.dog.catalogs.
                    // <div ui-view='workView'/> внутри /js/private/dog/catalogs/tpl/list.tpl.html
                    // "workView@home.dog.catalogs" : { }
                    "actionView@home.dog.catalogs": {
                        templateUrl: '/js/private/dog/catalogs/views/home.catalogs.action.html'
                    },

                }
            })
            .state('home.dog.catalogs.list', {
                url: '/list',
                views: {
                    'list@home.dog.catalogs': {
                        templateUrl: '/js/private/dog/catalogs/views/home.dog.catalogs.list.html',
                        controller: 'ListCatalogFController'
                    }
                }
            })
            .state('home.dog.catalog', {
                url: '/catalog/:catalogId',
                views: {
                    '@': {
                        templateUrl: '/js/private/dog/catalogs/tpl/show.tpl.html',
                        controller: 'CatalogFController'
                    },
                    // Абсолютное позиционирование вида 'formView' в  состоянии home.dog.catalogs.
                    // <div ui-view='formView'/> внутри /js/private/dog/catalog/tpl/show.tpl.html
                    // "formView@home.dog.catalog" : { }
                    // "formView@home.dog.catalog": {
                    //     templateUrl: '/js/private/dog/messages/views/min.messages.form.html'
                    // },

                }
            })

        ;
    })
    .constant('CONF_MODULE_CATALOG', {baseUrl: '/catalogs/:catalogId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('CatalogsF', function ($resource, $state, CONF_MODULE_CATALOG) {
        var CatalogsF = $resource(
            CONF_MODULE_CATALOG.baseUrl,
            {catalogId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        CatalogsF.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };
        CatalogsF.prototype.kennelName = function () {
            // console.log('this.kennels',this.kennels);
            if (this.kennels instanceof Array && this.kennels.length > 0) return this.kennels[0].name;
            return 'неизвестен'

        };
        CatalogsF.prototype.getClasses = function () {
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
        CatalogsF.prototype.getFullName = function () {
            if (this.kennels instanceof Array && (this.kennels.length > 0) && this.kennels[0].rightName) {
                if (this.kennels instanceof Array && (this.kennels.length > 0) && this.name) {
                    return this.name + ' ' + this.kennels[0].name;
                } else {
                    return this.kennels[0].name;
                }
            } else {
                if (this.kennels instanceof Array && (this.kennels.length > 0) && this.name) {
                    return this.kennels[0].name + ' ' + this.name;
                } else {
                    return this.name;
                }
            }
        };
        CatalogsF.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        CatalogsF.prototype.sc = function () {
            return this.section;
        };
        CatalogsF.prototype.scs = function () {
            return this.sections;
        };
        CatalogsF.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        CatalogsF.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        CatalogsF.prototype.breederName = function (int) {
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
        CatalogsF.prototype.ownerName = function (int) {
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
        CatalogsF.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        CatalogsF.prototype.lastDateSetting = function () {
            return new Date();
        };
        CatalogsF.prototype.getBirthday = function () {
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
        CatalogsF.prototype.getDateWeight = function () {
            if (this.dateWeight) {
                var tm;
                tm = new Date(this.dateWeight);
                //console.log('TMMM: ', tm);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.dateWeight = tm;
            }
        };
        CatalogsF.prototype.getDeath = function () {
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
        CatalogsF.prototype.getFiredDate = function () {
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
        CatalogsF.prototype.getDecree = function () {
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
        CatalogsF.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        CatalogsF.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };
        CatalogsF.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        CatalogsF.prototype.age = function () {
            var now = moment();
            var event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        CatalogsF.prototype.getListUrl = function () {
            return '/dog/catalogs';
        };
        CatalogsF.prototype.getEditUrl = function (id) {
            // console.log('getEditUrl /dog/catalogs/edit/', id);
            return '/dog/catalogs/edit/' + id;
        };
        CatalogsF.prototype.getShowUrl = function (id) {
            // console.log('getShowUrl /dog/catalog/', id);

            return '/dog/catalog/' + id;

        };
        CatalogsF.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        CatalogsF.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        // CatalogsF.prototype.forrbidden = function () {
        //     return ' - уволены';
        // };
        return CatalogsF;
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
