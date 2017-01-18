angular.module('BikeTrainerShows')
  .directive('btsShowCard', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        movie: '='
      },
      templateUrl: 'assets/templates/directives/btsShowCard.html',
      controller: function($scope, User, Movie) {
        $scope.watchlist = [];
        $scope.plotShown = false;

        User.getUser().then(function success(response) {
          $scope.user = response.data;
          $scope.watchlist = response.data.watchlist;
          $scope.likes = response.data.likes;
        });

        $scope.addToWatchlist = function(imdbid) {
          User.addMovie(imdbid);
          $scope.watchlist.push(imdbid);
        }

        $scope.removeFrmWatchlist = function(imdbid) {
          User.removeMovie(imdbid);
          $scope.watchlist.splice($scope.watchlist.indexOf(imdbid), 1);
        }

        $scope.togglePlot = function() {
          $scope.plotShown = !$scope.plotShown;
        }

        // console.log($scope.movie.imdbid);
        $scope.toggleLike = function() {
          var imdbid = $scope.movie.imdbid;
          Movie.get({id: imdbid}).$promise.then(function success(response) {
            var movie = new Movie(response);
            movie.hearts++;
            movie.$update();

            User.likeMovie(imdbid);
            $scope.likes.push(imdbid);

            $scope.movie.hearts++;
          })
        }


        $scope.test = function() {
          
          // Movie.get({id: $scope.movie.imdbid}).$promise.then(function success(response) {
          //   var movie = new Movie(response);
          //   movie.$addcomment();
          // })
        }



      }
    }
  })
