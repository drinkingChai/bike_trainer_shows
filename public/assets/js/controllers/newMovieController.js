angular.module('BikeTrainerShows')
  .controller('NewMovieController', function($scope, $location, sources, $routeParams, Movie, SearchId, SearchById, Exists) {
    $scope.movie = SearchId.get({imdbid: $routeParams.imdbid});
    $scope.sources = sources.all;
    $scope.searchTitle = $routeParams.title;
    $scope.newSearch = false;

    // Exists.get({imdbid: $routeParams.imdbid}).$promise.then(function(data) {
    //   $scope.exists = data.exists;
    // })

    $scope.addMovie = function(imdbid, source, blurb) {
      var newMovie = new Movie();
      newMovie.imdbData = $scope.movie;
      newMovie.source = source || false;
      newMovie.blurb = blurb || false;
      if ($scope.movie.source === "Other") { newMovie.sourceOther = $scope.other; }
      newMovie.$save();

      $scope.exists = true;
      // $location.path('/movies/search');
    }

    $scope.setSource = function(source) {
      $scope.movie.source = source;
    }
  });
