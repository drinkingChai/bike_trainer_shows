angular.module('BikeTrainerShows')
  .directive('btsInput', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsInput.html',
      scope: {
        label: '<',
        type: '<',
        model: '='
      },
      controller: function($scope) {
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
      }
    }
  })
