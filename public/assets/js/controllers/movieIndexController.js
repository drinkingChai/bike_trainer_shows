angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, $document, $window, User, Movie, SearchById) {
    $scope.movies = [];
    $scope.genres = {};
    $scope.source = null;
    $scope.prop = null;
    $scope.filterToggle = false;

    Movie.query().$promise.then(function(allMovies) {      var allGenres = [];
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);

          data.genres.forEach(function(genre) {
            // if (!(genre in $scope.genres)) {
              // $scope.sortedGenres.push(genre);
              // $scope.sortedGenres.sort();
            // }
            $scope.genres[genre] = false;
          })
        });

      }
    });

    $document.on('scroll', function() {
      $scope.scrollY = $window.scrollY;
    })

    $scope.toggleMenu = function() {
      $scope.filterToggle = !$scope.filterToggle;
      if ($scope.filterToggle) {
        console.log('menu open');
        $scope.cachedScrollY = $scope.scrollY;
      } else {
        console.log('menu closed');
        // console.log($scope.cachedScrollY);
        $window.scrollTo(0, $scope.cachedScrollY);
      }
    }

    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
