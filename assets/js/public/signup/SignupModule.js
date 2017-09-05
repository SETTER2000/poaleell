/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 22.12.2016
 * Time: 21:22
 */
angular.module('SignupModule', ['toastr','compareTo','ngMaterial'])
    .config(function($mdThemingProvider) {
    // 6B9577
    // 757b75
    $mdThemingProvider.definePalette('boggyPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': '5C7457',
        // '500': 'f44336',
        '600': 'b0c2af',
        // '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // ли по умолчанию текст (контраст)
        // на этой палитре должно быть темно или светло

        'contrastDarkColors': ['50', '100', //оттенки, контраст которых должен быть «темным» по умолчанию
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // также может указать это, если по умолчанию был «темный»,
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('boggyPaletteName');



    // $mdThemingProvider.theme('default')
    //     .primaryPalette('light-green')
    //     .accentPalette('orange');

    // Отключение темы расцветки елементов библиотеки angular-material
    // https://material.angularjs.org/latest/Theming/03_configuring_a_theme
    // $mdThemingProvider.disableTheming();
});