angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User, SearchById, $window, $route) {
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

    var getUserMovies = function(watchlist) {
      for (var i = 0, l = watchlist.length, m = watchlist; i < l; i++) {
        SearchById.get({id: m[i]}).$promise.then(function(data) {
          $scope.watchlist.push(data);
          data.genres.forEach(function(genre) {
            // if (!(genre in $scope.genres)) {
              // $scope.sortedGenres.push(genre);
              // $scope.sortedGenres.sort();
            // }
            $scope.genres[genre] = false;
          })
        })
      }
    }


  })
