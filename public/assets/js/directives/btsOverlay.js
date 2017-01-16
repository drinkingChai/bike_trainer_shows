angular.module('BikeTrainerShows')
  .directive('btsOverlay', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsOverlay.html',
      scope: {
        message: '<',
        nexturl: '<'
      }
    }
  })
