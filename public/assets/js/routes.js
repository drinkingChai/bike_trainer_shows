angular.module('BikeTrainerShows')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/templates/movies/index.html',
        controller: 'MovieIndexController'
      })
      .when('/search', {
        templateUrl: 'assets/templates/movies/search.html',
        controller: 'SearchMovieController'
      })
      .when('/search/:title', {
        templateUrl: 'assets/templates/movies/search.html',
        controller: 'SearchMovieController'
      })
      .when('/new/:imdbid', {
        templateUrl: 'assets/templates/movies/new.html',
        controller: 'NewMovieController'
      })
      .when('/login', {
        templateUrl: 'assets/templates/login/index.html',
        controller: 'UserLoginController'
      })
      .when('/login/new', {
        templateUrl: 'assets/templates/login/new.html',
        controller: 'UserNewController'
      })
      .when('/watchlist', {
        templateUrl: 'assets/templates/login/watchlist.html',
        controller: 'UserWatchlistController'
      })
  });
