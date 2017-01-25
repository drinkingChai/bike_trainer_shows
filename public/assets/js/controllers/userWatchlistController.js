angular.module('BikeTrainerShows')
  .controller('UserWatchlistController', function($scope, $location, User, Movie) {
    $scope.genres = {};
    $scope.source = null;
    $scope.prop = null;
    $scope.watchlist = [];
    $scope.user = null;

    User.getUser().then(function success(response) {
      $scope.user = response.data;
      getUserMovies(response.data.watchlist);
    }, function reject(response) {
      $location.path('login');
    });

    $scope.removeFrmWatchlist = function(imdbid) {
      User.removeMovie(imdbid);
      $route.reload();
    }


    var getUserMovies = function(watchlist) {
      for (var i = 0, l = watchlist.length, m = watchlist; i < l; i++) {
        Movie.get({id: m[i]}).$promise.then(function(result) {
          $scope.watchlist.push(result);
          var genres = result.imdbData.genres.split(', ');
          genres.forEach(function(genre) {
            $scope.genres[genre] = false;
          })
        })
      }
    }














    // freeze scroll
    var toggleMenu = function() {
      $('.user.watchlist').toggleClass('freeze-scroll'); //shift the body
    }
    // filter menu
    var toggleLeftMenu = function() {
      $('.shows, .user.watchlist nav').toggleClass('shift-right'); // shift the body & nav
      $('.user.watchlist .sort-filter').toggleClass('visible-left');
      toggleMenu();
    }
    $('.user.watchlist .toggle-filter').click(function() {
      toggleLeftMenu();
    })

    // user menu
    var toggleRightMenu = function() {
      $('.shows, .user.watchlist nav').toggleClass('shift-left'); // shift the body & nav
      $('.user.watchlist .user-nav').toggleClass('visible-right');
      toggleMenu();
    }
    $('.user.watchlist .toggle-user-nav').click(function() {
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

  })
