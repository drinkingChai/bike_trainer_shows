angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, Movie, Search, SearchById, sources) {
    $scope.sort = 'runtime_ascending';
    $scope.movies = [];
    $scope.genres = {};
    $scope.genreCheckbox = {};
    $scope.sources = sources.all;
    $scope.source = null;
    $scope.propertyName = null;

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

    $scope.resetGenre = function() {
      for (var genre in $scope.genres) {
        $scope.genres[genre] = false;
        $scope.genreCheckbox[genre] = false;
      }
    }

    $scope.sortBy = function(propertyName, reverse) {
      $scope.propertyName = reverse? '-'+propertyName : propertyName;
    }

    $scope.setSource = function(source) {
      $scope.source = source;
    }

  });
