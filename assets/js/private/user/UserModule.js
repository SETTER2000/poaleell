angular.module('UserModule', ['toastr', 'ngResource'])
    .constant('CONF_MODULE', {baseUrl: 'http://localhost:1337/user/:id'})
    .factory('Users', function ($resource, CONF_MODULE) {
        var Users = $resource(
            CONF_MODULE.baseUrl,
            {id: '@_id'}
            // Определяем собственный метод update на обоих уровнях, класса и экземпляра
            // {
            //     update: {method: 'PUT'}
            // }
        );
        Users.prototype.getFullName = function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        };
        return Users;
    });