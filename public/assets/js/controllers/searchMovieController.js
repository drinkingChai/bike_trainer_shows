angular.module('BikeTrainerShows')
  .controller('SearchMovieController', function($scope, $location, $routeParams, Movie, Search) {
    if ($routeParams.title) {
      $scope.title = $routeParams.title;
      Search.get({value: $scope.title, type: 'title'}).$promise.then(function(data) {
        $scope.searchResults = data.result;
      });
    };

    $scope.search = function() {
      $location.search({title: $scope.title});
    }











    // freeze scroll
    var toggleMenu = function() {
      $('.search-new-container').toggleClass('freeze-scroll'); //shift the body
    }
    // filter menu
    var toggleLeftMenu = function() {
      $('.shows, .search-new-container nav, form').toggleClass('shift-right'); // shift the body & nav
      $('.search-new-container .sort-filter').toggleClass('visible-left');
      toggleMenu();
    }
    $('.search-new-container .toggle-filter').click(function() {
      toggleLeftMenu();
    })

    // user menu
    var toggleRightMenu = function() {
      $('.shows, .search-new-container nav, form').toggleClass('shift-left'); // shift the body & nav
      $('.search-new-container .user-nav').toggleClass('visible-right');
      toggleMenu();
    }
    $('.search-new-container .toggle-user-nav').click(function() {
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
  });
