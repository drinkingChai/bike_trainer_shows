angular.module('BikeTrainerShows')
  .controller('NewMovieController', function($scope, $location, sources, $routeParams, Movie, User, Search) {
    User.getUser().then(function success(response) {
      $scope.user = response.data;
    }, function reject(response) {
      $location.path('/');
    });

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
      if (blurb) {
        newMovie.blurb = {
          message: blurb,
          user: $scope.user.username,
          time: new Date()
        }
      } else {
        newMovie.blurb = false;
      }

      if ($scope.movie.source === "Other") { newMovie.sourceOther = $scope.other; }
      newMovie.$save();
      // change this on the back end so it can't be added without authorization

      $scope.exists = true;
      // $location.path('/movies/search');
    }

    $scope.setSource = function(source) {
      $scope.movieSource = source;
    }
  });
