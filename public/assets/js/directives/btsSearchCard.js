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
        //
        // searches through the current list and adds to an array
        // the card will compare against the array to check if it's already in the db
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
