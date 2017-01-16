angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, $location, User, Movie, $window, $route) {
    User.getUser().then(function success(response) {
      if (response.data) {
        $location.path('watchlist')
      }
    });

    $scope.login = function(username, password) {
      User.login(username.toLowerCase(), password).then(function success(response) {
        if (response.data) {
          $location.path('watchlist');
        }
        // else show error
      });
    }
  })
