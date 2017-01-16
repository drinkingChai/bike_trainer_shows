angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, $location, $routeParams, Movie, Search) {
    if ($routeParams.title) {
      $scope.title = $routeParams.title;
      Search.get({value: $scope.title, type: 'title'}).$promise.then(function(data) {
        $scope.searchResults = data.result;
      });
    };

    // if ($routeParams.title) {
    //   $scope.title = $routeParams.title;
    //   Search.get({value: $scope.title, type: 'title'}).$promise.then(function(data) {
    //     data.result.forEach(function(result) {
    //       Search.get({value: result.imdb, type: 'id'}).$promise.then(function(movie) {
    //         console.log(movie.result);
    //         $scope.searchResults.push(movie.result);
    //       })
    //     })
    //   });
    // };

    $scope.search = function() {
      $location.search({title: $scope.title});
    }
  });
