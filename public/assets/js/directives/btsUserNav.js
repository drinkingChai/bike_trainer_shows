angular.module('BikeTrainerShows')
  .directive('btsUserNav', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsUserNav.html',
      controller: function($scope, $route, $location, User) {
        //
        // controller for user nav
        $scope.location = $location.path();

        User.getUser().then(function success(response) {
          $scope.user = response.data;
        });

        $scope.logout = function() {
          User.logout();
          $scope.user = null;
          $scope.watchlist = [];
          $route.reload();
          $location.path('/');
        }
      }
    }
  });
