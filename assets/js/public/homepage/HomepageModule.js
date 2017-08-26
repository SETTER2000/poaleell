/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 24.12.2016
 * Time: 0:30
 */
angular.module('HomepageModule', ['toastr','compareTo','ngMaterial'])
    .config(function($mdThemingProvider) {
        // Отключение темы расцветки елементов библиотеки angular-material
        // https://material.angularjs.org/latest/Theming/03_configuring_a_theme
    $mdThemingProvider.disableTheming();
});