angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, $http, $routeParams, Movie, Search) {
    if ($routeParams.title) {
      $scope.title = $routeParams.title;
      Search.get({value: $scope.title, type: 'title'}).$promise.then(function(data) {
        $scope.searchResults = data.result;
      });
    };
  });
