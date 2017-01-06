angular.module('BikeTrainerShows')
  .directive('btsShowCard', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        movie: '='
      },
      templateUrl: 'assets/templates/directives/btsShowCard.html'
    }
  })
