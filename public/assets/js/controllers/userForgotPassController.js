angular.module('BikeTrainerShows')
  .controller('UserForgotPassController', function($scope, User) {
    User.getUser().then(function success(response) {
      if (response.data) {
        $location.path('watchlist')
      }
    });

    $scope.forgotPassword = function(email) {
      console.log(email);
    }



  })
