angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, $http, $routeParams, Movie, Search, SearchById) {
    if ($routeParams.title) {
      $scope.title = $routeParams.title;
      $scope.searchResults = Search.get({title: $scope.title});
    };
  });
