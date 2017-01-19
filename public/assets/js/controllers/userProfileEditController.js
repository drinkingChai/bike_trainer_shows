angular.module('BikeTrainerShows')
  .controller('UserProfileEditController', function($scope, $location, User) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
    }, function reject(response) {
      $location.path('/login');
    });


    $scope.changePassword = function(username, currentPassword, newpassword1, newpassword2) {
      User.changePass(username, currentPassword, newpassword1, newpassword2).then(function success(response) {
        if (response.error) {
          $scope.passchanged = false;
          $scope.wrongPass = true;
        } else {
          $scope.passchanged = true;
        }
      });
    }

    $scope.changeEmail = function(username, newemail) {
      User.changeEmail(username, newemail).then(function(response) {
        $scope.emailchanged = true;
      });
    }

  })
