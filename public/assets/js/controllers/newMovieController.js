angular.module('BikeTrainerShows')
  .controller('NewMovieController', function($scope, $routeParams, Movie, SearchId) {
    $scope.movie = SearchId.get({imdbid: $routeParams.imdbid});

    $scope.addMovie = function(imdbid, source, blurb) {
      console.log(source);
      var newMovie = new Movie();
      newMovie.imdbid = imdbid;
      newMovie.source = source || false;
      newMovie.blurb = blurb || false;
      newMovie.$save();
    }
  });
