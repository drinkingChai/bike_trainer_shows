angular.module('BikeTrainerShows')
  .controller('MovieCommentController', function($scope, $routeParams, $timeout, immersionRatings, Movie, User) {
    $scope.immersionRatings = immersionRatings.all;
    $scope.userRating = false;

    User.getUser().then(function success(response) {
      $scope.user = response.data;
    });


    $timeout(Movie.get({id: $routeParams.imdbid}).$promise.then(function(response) {
      $scope.movie = response;

      if ($scope.user) {
        for (var i = 0, immersions = response.immersions, l = response.immersions.length; i < l; i++) {
          if (immersions[i].user === $scope.user.username) {
            $scope.userRating = immersions[i].rating;
            break;
          }
        }
      }
    }), 500);


    $scope.addComment = function() {
      var movie = new Movie();
      movie.imdbid = $scope.movie.imdbid;
      movie.newComment = {
        message: $scope.newComment,
        user: $scope.user.username,
        time: new Date()
      }
      movie.$addcomment();

      $scope.movie.comments.push(movie.newComment);
      $scope.newComment = "";
    }


    $scope.addupdateImmersion = function() {
      var movie = new Movie();
      movie.imdbid = $scope.movie.imdbid;
      movie.newImmersion = {
        rating: $scope.userRating,
        user: $scope.user.username,
        time: new Date()
      }
      movie.$addupdateimmersion();
    }















    // freeze scroll
    var toggleMenu = function() {
      $('.show-comments').toggleClass('freeze-scroll'); //shift the body
    }

    // user menu
    var toggleRightMenu = function() {
      $('.show-comments .inner, .show-comments nav').toggleClass('shift-left'); // shift the body & navlass('shift-left');
      $('.show-comments .user-nav').toggleClass('visible-right');
      toggleMenu();
    }
    $('.show-comments .toggle-user-nav').click(function() {
      toggleRightMenu();
    })
    //unfreeze scroll
    $('.show-comments .inner, show-comments nav').click(function() {
      if ($(this).hasClass('shift-right')) {
        toggleLeftMenu();
      } else if ($(this).hasClass('shift-left')) {
        toggleRightMenu();
      }
    })
  })
