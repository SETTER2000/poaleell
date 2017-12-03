angular.module('UserFModule', ['ui.router', 'toastr', 'ngResource', 'AttendanceModule', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.dog.users', {
                url: '/users',
                views: {
                    '@': {
                        templateUrl: '/js/private/dog/users/tpl/list.tpl.html',
                        controller: 'ListFController'
                    },
                    "actionView@home.dog.users": {templateUrl: '/js/private/dog/users/views/home.users.action.html'},
                }
            })
            // .state('home.dog.users.settings', {
            //     url: '/settings',
            //     templateUrl: '/js/private/dog/users/views/hom.users.settings.html',
            //     controller: 'ListController'
            // })
            .state('home.dog.users.list', {
                url: '/list',
                views: {
                    'list@home.dog.users': {
                        templateUrl: '/js/private/dog/users/views/home.dog.users.list.html',
                        controller: 'ListFController'
                    }
                }
            })
            .state('home.dog.users.work', {
                url: '/work',
                views: {
                    'list@home.dog.users': {
                        templateUrl: '/js/private/dog/users/views/home.dog.users.work.html',
                        controller: 'ListFController'
                    }
                }
            })
            // .state('home.dog.users.attendance', {
            //     url: '/attendance',
            //     views: {
            //         'attendance@home.dog.users': {
            //             templateUrl: '/js/private/dog/attendances/tpl/list.tpl.html',
            //             controller: 'ListAttendanceFController'
            //         }
            //     }
            // })
            // .state('home.dog.users.edit', {
            //     url: '/edit/:userId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dog/users/tpl/edit.tpl.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
            .state('home.dog.user', {
                url: '/user/:userId',
                views: {
                    '@': {
                        templateUrl: '/js/private/dog/users/tpl/show.tpl.html',
                        controller: 'UserFController'
                    }
                }
            })
            // .state('home.dog.users.create', {
            //     url: '/create/:userId',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dog/users/tpl/edit.tpl.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
            // .state('home.dog.users.administration', {
            //     url: '/administration',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dog/users/tpl/administration.tpl.html',
            //             controller: 'AdministrationController'
            //         }
            //     }
            // })
            // .state('home.file.upload', {
            //     url: 'upload',
            //     views: {
            //         '@': {
            //             templateUrl: '/js/private/dog/users/views/upload.html',
            //             controller: 'EditController'
            //         }
            //     }
            // })
        //.state('home.dog.users.exit', {
        //    url: '/exit',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/dog/users/tpl/exit.html',
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
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
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
                //console.log('TMMM: ', tm);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.birthday = tm;
            }
        };
        Users.prototype.getDateInWork = function () {
            if (this.dateInWork) {
                var tm;
                tm = new Date(this.dateInWork);
                var month = ((+tm.getMonth() + 1) < 10) ? '0' + (+tm.getMonth() + 1) : (+tm.getMonth() + 1);
                var date = (+tm.getDate() < 10) ? '0' + tm.getDate() : tm.getDate();
                //console.log('day: ', tm.getUTCDate());
                tm = date + '.' + month + '.' + tm.getFullYear();
                this.dateInWork = tm;
            }
        };
        Users.prototype.Users = function () {
            var now = moment();
            var event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Users.prototype.getFiredDate = function () {
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
        Users.prototype.getDecree = function () {
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

        Users.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Users.prototype.age = function () {
            var now = moment();
            var event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Users.prototype.getListUrl = function () {
            return '/dog/users';
        };
        Users.prototype.getEditUrl = function (id) {
            return '/dog/users/edit/' + id;
        };
        Users.prototype.getShowUrl = function (id) {
            // return '/dog/user/' + id;
            return (me.dog || me.kadr) ? '/dog/user/' + id : ''
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
    .filter("kennel", function () {
        /**
         * Возвращает массив с объектами заданного питомника
         * Фильтр принимает два параметра
         * объект и login пользователя
         *
         */
        return function (value, name) {
            if (angular.isArray(value) && angular.isString(name)) {
                let ar = [];
                let arId = [];
                for (let item in value) {
                    if (value[item]['breeders'][0]) {
                        if (value[item]['breeders'][0].login === name) {
                            ar.push(value[item]);
                            arId.push(value[item].id);
                        }
                    }
                    if (value[item]['owners'][0] && (arId.indexOf( value[item].id ) == -1)) {

                        if (value[item]['owners'][0].login === name) ar.push(value[item]);
                    }
                }
                return ar;
            } else {
                return value;
            }
        }
    })

;
