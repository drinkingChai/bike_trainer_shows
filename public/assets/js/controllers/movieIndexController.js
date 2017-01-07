angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, User, Movie, SearchById) {
    $scope.movies = [];
    $scope.genres = {};
    $scope.source = null;
    $scope.prop = null;

    Movie.query().$promise.then(function(allMovies) {      var allGenres = [];
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);

          data.genres.forEach(function(genre) {
            // if (!(genre in $scope.genres)) {
              // $scope.sortedGenres.push(genre);
              // $scope.sortedGenres.sort();
            // }
            $scope.genres[genre] = false;
          })
        });

      }
    });

    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
