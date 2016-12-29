angular.module('BikeTrainerShows')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/templates/movies/index.html',
        controller: 'MovieIndexController'
      })
      .when('/movies/search', {
        templateUrl: 'assets/templates/movies/search.html',
        controller: 'SearchMovieController'
      })
      .when('/movies/search/:title', {
        templateUrl: 'assets/templates/movies/search.html',
        controller: 'SearchMovieController'
      })
      .when('/movies/new/:imdbid/:title', {
        templateUrl: 'assets/templates/movies/new.html',
        controller: 'NewMovieController'
      })
  });
