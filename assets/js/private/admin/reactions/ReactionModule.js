angular.module('ReactionModule', ['ui.router', 'toastr', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.admin.reactions', {
                url: '/reactions',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/reactions/tpl/list.tpl.html',
                        controller: 'ListReactionController'
                    }
                }
            })
            .state('home.admin.reactions.edit', {
                url: '/edit/:reactionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/reactions/tpl/edit.tpl.html',
                        controller: 'EditReactionController'
                    }
                }
            })
            .state('home.admin.reactions.settings', {
                url: '/settings',
                templateUrl: '/js/private/admin/reactions/views/home.admin.reactions.settings.html',
                controller: 'ListReactionController'
            })
            .state('home.admin.reaction', {
                url: '/reaction/:reactionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/reactions/tpl/show.tpl.html',
                        controller: 'ReactionController'
                    }
                }
            })
            .state('home.admin.reactions.create', {
                url: '/create/:reactionId',
                views: {
                    '@': {
                        templateUrl: '/js/private/admin/reactions/tpl/edit.tpl.html',
                        controller: 'EditReactionController'
                    }
                }
            })

        ;
    })
    .constant('CONF_MODULE_REACTION', {baseUrl: '/reactions/:reactionId'})
    .factory('Reactions', function ($resource, CONF_MODULE_REACTION) {

        var Reactions = $resource(
            CONF_MODULE_REACTION.baseUrl,
            {reactionId: '@id'},
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        Reactions.prototype.formatDate = function (date) {

            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear();
            //var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return yy + '-' + mm + '-' + dd;
            //return dd + '.' + mm + '.' + yy;
        };

        Reactions.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };

        Reactions.prototype.sc = function () {
            return this.section;
        };
        Reactions.prototype.scs = function () {
            return this.sections;
        };

        Reactions.prototype.ok = function () {
            return alert(this.sc() + ': ' + this.name + ' изменёна!');
        };
        Reactions.prototype.er = function () {
            return alert('ОШИБКА!!! ' + this.sc() + ': ' + this.name + ' - изменения не приняты!');
        };
        Reactions.prototype.getListUrl = function () {
            return '/admin/reactions';
        };
        Reactions.prototype.getEditUrl = function (id) {
            return '/admin/reactions/edit/' + id;
        };
        Reactions.prototype.getShowUrl = function (id) {
            return '/admin/reaction/' + id;
        };
        Reactions.prototype.deactivation = function () {
            return ' - деактивирована';
        };
        Reactions.prototype.addPosition = function (item) {
            if (angular.isArray(item.reactions)) {
                item.reactions.push({});
            } else {
                item.reactions = [{}];
            }
            return item;
        };
        Reactions.prototype.arr = [];
        Reactions.prototype.removePosition = function (reaction, item) {
            if (angular.isDefined(reaction) &&
                angular.isDefined(reaction.id)) {
                this.arr.push(reaction.id);
            }
            var reactions = item.reactions;
            for (var i = 0, ii = reactions.length; i < ii; i++) {
                if (reaction === reactions[i]) {
                    reactions.splice(i, 1);
                }
            }
            return item.removeFurlough = this.arr;
        };
        return Reactions;
    })
;

