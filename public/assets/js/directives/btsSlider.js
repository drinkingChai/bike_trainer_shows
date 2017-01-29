angular.module('BikeTrainerShows')
  .directive('btsSlider', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsSlider.html',
      scope: {
        numbuttons: '<',
        currentvalue: '='
      },
      controller: function($scope) {
        $scope.numButtonsArray = [];
        for (var i = 0; i < $scope.numbuttons; i++) {
          $scope.numButtonsArray.push(i);
        }


        $scope.slide = function($event, index) {
          $target = $($event.currentTarget);
          var children = $target.parent().children(),
            width = Math.floor(index * 100/ ($scope.numbuttons  - 1)) + '%'; // -1 since there are 1 less bar than dots

          for (var j = 0; j < $scope.numbuttons; j++) {
            if (j <= index) {
              $(children[j]).addClass('active');
            } else {
              $(children[j]).removeClass('active');
            }
          }

          $('.slider-trail:nth-child(2)').css('width', width);

          $scope.currentvalue = index;
        }
      }
    }
  })
