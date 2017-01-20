angular.module('BikeTrainerShows')
  .directive('btsOverlay', function() {
    //
    // overlay displays a message
    // and a button that goes to nexturl
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
