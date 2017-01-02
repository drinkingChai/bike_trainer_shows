angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
    });

    $scope.login = function(username, password) {
      User.login(username, password).then(function success(response) {
        $scope.user = response.data.user;
      });
    }

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
    }
  })
