angular.module('BikeTrainerShows')
  .controller('NewMovieController', function($scope, sources, $routeParams, Movie, SearchId) {
    $scope.movie = SearchId.get({imdbid: $routeParams.imdbid});
    $scope.sources = sources.all;

    $scope.addMovie = function(imdbid, source, blurb) {
      // console.log(source);
      var newMovie = new Movie();
      newMovie.imdbid = imdbid;
      newMovie.source = source || false;
      newMovie.blurb = blurb || false;
      if ($scope.movie.source === "Other") { newMovie.sourceOther = $scope.other; }
      newMovie.$save();
    }

    $scope.setSource = function(source) {
      $scope.movie.source = source;
    }
  });
