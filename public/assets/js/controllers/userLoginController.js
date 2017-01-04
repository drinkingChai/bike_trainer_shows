angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User, SearchById) {
    $scope.watchlist = [];

    User.getUser().then(function success(response) {
      $scope.user = response.data;
      getUserMovies(response.data.watchlist);
    });

    $scope.login = function(username, password) {
      User.login(username, password).then(function success(response) {
        $scope.user = response.data.user;
        User.getUser().then(function success(res) {
          getUserMovies(res.data.watchlist);
        });
      });
    }

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
      $scope.watchlist = [];
    }

    $scope.removeChecklist = function(imdbid) {
      User.removeMovie(imdbid);
    }

    var getUserMovies = function(watchlist) {
      for (var i = 0, l = watchlist.length, m = watchlist; i < l; i++) {
        SearchById.get({id: m[i]}).$promise.then(function(data) {
          $scope.watchlist.push(data);
        })
      }
    }


  })
