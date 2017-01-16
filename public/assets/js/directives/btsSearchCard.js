angular.module('BikeTrainerShows')
  .directive('btsSearchCard', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        movie: '='
      },
      templateUrl: 'assets/templates/directives/btsSearchCard.html',
      controller: function($scope, User, Movie) {
        $scope.movieIds = [];

        User.getUser().then(function success(response) {
          $scope.user = response.data;
          $scope.watchlist = response.data.watchlist;
        });

        Movie.query().$promise.then(function(movies) {
          for (var i = 0, l = movies.length; i < l; i++) {
            $scope.movieIds.push(movies[i].imdbid);
          }
        });
      }
    }
  })
