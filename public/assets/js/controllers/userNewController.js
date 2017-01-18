angular.module('BikeTrainerShows')
  .controller('UserNewController', function($scope, $location, User) {
    User.getUser().then(function success(response) {
      if (response.data) {
        $location.path('watchlist')
      }
    });

    $scope.newUser = function(user) {
      $scope.submitted = true;

      if (user === undefined) {
        return;
      } else if (user.password !== user.password2) {
        return;
      }

      User.new(user);
      User.login(user.username.toLowerCase(), user.password);
      // needs to reload
      // $location.path('watchlist');
      $location.path('profile');
    }
  })
