angular.module('BikeTrainerShows')
  .controller('NewMovieController', function($scope, $location, sources, $routeParams, Movie, Search) {
    Search.get({value: $routeParams.imdbid, type: 'id'}).$promise.then(function(data) {
      $scope.movie = data.result;
    });
    $scope.sources = sources.all;
    $scope.searchTitle = $routeParams.title;
    $scope.newSearch = false;

    // check if the movie in the database already
    Movie.get({id: $routeParams.imdbid}).$promise.then(function(data) {
      if (data._id) {
        $scope.exists = true;
      }
    })

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
      $scope.movieSource = source;
    }
  });
