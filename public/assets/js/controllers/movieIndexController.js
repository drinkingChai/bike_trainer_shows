angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, $document, $route, Movie, SearchById) {
    $scope.movies = [];
    $scope.genres = {};
    $scope.source = null;
    $scope.prop = null;
    $scope.filterToggle = false;

    Movie.query().$promise.then(function(allMovies) {
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);

          data.imdbData.genres.split(',').forEach(function(genre) {
            $scope.genres[genre] = false;
          })
        });
      }
    });








    // freeze scroll
    var toggleMenu = function() {
      $('.shows-container').toggleClass('freeze-scroll'); //shift the body
    }
    // filter menu
    var toggleLeftMenu = function() {
      $('.shows, .shows-container nav').toggleClass('shift-right'); // shift the body & nav
      $('.shows-container .sort-filter').toggleClass('visible-left');
      toggleMenu();
    }
    $('.shows-container .toggle-filter').click(function() {
      toggleLeftMenu();
    })

    // user menu
    var toggleRightMenu = function() {
      $('.shows, .shows-container nav').toggleClass('shift-left'); // shift the body & nav
      $('.shows-container .user-nav').toggleClass('visible-right');
      toggleMenu();
    }
    $('.shows-container .toggle-user-nav').click(function() {
      toggleRightMenu();
    })
    //unfreeze scroll
    $('.shows').click(function() {
      if ($(this).hasClass('shift-right')) {
        toggleLeftMenu();
      } else if ($(this).hasClass('shift-left')) {
        toggleRightMenu();
      }
    })


    // $scope.deleteMovie = function(imdbid) {
    //   Movie.delete({id: imdbid});
    // }

  });
