angular.module('BikeTrainerShows')
  .directive('btsShowCard', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        movie: '='
      },
      templateUrl: 'assets/templates/directives/btsShowCard.html',
      controller: function($scope, User) {
        $scope.watchlist = [];

        User.getUser().then(function success(response) {
          $scope.user = response.data;
          $scope.watchlist = response.data.watchlist;
        });

        $scope.addToWatchlist = function(imdbid) {
          User.addMovie(imdbid);
          $scope.watchlist.push(imdbid);
        }

        $scope.removeFrmWatchlist = function(imdbid) {
          User.removeMovie(imdbid);
          $scope.watchlist.splice($scope.watchlist.indexOf(imdbid), 1);
        }
      }
    }
  })
