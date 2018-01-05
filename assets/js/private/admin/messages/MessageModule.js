angular.module('MessageModule', ['ui.router', 'toastr', 'ngResource', 'angularFileUpload', 'ngAnimate', 'ng-fx', 'angularMoment'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.messages', {
                url: '/messages',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/list.tpl.html',
                        controller: 'ListMessageController'
                    },


                    // Абсолютное позиционирование вида 'workView' в  состоянии home.admin.messages.
                    // <div ui-view='actionView'/> внутри /js/private/admin/messages/tpl/list.tpl.html
                    // "actionView@home.admin.messages" : { }
                    "actionView@home.admin.messages": {templateUrl: '/js/private/admin/messages/views/home.admin.messages.action.html'},

                }
            })
            // .state('home.admin.messages.work', {
            //     url: '/work',
            //     "td@home.admin.messages.work": {templateUrl: '/js/private/admin/messages/views/home.admin.messages.work.html'}
            // })
            .state('home.admin.messages.list', {
                url: '/list',
                views: {
                    'list@home.admin.messages': {
                        templateUrl: '/js/private/admin/messages/views/home.admin.messages.list.html',
                        controller: 'ListMessageController'
                    }
                }
            })
            // .state('home.admin.messages.work', {
            //     url: '/work',
            //     views: {
            //         'list@home.admin.messages': {
            //             templateUrl: '/js/private/admin/messages/views/home.admin.messages.work.html',
            //             controller: 'ListMessageController'
            //         }
            //     }
            // })
            // .state('home.admin.messages.attendance', {
            //     url: '/attendance',
            //     views: {
            //         'attendance@home.admin.messages': {
            //             templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //             controller: 'ListAttendanceController'
            //         }
            //     }
            // })
            .state('home.admin.messages.edit', {
                url: '/edit/:messageId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/edit.tpl.html',
                        controller: 'EditMessageController'
                    }
                }
            })

            .state('home.admin.message', {
                url: '/message/:messageId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/show.tpl.html',
                        controller: 'MessageController'
                    }
                }
            })
            .state('home.admin.messages.create', {
                url: '/create/:messageId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/edit.tpl.html',
                        controller: 'EditMessageController'
                    }
                }
            })

            .state('home.admin.messages.messages', {
                url: '/messages',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/messages.tpl.html',
                        controller: 'MessageMessageController'
                    }
                }
            })
            .state('home.admin.messages.message', {
                url: '/message/:messageId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/messages/tpl/messages.tpl.html',
                        controller: 'MessageMessageController'
                    }
                }
            })
        // .state('home.admin.messages.administration', {
        //     url: '/administration',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/messages/tpl/administration.tpl.html',
        //             controller: 'AdministrationController'
        //         }
        //     }
        // })
        // .state('home.file.upload', {
        //     url: 'upload',
        //     views: {
        //         '@': {
        //             templateUrl: '/js/private/admin/messages/views/upload.html',
        //             controller: 'EditMessageController'
        //         }
        //     }
        // })
        //.state('home.admin.messages.exit', {
        //    url: '/exit',
        //    views: {
        //        '@': {
        //            templateUrl: '/js/private/admin/messages/tpl/exit.html',
        //            controller: 'EditMessageController'
        //        }
        //    }
        //})
        ;
    })
    .constant('CONF_MODULE_MESSAGE', {baseUrl: '/messages/:messageId'})
    .run(function ($rootScope, $state, $stateParams, amMoment) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        amMoment.changeLocale('ru');
    })
    .factory('Messages', function ($resource, $state, CONF_MODULE_MESSAGE) {
        var Messages = $resource(
            CONF_MODULE_MESSAGE.baseUrl,
            {messageId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );
        Messages.prototype.formatDate = function (date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            if (yy < 10) yy = '0' + yy;
            return yy + '-' + mm + '-' + dd;
        };
        // Messages.prototype.kennelName = function () {
        //     // console.log('this.kennels',this.kennels);
        //     if (this.kennels instanceof Array && this.kennels.length > 0) return this.kennels[0].name;
        //     return 'неизвестен'
        //
        // };

        // Messages.prototype.sireName = function () {
        //     console.log('this.sires', this.sires);
        //     // if(this.kennels instanceof Array && this.kennels.length>0) return this.kennels[0].name ;
        //     return this.sires.kennelName() + ' ' + this.sires.name
        //
        // };
        Messages.prototype.getClasses = function () {
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

        // Messages.prototype.getFullName = function () {
        //     if(this.kennels instanceof Array && (this.kennels.length > 0) && this.kennels[0].rightName){
        //         if (this.kennels instanceof Array && (this.kennels.length > 0) && this.name) {
        //             return this.name+' '+this.kennels[0].name ;
        //         } else {
        //             return this.kennels[0].name ;
        //         }
        //     }else{
        //         if (this.kennels instanceof Array && (this.kennels.length > 0) && this.name) {
        //             return this.kennels[0].name + ' ' + this.name;
        //         } else {
        //             return this.name ;
        //         }
        //     }
        // };

        Messages.prototype.getShortName = function () {
            return this.lastName + ' ' + this.firstName.substr(0, 1) + '.' + this.patronymicName.substr(0, 1) + '.';
        };
        Messages.prototype.sc = function () {
            return this.section;
        };
        Messages.prototype.scs = function () {
            return this.sections;
        };
        Messages.prototype.ok = function () {
            return alert('Сотрудник: ' + this.getFullName() + ' изменён!');
        };
        Messages.prototype.er = function () {
            return alert('ОШИБКА!!! Сотрудник: ' + this.getFullName() + ' - изменения не приняты!');
        };
        Messages.prototype.getTimeBirthday = function () {
            console.log('this.timeBirthday:', this.timeBirthday);
            return this.timeBirthday;
        };


        // Messages.prototype.breederName = function (int) {
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
        // Messages.prototype.ownerName = function (int) {
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
        Messages.prototype.getAvatar = function () {
            return this.avatarUrl;
        };
        Messages.prototype.lastDateSetting = function () {
            return new Date();
        };
        Messages.prototype.getBirthday = function () {
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
        Messages.prototype.getDateWeight = function () {
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
        Messages.prototype.getDeath = function () {
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
        Messages.prototype.getFiredDate = function () {
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
        Messages.prototype.getDecree = function () {
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
        Messages.prototype.getCreatedAt = function () {
            if (!this.createdAt) {
                return 'Mongo import';
            }
            return this.createdAt;
        };
        Messages.prototype.getCurrentDate = function () {
            var t = this.formatDate(new Date());
            return t;
        };


        Messages.prototype.periodWork = function () {
            var now = moment();
            var event = moment(this.dateInWork, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };

        Messages.prototype.age = function () {
            var now = moment();
            var event = moment(this.birthday, ["DD.MM.YYYY"]);

            //console.log('Сегодня: ' + now.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Дата события: ' + event.format('YYYY-MM-DD HH:mm:ss'));
            //console.log('Событие произошло ' + event.fromNow());
            //console.log('Разница во времени: ' +moment.preciseDiff(now, event));
            return moment.preciseDiff(now, event);
            //return  moment(this.dateInWork,["DD.MM.YYYY"]).fromNow(true);
        };
        Messages.prototype.getListUrl = function () {
            return '/admin/messages';
        };
        Messages.prototype.getEditUrl = function (id) {
            return '/admin/messages/edit/' + id;
        };
        Messages.prototype.getShowUrl = function (id, me) {
           if (!me) return   '/admin/message/' + id;
            if( (me.hasOwnProperty('admin') && me.admin ) || (me.hasOwnProperty('kadr') &&  me.kadr) ){
                return '/admin/message/' + id;
            }

            return '/dogs/message/' + id;

        };



        Messages.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Messages.prototype.getContact = function (type) {
            for (var i in this.contacts) {
                if (this.contacts[i].type === type) {
                    return this.contacts[i].value;
                    //return this.contacts[i].type + ': ' + this.contacts[i].value;
                }
            }
        };
        Messages.prototype.forrbidden = function () {
            return ' - уволены';
        };
        return Messages;
    })
    // .directive('unknownValueError', function () {
    //     return {
    //         require: ['ngModel', 'select'],
    //         link: function (scope, element, attrs, ctrls) {
    //             let ngModelCtrl = ctrls[0]; // ангулар модель выбрана элемента select
    //             /**
    //              *  выбран сам элемент select со страницы, т.е. его контроллер (SelectController),
    //              *  для внесения изменений в логику контроллера(управления) выбором (option)
    //              */
    //             let selectCtrl = ctrls[1];
    //             console.log('ngModelCtrl', ngModelCtrl);
    //             console.log('selectCtrl', selectCtrl);
    //
    //             /**
    //              *  ВНИАМАНИЕ!!
    //              *  https://docs.angularjs.org/api/ng/type/select.SelectController
    //              *  В документации не верно указаны функции контроллера (SelectController), для Angular 1.6
    //              *  они не актуальны, следует смотреть методы конкретно по объекту.
    //              *  $isUnknownOptionSelected() в 1.6  это unselectEmptyOption()
    //              */
    //             ngModelCtrl.$validators.unknownValue = function (modelValue, viewValue) {
    //                 console.log('selectCtrl.readValue()', selectCtrl.readValue());
    //                 console.log('selectCtrl.unselectEmptyOption()', selectCtrl.unselectEmptyOption());
    //                 console.log('selectCtrl.unknownOption', selectCtrl.unknownOption);
    //                 return (selectCtrl.readValue());
    //                 // condition?true:false or condition?false:true. These expressions may be safely simplified to condition or !condition , respectively.
    //             };
    //         }
    //     }
    // })
    // .directive('unknownValueRequired', function () {
    //     return {
    //         priority: 1, // This directive must run after the required directive has added its validator
    //         require: ['ngModel', 'select'],
    //         link: function (scope, element, attrs, ctrls) {
    //             var ngModelCtrl = ctrls[0];
    //             var selectCtrl = ctrls[1];
    //
    //             var originalRequiredValidator = ngModelCtrl.$validators.required;
    //
    //             ngModelCtrl.$validators.required = function () {
    //                 if (attrs.required && selectCtrl.$isUnknownOptionSelected()) {
    //                     return false;
    //                 }
    //
    //                 return originalRequiredValidator.apply(this, arguments);
    //             };
    //         }
    //     };
    // })
    // .directive('customSelect', function () {
    //     return {
    //         restrict: "E",
    //         replace: true,
    //         scope: {
    //             'ngModel': '=',
    //             'options': '=',
    //         },
    //         templateUrl: '/js/private/admin/messages/views/select.view.html',
    //         link: function (scope, $element, attributes) {
    //             scope.selectable_options = scope.options;
    //         }
    //     };
    // })



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
