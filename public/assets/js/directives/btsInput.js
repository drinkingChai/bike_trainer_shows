angular.module('BikeTrainerShows')
  .directive('btsInput', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsInput.html',
      scope: {
        label: '<',
        type: '<',
        inverted: '<',
        model: '='
      },
      controller: function($scope) {
        $(document).ready(function() {
          if ($('.input-group input').val().length) {
            var $label = $('.input-group label');
            // FIXME: the notransition class isn't working
            $label.addClass('notransition');
            $label.addClass('float');
            $label.removeClass('notransition');
          }
        });

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
