angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, $routeParams, Movie, Search, SearchById) {
    $scope.searchMovies2 = function() {
      $scope.searchResults = Search.get({title: $scope.title});
    }

    // console.log($routeParams.title);
    if ($routeParams.title) {
      $scope.title = $routeParams.title;
      $scope.searchMovies2();
    };
  });
