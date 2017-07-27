angular.module('PositionModule')
    .controller('PositionController', ['$scope', 'toastr', 'Positions', '$stateParams',
        function ($scope, toastr, Positions, $stateParams) {
            $scope.refresh = function () {
                $scope.item = Positions.get({id: $stateParams.positionId}, function (positions) {
                    $scope.users = positions;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 211! ' + err.data.message);
                });
            };
            $scope.refresh();
        }]);
