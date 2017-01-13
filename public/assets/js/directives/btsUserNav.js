angular.module('BikeTrainerShows')
  .directive('btsUserNav', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsUserNav.html',
      controller: function($scope, $route, User) {
        User.getUser().then(function success(response) {
          $scope.user = response.data;
        });


        $scope.logout = function() {
          User.logout();
          $scope.user = null;
          $scope.watchlist = [];
          $route.reload();
        }
      }
    }
  });
