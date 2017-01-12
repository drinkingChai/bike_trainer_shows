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


    User.getUser().then(function success(response) {
      $scope.user = response.data;
    });





    // side menu
    var toggleMenu = function() {
      $('.shows-container .sort-filter').toggleClass('visible');
      $('.shows, .shows-container nav').toggleClass('shift');
      $('.shows-container').toggleClass('freeze-scroll');

      // $('.shows-container .sort-filter').css('top', $('.shows-container').scrollTop());
    }
    var toggleUserMenu = function() {
      $('.shows-container .user-nav').toggleClass('visible');
    }

    $('.shows-container .toggle-filter').click(function() {
      toggleMenu();
    })

    $('.shows-container .toggle-user-nav').click(function() {
      toggleUserMenu();
    })

    $('.shows').click(function() {
      if ($(this).hasClass('shift')) {
        toggleMenu();
      }
    })


    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
