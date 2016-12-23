angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, Movie, Search, SearchById) {
    $scope.searchMovies2 = function() {
      $scope.searchResults = Search.get({title: $scope.title});
    }

    // $scope.addMovie = function(imdbid, source, blurb) {
    //   console.log(source);
    //   var newMovie = new Movie();
    //   newMovie.imdbid = imdbid;
    //   newMovie.source = source || false;
    //   newMovie.blurb = blurb || false;
    //   newMovie.$save();
    // }
  });
