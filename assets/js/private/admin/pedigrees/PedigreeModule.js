angular.module('PedigreeModule', ['ui.router', 'toastr', 'ngResource', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.pedigrees', {
                url: '/pedigrees',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/pedigrees/tpl/list.tpl.html',
                        controller: 'ListPedigreeController'
                    },

                    // Абсолютное позиционирование вида 'workView' в  состоянии home.admin.pedigrees.
                    // <div ui-view='workView'/> внутри /js/private/admin/pedigrees/tpl/list.tpl.html
                    // "workView@home.admin.pedigrees" : { }
                    "actionView@home.admin.pedigrees": {
                        templateUrl: '/js/private/admin/pedigrees/views/home.pedigrees.action.html'
                    },

                }
            })
            // .state('home.admin.pedigrees.work', {
            //     url: '/work',
            //     "td@home.admin.pedigrees.work": {templateUrl: '/js/private/admin/pedigrees/views/home.admin.pedigrees.work.html'}
            // })
            // .state('home.admin.pedigrees.list', {
            //     url: '/list',
            //     views: {
            //         'list@home.admin.pedigrees': {
            //             templateUrl: '/js/private/admin/pedigrees/views/home.admin.pedigrees.list.html',
            //             controller: 'ListPedigreeController'
            //         }
            //     }
            // })
            // .state('home.admin.pedigrees.work', {
            //     url: '/work',
            //     views: {
            //         'list@home.admin.pedigrees': {
            //             templateUrl: '/js/private/admin/pedigrees/views/home.admin.pedigrees.work.html',
            //             controller: 'ListPedigreeController'
            //         }
            //     }
            // })
            // .state('home.admin.pedigrees.attendance', {
            //     url: '/attendance',
            //     views: {
            //         'attendance@home.admin.pedigrees': {
            //             templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //             controller: 'ListAttendanceController'
            //         }
            //     }
            // })
            .state('home.admin.pedigrees.edit', {
                url: '/edit/:pedigreeId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/pedigrees/tpl/edit.tpl.html',
                        controller: 'EditPedigreeController'
                    }
                }
            })
            //
            .state('home.admin.pedigree', {
                url: '/pedigree/:pedigreeId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/pedigrees/tpl/show.tpl.html',
                        controller: 'PedigreeController'
                    },
                    // Абсолютное позиционирование вида 'formView' в  состоянии home.admin.pedigrees.
                    // <div ui-view='formView'/> внутри /js/private/admin/pedigree/tpl/show.tpl.html
                    // "formView@home.admin.pedigree" : { }
                    // "formView@home.admin.pedigree": {
                    //     templateUrl: '/js/private/admin/messages/views/min.messages.form.html'
                    // },

                }
            })
            //
            .state('home.admin.pedigrees.create', {
                url: '/create/:pedigreeId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/pedigrees/tpl/edit.tpl.html',
                        controller: 'EditPedigreeController'
                    }
                }
            })


        // .state('home.admin.pedigrees.administration', {
        //     url: '/administration',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/pedigrees/tpl/administration.tpl.html',
        //             controller: 'AdministrationController'
        //         }
        //     }
        // })
        // .state('home.file.upload', {
        //     url: 'upload',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/pedigrees/views/upload.html',
        //             controller: 'EditPedigreeController'
        //         }
        //     }
        // })
        //.state('home.admin.pedigrees.exit', {
        //    url: '/exit',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/pedigrees/tpl/exit.html',
        //            controller: 'EditPedigreeController'
        //        }
        //    }
        //})
        ;
    })
    .constant('CONF_MODULE_PEDIGREE', {baseUrl: '/pedigrees/:pedigreeId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Pedigrees', function ($resource, $state, CONF_MODULE_PEDIGREE) {
        var Pedigrees = $resource(
            CONF_MODULE_PEDIGREE.baseUrl,
            {pedigreeId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Pedigrees.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };
        Pedigrees.prototype.kennelName = function () {
            // console.log('this.kennels',this.kennels);
            if (this.kennels instanceof Array && this.kennels.length > 0) return this.kennels[0].name;
            return 'неизвестен'

        };



        Pedigrees.prototype.sireName = function () {
            console.log('this.sires', this.sires);
            // if(this.kennels instanceof Array && this.kennels.length>0) return this.kennels[0].name ;
            return this.sires.kennelName() + ' ' + this.sires.name

        };
        Pedigrees.prototype.getClasses = function () {
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

        Pedigrees.prototype.getFullName = function () {
            return this.name;
        };

        Pedigrees.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        Pedigrees.prototype.sc = function () {
            return this.section;
        };
        Pedigrees.prototype.scs = function () {
            return this.sections;
        };
        Pedigrees.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Pedigrees.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        // Pedigrees.prototype.getTimeBirthday = function () {
        //     console.log('this.timeBirthday:', this.timeBirthday);
        //     return this.timeBirthday;
        // };


        // Pedigrees.prototype.breederName = function (int) {
        //     let t = '';
        //     if (int) {
        //         this.breeders.forEach(function (item, i, arr) {
        //             t += (i >= 1) ? ', ' : '';
        //             t += item.lastName + ' ' + item.firstName;
        //             t += (item.patronymicName) ? ' ' + item.patronymicName : '';
        //
        //         });
        //     } else {
        //         this.breeders.forEach(function (item, i, arr) {
        //             t += (i >= 1) ? ', ' : '';
        //             t += item.lastName + ' ' + item.firstName[0] + '.';
        //             t += (item.patronymicName[0]) ? ' ' + item.patronymicName[0] + '.' : '';
        //
        //         });
        //     }
        //     return t;
        // };
        // Pedigrees.prototype.ownerName = function (int) {
        //     let t = '';
        //     if (int) {
        //         this.owners.forEach(function (item, i, arr) {
        //             t += (i >= 1) ? ', ' : '';
        //             t += item.lastName + ' ' + item.firstName;
        //             t += (item.patronymicName) ? ' ' + item.patronymicName : '';
        //         });
        //     } else {
        //         this.owners.forEach(function (item, i, arr) {
        //             t += (i >= 1) ? ', ' : '';
        //             t += item.lastName + ' ' + item.firstName[0] + '.';
        //             t += (item.patronymicName[0]) ? ' ' + item.patronymicName[0] + '.' : '';
        //         });
        //     }
        //     return t;
        // };
        Pedigrees.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        Pedigrees.prototype.lastDateSetting = function () {
            return new Date();
        };
        Pedigrees.prototype.getBirthday = function () {
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
        Pedigrees.prototype.getDateWeight = function () {
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
        Pedigrees.prototype.getDeath = function () {
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
        Pedigrees.prototype.getFiredDate = function () {
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
        Pedigrees.prototype.getDecree = function () {
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
        Pedigrees.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Pedigrees.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };


        Pedigrees.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };

        Pedigrees.prototype.age = function () {
            let now = moment();
            let event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Pedigrees.prototype.getListUrl = function () {
            return '/admin/pedigrees';
        };
        Pedigrees.prototype.getEditUrl = function (id) {

            return '/admin/pedigrees/edit/' + id;
        };
        Pedigrees.prototype.getShowUrl = function (id) {
            return '/admin/pedigree/' + id;

        };

        Pedigrees.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Pedigrees.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Pedigrees.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Pedigrees;
    })




    /**
     * Это не я.
     * Фильтр выбрасывает меня из папы или из мамы
     * Я не могу быть сам себе родителем )
     */
    // .filter('itsNotMe', function () {
    //     return function (value, param) {
    //         if (angular.isArray(value) && angular.isString(param)) {
    //             // console.log('GENDER PAPA77:', value);
    //             let ar = [];
    //             for (let item in value) {
    //                 // console.log('GENDER ITEM ID:', value[item].id);
    //                 if (value[item].id !== param) ar.push(value[item]);
    //                 // console.log('Это оно 101!!:', value[item]);
    //             }
    //             return ar;
    //
    //         }
    //     }
    // })


;
