angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User) {
    $scope.login = function(username, password) {
      User.login(username, password);
    }

    $scope.logout = function() {
      User.logout();
    }
  })
