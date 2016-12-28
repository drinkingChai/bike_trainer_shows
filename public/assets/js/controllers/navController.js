angular.module('BikeTrainerShows')
  .controller('NavController', function($scope, $location) {
    $scope.currentLocation = $location.path();
    $scope.$on('$locationChangeStart', function(event) {
      $scope.currentLocation = $location.path();
    });
  });
