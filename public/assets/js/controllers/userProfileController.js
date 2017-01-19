angular.module('BikeTrainerShows')
  .controller('UserProfileController', function($scope, $location, $route, User) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
    }, function reject(response) {
      $location.path('/login');
    });

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
      $scope.watchlist = [];
      $route.reload();
      $location.path('/');
    }
  })
