angular.module('BikeTrainerShows')
  .controller('UserProfileController', function($scope, $location, $route, User) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
    }, function reject(response) {
      $location.path('/login');
    });

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
      $scope.watchlist = [];
      $route.reload();
      $location.path('/');
    }


    $scope.changePassword = function(username, password, newpassword) {
      if (newpassword.length !== 0 || password.length !== 0) {
        User.changePass(username, password, newpassword).then(function(result) {
          if (result === 'wrong_userpass') {
            $scope.wrongPass = true;
          } else {
            $scope.passwordChanged = true;
          }
        });
      }
    }







  })
