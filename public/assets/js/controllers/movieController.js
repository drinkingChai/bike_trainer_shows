angular.module('BikeTrainerShows')
  .controller('MovieController', function($scope, Movie, Search) {
    $scope.movies = Movie.query();
    $scope.search = function(title) {
      $scope.searchResults = Search.post(title);
    }
  });
