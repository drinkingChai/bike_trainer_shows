angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User) {
    $scope.user = new User();
    $scope.login = function() {
      $scope.user.$save().then(function(data) {
        // console.log(data.token);
      });
    }
  })
