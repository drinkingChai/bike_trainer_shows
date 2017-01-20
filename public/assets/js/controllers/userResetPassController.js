angular.module('BikeTrainerShows')
  .controller('UserResetPassController', function($scope, $routeParams, $location, User, Email) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
      $location.path('watchlist')
    });


    $scope.resetPass = function(newpassword1, newpassword2) {
      var newreset = new Email();
      newreset.newpassword1 = newpassword1;
      newreset.newpassword2 = newpassword2;

      newreset.$save({ uniquekey: $routeParams.uniquekey }).then(function success(result) {
        $scope.passchanged = true;
      }, function reject(result) {
        var message = result.data.message;
        if (message === 'wrong_userpass') {
          $scope.wrongPass = true;
        } else if (message === 'key_expired') {
          $scope.keyexpired = true;
        }
      });
    }
    // newreset.uniquekey = $routeParams.uniquekey;
    // console.log($routeParams.uniquekey);
  })
