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
      } else if (!user.password || user.password !== user.password2) {
        return;
      }

      User.new(user).then(function success(response) {
        User.login(user.username.toLowerCase(), user.password).then(function(response) {
          $location.path('profile');
        });
      }, function reject(response) {
        return;
      });
    }
  })
