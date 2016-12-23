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
      .when('/movies/new/:imdbid', {
        templateUrl: 'assets/templates/movies/new.html',
        controller: 'NewMovieController'
      })
  });
