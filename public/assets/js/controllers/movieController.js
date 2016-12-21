angular.module('BikeTrainerShows')
  .controller('MovieController', function($scope, Movie, Search) {
    $scope.movies = Movie.query();

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

    $scope.addMovie = function(title, source) {
      var newMovie = new Movie();
      newMovie.title = title;
      newMovie.$save();
      $scope.movies.push({title: title});
    }

    // $scope.searchQuery = new Search();
    // $scope.searchMovies = Search.get({id: $scope.searchQuery.title});

  });
