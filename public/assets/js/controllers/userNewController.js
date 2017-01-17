angular.module('BikeTrainerShows')
  .controller('UserNewController', function($scope, User) {
    $scope.newUser = function(user) {
      $scope.submitted = true;

      if (user === undefined) {
        return;
      } else if (user.password !== $scope.password2) {
        // change this to server side
        return;
      }

      User.new(user);
    }
  })
