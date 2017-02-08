/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 22.12.2016
 * Time: 22:36
 */
angular.module('compareTo', [])
    .directive('compareTo', function compareTo() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch('otherModelValue', function () {
                    ngModel.$validate();
                });
            }
        }
    });