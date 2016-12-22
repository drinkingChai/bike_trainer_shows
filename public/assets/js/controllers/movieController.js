angular.module('BikeTrainerShows')
  .controller('MovieController', function($scope, Movie, Search, SearchById) {
    $scope.movies = [];
    Movie.query().$promise.then(function(data) {
      for (var i = 0, l = data.length; i < l; i++) {
        //   SearchById.get({id: id});
        $scope.movies.push(SearchById.get({id: data[i].imdbId}));
      }
      // data.forEach(function(id) {
      // })
    });

    $scope.searchMovies2 = function() {
      // $scope.searchResults = [];
      Search.get({title: $scope.title})
        .$promise.then(function(data) {
          $scope.searchResults = data;
          // data.forEach(function(i) {
          //   console.log(i.title);
          // });
        });
    }

    $scope.addMovie = function(imdbId, source) {
      var newMovie = new Movie();
      newMovie.imdbId = imdbId;
      newMovie.$save();
      $scope.movies.push({imdbId: imdbId});
    }

    // $scope.searchQuery = new Search();
    // $scope.searchMovies = Search.get({id: $scope.searchQuery.title});

  });
