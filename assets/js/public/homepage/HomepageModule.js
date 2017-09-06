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
            var ob = {
                    '50': 'A4BAA0',
                    '100': '9DBA97',
                    '200': '264D1E',
                    '300': '4A5847',
                    '400': 'ef5350',
                    '500': '5C7457',  // '500': 'f44336',
                    '600': '7A8362',  // '600': 'e53935',
                    '700': '5E6350',  // '700': 'd32f2f',
                    '800': '475621',  // '800': 'c62828',
                    '900': 'B7C19D',  // '900': 'b71c1c',
                    'A100': 'B9C1A6', // 'A100': 'ff8a80',
                    'A200': '866568',
                    'A400': '665254',
                    'A700': '592227',
                    'contrastDefaultColor': 'light',    // ли по умолчанию текст (контраст)
                    // на этой палитре должно быть темно или светло

                    'contrastDarkColors': ['50', '100', //оттенки, контраст которых должен быть «темным» по умолчанию
                            '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined    // также может указать это, если по умолчанию был «темный»,
            };
            var ob2={
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
            };
            $mdThemingProvider.definePalette('boggyPaletteName',ob);

            $mdThemingProvider.theme('default')
                .primaryPalette('boggyPaletteName');



            // $mdThemingProvider.theme('default')
        //     .primaryPalette('light-green')
        //     .accentPalette('orange');

        // Отключение темы расцветки елементов библиотеки angular-material
        // https://material.angularjs.org/latest/Theming/03_configuring_a_theme
        // $mdThemingProvider.disableTheming();
});