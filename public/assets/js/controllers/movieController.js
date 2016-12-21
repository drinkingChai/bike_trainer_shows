angular.module('BikeTrainerShows')
  .controller('MovieController', function($scope, Movie, Search) {
    $scope.movies = Movie.query();
    $scope.search = new Search();
    $scope.searchMovies = function(search) {
      search.$save();
      // $scope.searchResults = search.$save();
    }

    $scope.searchMovies2 = function() {
      // $scope.searchResults = [];
      Search.get({title: $scope.title})
        .$promise.then(function(data) {
          $scope.searchResults = data;
          // data.forEach(function(i) {
          //   console.log(i.title);
          // });
        });
    }

    // $scope.searchQuery = new Search();
    // $scope.searchMovies = Search.get({id: $scope.searchQuery.title});

  });
