angular.module('VacationModule')
    .controller('VacationController', ['$scope', 'toastr', 'Vacations', '$stateParams',
        function ($scope, toastr, Vacations, $stateParams) {
            $scope.refresh = function () {
                $scope.item = Vacations.get({id: $stateParams.vacationId}, function (vacations) {
                    $scope.users = vacations;
                }, function (err) {
                    toastr.error(err.data.details, 'Ошибка - 211! ' + err.data.message);
                });
            };
            $scope.refresh();
        }]);
