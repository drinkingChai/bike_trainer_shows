angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, $location, User, Movie, $window, $route) {
    User.getUser().then(function success(response) {
      if (response.data) {
        $location.path('watchlist')
      }
    });

    $scope.login = function(username, password) {
      if (!username || !password ||
        username.indexOf(' ') !== -1) {
        $scope.wrongUserPass = true;
        return;
      }

      User.login(username.toLowerCase(), password).then(function success(response) {
        if (response === 'wrong_userpass') {
          $scope.wrongUserPass = true;
        } else {
          $location.path('watchlist');
        }
      });
    }
  })
