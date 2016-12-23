angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, Movie, Search, SearchById) {
    $scope.movies = [];
    Movie.query().$promise.then(function(allMovies) {
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);
        });

      }
    });

    $scope.searchMovies2 = function() {
      // $scope.searchResults = [];
      $scope.searchResults = Search.get({title: $scope.title});
        // .$promise.then(function(data) {
        //   $scope.searchResults = data;
        //   // data.forEach(function(i) {
        //   //   console.log(i.title);
        //   // });
        // });
    }

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

    // $scope.searchQuery = new Search();
    // $scope.searchMovies = Search.get({id: $scope.searchQuery.title});

  });
