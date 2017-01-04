angular.module('BikeTrainerShows')
  .controller('UserNewController', function($scope, User) {
    $scope.newUser = function(username, password) {
      User.new(username, password);
    }
  })
