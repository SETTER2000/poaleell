angular.module('FurloughModule')
    .controller('FurloughController', ['$scope', 'toastr', 'Furloughs', '$stateParams',
        function ($scope, toastr, Furloughs, $stateParams) {
            $scope.refresh = function () {
                $scope.item = Furloughs.get({id: $stateParams.furloughId}, function (furloughs) {
                    $scope.users = furloughs;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 211! ' + err.data.message);
                });
            };
            $scope.refresh();
        }]);
