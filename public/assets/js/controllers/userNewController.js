angular.module('BikeTrainerShows')
  .controller('UserNewController', function($scope, User) {
    $scope.newUser = function(user) {
      User.new(user);
    }
  })
