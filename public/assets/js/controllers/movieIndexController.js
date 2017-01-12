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


    // side menu - solution 1
    // $scope.scrollY = 0;
    // $document.on('scroll', function() {
    //   $scope.scrollY = $window.scrollY;
    //   // console.log($scope.scrollY);
    // })
    //
    // $('.shows-container .toggle-filter').click(function() {
    //   $('.shows-container .sort-filter').toggleClass('visible');
    //   $('.shows').toggleClass('shift');
    //
    //   if ($('.shows').hasClass('shift')) {
    //     $('.shows').css('top', -$scope.scrollY);
    //     $scope.cachedScrollY = $scope.scrollY;
    //   } else {
    //     $('.shows').css('top', 0);
    //     setTimeout(function () {
    //       $('body').scrollTo($scope.cachedScrollY);
    //       // $('body').scrollTo(539);
    //     }, 250);
    //   }
    // })






    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
