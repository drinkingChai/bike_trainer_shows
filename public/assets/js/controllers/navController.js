angular.module('BikeTrainerShows')
  .controller('NavController', function($scope, User, $route, $location) {
    $scope.currentLocation = $location.path();
    $scope.$on('$locationChangeStart', function(event) {
      $scope.currentLocation = $location.path();
    });

    User.getUser().then(function success(response) {
      $scope.user = response.data;
    });

    $scope.logout = function() {
      User.logout();
      $route.reload();
    }
  });
