angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, Movie, Search, SearchById) {
    $scope.sort = 'runtime_ascending';
    $scope.movies = [];
    $scope.genres = {};

    Movie.query().$promise.then(function(allMovies) {      var allGenres = [];
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);

          data.genres.forEach(function(genre) {
            $scope.genres[genre] = false;
          })
        });

      }
    });

    $scope.addMovie = function(imdbid, source, blurb) {
      console.log(source);
      var newMovie = new Movie();
      newMovie.imdbid = imdbid;
      newMovie.source = source || false;
      newMovie.blurb = blurb || false;
      newMovie.$save();
      $scope.movies.push({
        imdbid: imdbid,
        source: source
      });
    }


    $scope.deleteMovie = function(imdbid) {
      Movie.delete({id: imdbid});
    }

    $scope.toggleGenre = function(genre) {
      $scope.genres[genre] = !$scope.genres[genre];
    }

  });
