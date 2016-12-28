angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, Movie, Search, SearchById) {
    $scope.searchMovies2 = function() {
      $scope.searchResults = Search.get({title: $scope.title});
    }
  });
