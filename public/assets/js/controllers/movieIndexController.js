angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, sources, sortOptions, User, Movie, Search, SearchById) {
    $scope.sort = 'runtime_ascending';
    $scope.movies = [];
    $scope.genres = {};
    $scope.source = null;
    $scope.scrollDisabled = false;
    $scope.watchlist = [];

    $scope.prop = null;

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

    $scope.addMovie = function(imdbid, source, blurb) {
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


    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
