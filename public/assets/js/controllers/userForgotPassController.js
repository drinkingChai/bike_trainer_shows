angular.module('BikeTrainerShows')
  .controller('UserForgotPassController', function($scope, $location, User, Email) {
    User.getUser().then(function success(response) {
      if (response.data) {
        $location.path('watchlist')
      }
    });

    $scope.forgotPassword = function(email) {
      var newemail = new Email();
      newemail.address = email;


      newemail.$save().then(function success(response) {
        $scope.emailsent = true;
      }, function reject(response) {
        console.log('email not found');
      });


      // console.log(email);
    }



  })
