angular.module('BikeTrainerShows')
  .controller('MovieController', function($scope, Movie) {
    $scope.movies = Movie.query();
  });
