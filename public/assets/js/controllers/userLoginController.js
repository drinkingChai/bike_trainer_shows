angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User, Movie, $window, $route) {
    $scope.genres = {};
    $scope.source = null;
    $scope.prop = null;
    $scope.watchlist = [];
    $scope.user = null;

    User.getUser().then(function success(response) {
      $scope.user = response.data;
      getUserMovies(response.data.watchlist);
    });

    $scope.login = function(username, password) {
      User.login(username.toLowerCase(), password).then(function success(response) {
        $scope.user = response.data.user;
        User.getUser().then(function success(res) {
          getUserMovies(res.data.watchlist);
        });
        $window.location.reload();
      });
    }

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
      $scope.watchlist = [];
    }

    $scope.removeFrmWatchlist = function(imdbid) {
      User.removeMovie(imdbid);
      $route.reload();
    }





    // input float that mimics material design
    $('.input-group label').click(function() {
      $(this).addClass('float');
      $(this).parent().children('input').focus();
    })

    $('.input-group input').focusout(function() {
      if (!$(this).val().length) { // maybe check for whitespaces
        $(this).parent().children('label').removeClass('float');
      }
    })

    $('.input-group input').focusin(function() {
      $(this).parent().children('label').addClass('float');
    })



















    // take this to a separate page
    // on this page, check if user is logged in and if so, route to this page
    var getUserMovies = function(watchlist) {
      for (var i = 0, l = watchlist.length, m = watchlist; i < l; i++) {
        Movie.get({id: m[i]}).$promise.then(function(data) {
          $scope.watchlist.push(data);
          data.genres.forEach(function(genre) {
            $scope.genres[genre] = false;
          })
        })
      }
    }


  })
