angular.module('CalendarModule')
    .controller('EditCalendarController', ['$scope', 'toastr', '$translate', '$rootScope', '$http', '$state', 'Calendars', '$stateParams', 'CONF_MODULE',
        function ($scope, toastr, $translate, $rootScope, $http, $state, Calendars, $stateParams) {
            $rootScope.$on('$translateChangeSuccess', function () {
                $translate('TITLE').then(function (translation) {
                    $scope.title = translation;
                }, function (translationId) {
                    $scope.title = translationId;
                });
                $translate('EDIT').then(function (translation) {
                    $scope.edit = translation;
                }, function (translationId) {
                    $scope.edit = translationId;
                });
                $translate('HEADLINE').then(function (translation) {
                    $scope.headline = translation;
                }, function (translationId) {
                    $scope.headline = translationId;
                });
                $translate('CHPU').then(function (translation) {
                    $scope.chpu = translation;
                }, function (translationId) {
                    $scope.chpu = translationId;
                });
                $translate('ATTENDANCE').then(function (translation) {
                    $scope.attendance = translation;
                }, function (translationId) {
                    $scope.attendance = translationId;
                });
                $translate('ACTIVITY').then(function (translation) {
                    $scope.activity = translation;
                }, function (translationId) {
                    $scope.activity = translationId;
                });
                $translate('INFO').then(function (translation) {
                    $scope.info = translation;
                }, function (translationId) {
                    $scope.info = translationId;
                });
                $translate('LOCATION').then(function (translation) {
                    $scope.location = translation;
                }, function (translationId) {
                    $scope.location = translationId;
                });
            });
            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

            $translate('EDIT').then(function (edit) {
                $scope.edit = edit;
            }, function (translationId) {
                $scope.edit = translationId;
            });
            $translate('TITLE').then(function (title) {
                $scope.title = title;
            }, function (translationId) {
                $scope.title = translationId;
            });
            $translate('HEADLINE').then(function (headline) {
                $scope.headline = headline;
            }, function (translationId) {
                $scope.headline = translationId;
            });
            $translate('CHPU').then(function (chpu) {
                $scope.chpu = chpu;
            }, function (translationId) {
                $scope.chpu = translationId;
            });
            $translate('ATTENDANCE').then(function (attendance) {
                $scope.attendance = attendance;
            }, function (translationId) {
                $scope.attendance = translationId;
            });
            $translate('ACTIVITY').then(function (activity) {
                $scope.activity = activity;
            }, function (translationId) {
                $scope.activity = translationId;
            });
            $translate('INFO').then(function (info) {
                $scope.info = info;
            }, function (translationId) {
                $scope.info = translationId;
            });
            $translate('LOCATION').then(function (location) {
                $scope.location = location;
            }, function (translationId) {
                $scope.location = translationId;
            });

            $scope.me = window.SAILS_LOCALS.me;

            // $scope.item.slug = $scope.item.name;
            //$scope.$watch('item.name', function (value) {
            //    var charsRU = [
            //        "а",
            //        "б",
            //        "в",
            //        "г",
            //        "д",
            //        "е",
            //        "ё",
            //        "ж",
            //        "з",
            //        "и",
            //        "й",
            //        "к",
            //        "л",
            //        "м",
            //        "н",
            //        "о",
            //        "п",
            //        "р",
            //        "с",
            //        "т",
            //        "у",
            //        "ф",
            //        "х",
            //        "ц",
            //        "ч",
            //        "ш",
            //        "щ",
            //        "ь",
            //        "ъ",
            //        "э",
            //        "ю",
            //        "я"];
            //    var charsEN = [
            //        'a',
            //        'b',
            //        'v',
            //        'g',
            //        'd',
            //        'e',
            //        'e',
            //        'j',
            //        'z',
            //        'i',
            //        'i',
            //        'k',
            //        'l',
            //        'm',
            //        'n',
            //        'o',
            //        'p',
            //        'r',
            //        's',
            //        't',
            //        'u',
            //        'f',
            //        'h',
            //        'c',
            //        'ch',
            //        'sh',
            //        'cha',
            //        '',
            //        '',
            //        'e',
            //        'yu',
            //        'ya'
            //    ];
            //    if (angular.isDefined(charsEN[charsRU.indexOf(value)])) {
            //        var u = charsEN[charsRU.indexOf(value)];
            //    }
            //    $scope.item.slug =u;
            //
            //
            //});

            // $state.transitionTo('admin.users.show.id');
            // $scope.refresh = function () {
            // return console.log($stateParams.id);
            //console.log("CALENDAR2");
            Calendars.get({id: $stateParams.calendarId},function (calendars) {
                    //console.log("CALENDAR");
                    //console.log(calendars);
                    $scope.item =calendars;
                    $scope.calendars = calendars;
                }, function (err) {
                //console.log('ERRR EDIT');
                //console.log(err);
                
                    if (err) {
                        toastr.error(err, 'Ошибка EditCalendarController!');
                    }
                });
            $scope.refresh = function () {
                var item = $scope.item = Calendars.get({id: $stateParams.calendarId}, 
                    function (calendars) {
                        console.log("CALENDAR");
                        console.log(calendars);
                        $scope.item =calendars;
                    $scope.calendars = calendars;
                }, function (err) {
                    if (err) {
                        toastr.error(err, 'Ошибка EditCalendarController!');
                    }
                });
            };

            $scope.saveEdit = function (item) {
                if (angular.isDefined(item.id)) {
                    //item.$update(item);
                    item.$update(item, function (success) {
                            //toastr.success(err,'Ошибка 2 EditCalendarController!');
                            toastr.success('Данные обновлены!');
                            $scope.refresh();
                            //console.log('SUCCESS: OK!');
                            //item.ok();
                        },
                        function (err) {
                            //console.log('ERROR: ' + err.status);
                            //console.log(err);
                            toastr.error(err, 'Ошибка 3 EditCalendarController!');
                            //item.er();
                        }
                    );
                } else {
                    $scope.refresh();
                    item.$save(item, function (success) {
                            $scope.refresh();
                            console.log('SUCCESS: OK!');
                            item.ok();
                        },
                        function (err) {
                            toastr.error(err, 'Ошибка! Возможно ЧПУ не уникален. EditCalendarController!');
                            //console.log('ERROR: ' + err.status);
                            //console.log(err);
                            item.er('Возможно ЧПУ не уникален.');
                        })
                }
            };

            // $scope.item.contacts = [{type:'phone', value:'1(234) 555-1212'}];

            // $scope.state = /^\w\w$/;
            // $scope.zip = /^\d\d\d\d\d$/;

            $scope.addContact = function () {
                item.contacts.push({type: 'телефон', value: ''});
            };
            $scope.removeContact = function (contact) {
                var contacts = $scope.item.contacts;
                for (var i = 0, ii = contacts.length; i < ii; i++) {
                    if (contact === contacts[i]) {
                        contacts.splice(i, 1);
                    }
                }
            };
            $scope.isCancelDisabled = function () {
                return angular.equals(master, $scope.form);
            };

            $scope.isSaveDisabled = function () {
                return $scope.myForm.$invalid || angular.equals(item, $scope.form);
            };

            $scope.delete = function (item) {
                console.log(item);
                item.$delete(item, function (success) {
                    $scope.refresh();
                    console.log('SUCCESS: OK!');
                    item.ok();
                }, function (err) {
                    console.log('ERROR: ' + err.status);
                    console.log(err);
                    item.er();
                })
            };
            $scope.refresh();
        }]);
