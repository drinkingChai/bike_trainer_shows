angular.module('BikeTrainerShows')
  .controller('UserLoginController', function($scope, User, SearchById) {
    $scope.movies = [];

    User.getUser().then(function success(response) {
      $scope.user = response.data;
      getUserMovies(response.data.movies);
    });

    $scope.login = function(username, password) {
      User.login(username, password).then(function success(response) {
        $scope.user = response.data.user;
        User.getUser().then(function success(res) {
          getUserMovies(res.data.movies);
        });
      });
    }

    $scope.logout = function() {
      User.logout();
      $scope.user = null;
      $scope.movies = [];
    }

    var getUserMovies = function(imdbids) {
      for (var i = 0, l = imdbids.length, m = imdbids; i < l; i++) {
        SearchById.get({id: m[i]}).$promise.then(function(data) {
          $scope.movies.push(data);
        })
      }
    }


  })
