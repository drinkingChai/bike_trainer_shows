angular.module('BikeTrainerShows')
  .controller('UserNewController', function($scope, User) {
    $scope.newUser = function(user) {
      User.new(user);
    }




    // input float that mimics material design
    $('.input-group label').click(function() {
      $(this).addClass('float');
      $(this).parent().children('input').focus();
    })

    $('.input-group input').focusout(function() {
      if (!$(this).val().length) { // maybe check for whitespaces
        $(this).parent().children('label').removeClass('float');
      }
    })

    $('.input-group input').focusin(function() {
      $(this).parent().children('label').addClass('float');
    })
  })
