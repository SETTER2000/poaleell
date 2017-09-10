angular.module('FurloughModule')
    .controller('FurloughController', ['$scope', 'toastr', 'Furloughs', '$stateParams',
        function ($scope, toastr, Furloughs, $stateParams) {
            $scope.me = window.SAILS_LOCALS.me;
            if (!$scope.me.kadr && !$scope.me.admin) $state.go('home');
            
            $scope.refresh = function () {
                $scope.item = Furloughs.get({id: $stateParams.furloughId}, function (furloughs) {
                    $scope.users = furloughs;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 211! ' + err.data.message);
                });
            };
            $scope.refresh();
        }]);
