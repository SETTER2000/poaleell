angular.module('mongodbResource', [])
    .constant('MONGOLAB_CONFIG',{DB_NAME:'holiday'})
    .factory('mongodbResource', function ($http, MONGOLAB_CONFIG) {
        return function (collectionName) {
            var collectionUrl =
                'https://api.mongolab.com/api/1/databases/' +
                MONGOLAB_CONFIG.DB_NAME +
                '/collections/' + collectionName;

            var defaultParams = {apiKey: MONGOLAB_CONFIG.API_KEY};

            var getId = function (data) {
                return data._id.$oid;
            };

            var Resource = function (data) {
                angular.extend(this, data);
            };

            Resource.query = function (params) {
                return $http.get(collectionUrl, {
                    params: angular.extend({
                            q: JSON.stringify({} || params)
                        },
                        defaultParams)
                }).then(function (response) {
                    var result = [];
                    angular.forEach(response.data, function
                        (value, key) {
                        result[key] = new Resource(value);
                    });
                    return result;
                });
            };

            Resource.save = function (data) {
                return $http.post(collectionUrl, data,
                    {params: defaultParams})
                    .then(function (response) {
                        return new Resource(data);
                    });
            };

            Resource.prototype.$save = function (data) {
                return Resource.save(this);
            };

            Resource.remove = function (data) {
                return $http.delete(collectionUrl + '',
                    defaultParams)
                    .then(function (response) {
                        return new Resource(data);
                    });
            };

            Resource.prototype.$remove = function (data) {
                return Resource.remove(this);
            };

            Resource.prototype.$id = function () {
                return getId(this);
            };

            return Resource;
        };
    });