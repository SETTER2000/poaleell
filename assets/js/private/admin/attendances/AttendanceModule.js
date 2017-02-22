angular.module('AttendanceModule', ['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.attendances', {
                url: '/attendances',
                //template:'<h1>Attendances</h1>'
                //controller: function () {
                //
                //}
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
                        controller: 'ListAttendanceController'
                        //template:'<h1>DEPARTAMENT</h1>'
                    }
                }
                //views: {
                //    '@': {
                //        template: function($stateParams) {
                //            return '<div>Category:' + $stateParams.catId + '<ui-view/></div>';
                //        },
                //        controller: function() {}
                //
                //    }
                //}
            })
            .state('home.admin.attendances.edit', {
                url: '/edit/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
            //.state('home.admin.depart', {
            //    url: '/depart/:attendanceId',
            //    views: {
            //        '@': {
            //            templateUrl: '/js/private/admin/attendances/tpl/list.tpl.html',
            //            controller: 'EditAttendanceController'
            //        }
            //    }
            //})
            .state('home.admin.attendance', {
                url: '/attendance/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/show.tpl.html',
                        controller: 'AttendanceController'
                    }
                }
            })
            .state('home.admin.attendances.create', {
                url: '/create/:attendanceId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/attendances/tpl/edit.tpl.html',
                        controller: 'EditAttendanceController'
                    }
                }
            })
        ;
    })
    .constant('CONF_MODULE_Attendance', {baseUrl: '/attendance/:attendanceId'})
    .factory('Attendances', function ($resource, CONF_MODULE_Attendance) {
        var Attendances = $resource(
            CONF_MODULE_Attendance.baseUrl,
            {attendanceId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Attendances.prototype.getFullName = function () {
            //item.employees[0].lname
            return this.employees[0].lname + ' ' + this.employees[0].fname + ' ' + this.employees[0].pname;
        };

        Attendances.prototype.sc = function () {
            return this.section;
        };
        Attendances.prototype.scs = function () {
            return this.sections;
        };

        Attendances.prototype.ok = function () {
            return alert(this.section + ': ' + this.name + ' изменён!');
        };
        Attendances.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.name + ' - изменения не приняты!');
        };
        Attendances.prototype.getListUrl = function () {
            return '/admin/attendances';
        };
        Attendances.prototype.getEditUrl = function (id) {
            return '/admin/attendances/edit/' + id;
        };
        Attendances.prototype.getShowUrl = function (id) {
            return '/admin/attendance/' + id;
        };
        Attendances.prototype.getCreateUrl = function () {
            return '/admin/attendances/create';
        };
        Attendances.prototype.deactivation = function () {
            return ' - деактивирован';
        };
        Attendances.prototype.getNamePage = function () {
            return 'Посещаемость';
        };

        return Attendances;
    })
    .directive("fieldList", function () {
        return function (scope, element, attributes) {
            var data = scope[attributes["fieldList"]];
            var expression = attributes["displayProperty"];
            data.$promise.then(onFulfilled, onRejected);
            function onFulfilled(data) {
                //console.log('PROMISE');
                //console.log(data.length);
                //console.log(data);

                if (angular.isArray(data)) {
                    var e = angular.element("<ol>");
                    element.append(e);
                    for (var i = 0; i < data.length; i++) {

                        // scope.$eval([expression], [locals]) выполняет выражение на текущем scope
                        // [expression] выражение которое нужно выполнить
                        // [locals] объект который содержит переменные для переопределения значений в scope

                        e.append(angular.element('<li>').text(scope.$eval(expression, data[i])));
                        //e.append(angular.element('<li>').text(data[i][expression]));
                    }
                }

            }

            function onRejected(err) {
                console.log(err.message);
            }

        }
    })
    .directive("attendanceList", function () {
        return {
            link: function (scope, element, attributes) {
                scope.data = scope[attributes["attendanceList"]];
                console.log('DIRECTIVES-1:');
                //console.log(scope[attributes["attendanceList"]]);
                console.log(scope.data);
                console.log(scope.length);
                scope.data.$promise.then(rejectFull);

                function rejectFull(t) {
                    scope.data = [];
                    scope.fio = [];
                    //console.log('PROMISE^^^');
                    //console.log(t.length);

                    if (angular.isArray(t) && t.length > 0) {
                        for (var y = 0; y < t.length; y++) {
                            scope.fio.push(t[y].getFullName());

                        }
                        //[{
                        //    fio: [{
                        //        id: t[i].id,
                        //        date: t[i].date,
                        //        time_in: t[i].time_in,
                        //        time_out: t[i].time_out,
                        //        fio: t[i].getFullName()
                        //    }
                        //    ]
                        //}]
                        for (var i = 0; i < t.length; i++) {
                            scope.data.push(
                                {
                                    id: t[i].id,
                                    date: t[i].date,
                                    time_in: t[i].time_in,
                                    time_out: t[i].time_out,
                                    fio: t[i].getFullName()
                                }
                            );
                        }

                        console.log('DATA:');
                        console.log(scope.data);
                    }
                }

                //if (angular.isArray(data) && data.length > 0) {
                //    console.log('DIRECTIVES-2:');
                //    console.log(data.length);
                //    //console.log(data.getFullName());
                //    //console.log(data[0].id);
                //    //var e = angular.element('<tr>');
                //    //element.append(e);
                //    //console.log('DIRECTIVES2:');
                //    //console.log(data);
                //    for (var i = 0; i < data.length; i++) {
                //        console.log('DIRECTIVES23:');
                //        console.log(data[i].id);
                //        newData.push({id: data[i].id});
                //
                //
                //        //(function () {
                //        //    var item = angular.element('<td>');
                //        //    e.append(item);
                //        //    //var index = i;
                //        //    //var watcherFunction = function (watchScope) {
                //        //    //    return watchScope.$eval(expression, data[index]);
                //        //    //};
                //        //    //// scope.$watch - Устанавливаем отслеживание изменений в scope на основе watcherFunction, которая возвращает значение с учетом фильтров.
                //        //    //// Функция будет вызываться каждый раз, когда меняется scope.
                //        //    //// Если функция возвращает новое значение, то элемент отображающий это значение обновляется.
                //        //    //scope.$watch(watcherFunction, function (newValue, oldValue) {
                //        //    //    item.text(newValue);
                //        //    //});
                //        //}());
                //    }
                //
                //}
            },
            restrict: "A",
            templateUrl: function (element, attributes) {
                var list = '/js/private/admin/attendances/tpl/views/view.list.html';
                var table = '/js/private/admin/attendances/tpl/views/view.table.html';
                // выбор внешнего шаблона на основе атрибута template
                return attributes["template"] == "table" ? table : list;
            },
            scope: true  // каждый экземпляр директивы должен работать со своим scope и наследовать scope своего контроллера
            // scope:{} // В данном случае директива создается с изолированным scope - данный scope не участвует в наследовании.

            // true - элемент, которому будет присвоена директива будет заменен разметкой сгенерированной по шаблону
            // false - в элемент, к которому присвоена директива, будет добавлена разметка
            // Для того, чтобы увидеть эффект работы директивы, необходимо открыть инспектор DOM в браузере
            //replace:true
        }
    })

    .directive("customDirective", function () {
        return function (scope, element, attributes) {
            // element - jqLite объект
            var elements = element.children(); // получение всех дочерних элементов
            //console.log('JQL');
            //console.log(elements.length);
            //console.log(elements.eq(1));
            //console.log(elements.eq(1).val());
            for (var i = 0; i < elements.length; i++) {
                //console.log(elements.eq(i).text());
                // если элемент содержит текст Red сделать его красным цветом
                if (elements.eq(i).text() == "Абрамов Александр Павлович") {
                    elements.eq(i).css("color", "red");
                }
            }
        }
    })
    .directive('button', function () {
        return {
            restrict: 'E',
            compile: function (element, attributes) {
                element.addClass('btn');
                if (attributes.type === 'submit') {
                    element.addClass('btn-default');
                }
                if (attributes.size) {
                    element.addClass('btn-' + attributes.size);
                }
            }
        };
    })
    //.directive('pagination', function() {
    //    return {
    //        restrict: 'E',
    //        scope: {
    //            numPages: '=',
    //            currentPage: '=',
    //            onSelectPage: '&'
    //        },
    //        template:
    //        '<nav aria-label="Page navigation">'+
    //        '<ul class="pagination">' +
    //        '<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li>' +
    //        '<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
    //        '<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li>' +
    //        '</ul>' +
    //        '</nav>',
    //        replace: true,
    //        link: function(scope) {
    //            scope.$watch('numPages', function(value) {
    //                scope.pages = [];
    //                for(var i=1;i<=value;i++) {
    //                    scope.pages.push(i);
    //                }
    //                if ( scope.currentPage > value ) {
    //                    scope.selectPage(value);
    //                }
    //            });
    //            scope.noPrevious = function() {
    //                return scope.currentPage === 1;
    //            };
    //            scope.noNext = function() {
    //                return scope.currentPage === scope.numPages;
    //            };
    //            scope.isActive = function(page) {
    //                return scope.currentPage === page;
    //            };
    //
    //            scope.selectPage = function(page) {
    //                if ( ! scope.isActive(page) ) {
    //                    scope.currentPage = page;
    //                    scope.onSelectPage({ page: page });
    //                }
    //            };
    //
    //            scope.selectPrevious = function() {
    //                if ( !scope.noPrevious() ) {
    //                    scope.selectPage(scope.currentPage-1);
    //                }
    //            };
    //            scope.selectNext = function() {
    //                if ( !scope.noNext() ) {
    //                    scope.selectPage(scope.currentPage+1);
    //                }
    //            };
    //        }
    //    };
    //})
    //.directive("attendanceList", function () {
    //    return function (scope, element, attributes) {
    //
    //        var data = scope[attributes["attendanceList"]];
    //        var expression = attributes["displayProperty"];
    //
    //        if (angular.isArray(data)) {
    //            console.log('LENGTH:');
    //            console.log(data);
    //            console.log(data.length);
    //            var e = angular.element("<ul>");
    //            element.append(e);
    //
    //            for (var i = 0; i < data.length; i++) {
    //
    //                // немедленно-запускаемая функция, которая выступает в роли области видимости
    //                // и избежать замыкание на переменной i;
    //                (function () {
    //                    var item = angular.element('<li>');
    //                    e.append(item);
    //                    var index = i;
    //
    //                    var watcherFunction = function (watchScope) {
    //                        return watchScope.$eval(expression, data[index]);
    //                    };
    //
    //                    // scope.$watch - Устанавливаем отслеживание изменений в scope на основе watcherFunction, которая возвращает значение с учетом фильтров.
    //                    // Функция будет вызываться каждый раз, когда меняется scope.
    //                    // Если функция возвращает новое значение, то элемент отображающий это значение обновляется.
    //                    scope.$watch(watcherFunction, function (newValue, oldValue) {
    //                        item.text(newValue);
    //                    });
    //                }());
    //            }
    //        }else{
    //            console.log('NOT ARRAY!!!!');
    //        }
    //    }
    //})
    //.directive("orderedList", function () {
    //    return {
    //        link: function (scope, element, attributes) {
    //            scope.data = scope[attributes["orderedList"]];
    //        },
    //        restrict: "A",
    //        // адрес внешнего файла с шаблоном
    //        templateUrl: "/js/private/admin/attendances/tpl/template.html"
    //    }
    //})
    //.directive("orderedList", function () {
    //    return {
    //        link: function (scope, element, attributes) {
    //            scope.data = scope[attributes["orderedList"]];
    //        },
    //        restrict: "A",
    //        // шаблон для создания разметки
    //        template: "<ol><li ng-repeat='item in data'>{{item.id}}</li></ol>"
    //    }
    //})
    //.directive("orderedList", function () {
    //    // link function - производит связывание директивы и HTML разметки.
    //    // Данная функция вызывается каждый раз когда новый экземпляр директивы создается AngularJS
    //    // Аргументы функции (не предоставляются через Dependecy Injection):
    //    // 1 - scope к которому применяется директива
    //    // 2 - HTML элемент, к которому применяется директива
    //    // 3 - атрибуты HTML элемента
    //    return function (scope, element, attributes) {
    //
    //        var attrValue = attributes["orderedList"];  // получаем значение атрибута (ordered-list="items")
    //        var data = scope[attrValue];                // получаем значение из scope (scope[items])
    //
    //        if (angular.isArray(data)) {
    //            // angular.element - метод преобразовывает строку или DOM элемент в jQuery объект
    //            var e = angular.element("<ol>");
    //            element.append(e); // добавляем ol к элементу для которого установлена директива
    //            for (var i = 0; i < data.length; i++) {
    //                // Создаем li элементы заполняя их данными из массива data
    //                e.append(angular.element('<li>').text(data[i].id));
    //            }
    //        }
    //    }
    //})
    //.directive("orderedList", function () {
    //    return function (scope, element, attributes) {
    //
    //        var data = scope[attributes["orderedList"]];
    //        var expression = attributes["displayProperty"];
    //
    //        if (angular.isArray(data)) {
    //
    //            var e = angular.element("<ul>");
    //            element.append(e);
    //
    //            for (var i = 0; i < data.length; i++) {
    //
    //                // немедленно-запускаемая функция, которая выступает в роли области видимости
    //                // и избежать замыкание на переменной i;
    //                (function () {
    //                    var item = angular.element('<li>');
    //                    e.append(item);
    //                    var index = i;
    //
    //                    var watcherFunction = function (watchScope) {
    //                        return watchScope.$eval(expression, data[index]);
    //                    }
    //
    //                    // scope.$watch - Устанавливаем отслеживание изменений в scope на основе watcherFunction, которая возвращает значение с учетом фильтров.
    //                    // Функция будет вызываться каждый раз, когда меняется scope.
    //                    // Если функция возвращает новое значение, то элемент отображающий это значение обновляется.
    //                    scope.$watch(watcherFunction, function (newValue, oldValue) {
    //                        item.text(newValue);
    //                    });
    //                }());
    //            }
    //        }
    //    }
    //})
    //.filter("agEmployees", function () {
    //
    //    return function (value, nameField) {
    //        // isArray - проверка, что переменная является массивом
    //        // isNumber - проверка, что переменная является числом
    //        if (angular.isArray(value) && angular.isString(nameField)) {
    //
    //            return value[value.employees[0].nameField];
    //            //if (count > value.length || count < 1) {
    //            //    return value;
    //            //} else {
    //            //    return value.slice(count);
    //            //}
    //        } else {
    //            return value;
    //        }
    //    }
    //
    //})
;