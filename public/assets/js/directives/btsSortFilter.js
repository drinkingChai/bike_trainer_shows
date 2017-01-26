angular.module('BikeTrainerShows')
  .directive('btsSortFilter', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/btsSortFilter.html',
      scope: {
        source: '=',
        genres: '=',
        genre: '=',
        prop: '='
      },
      controller: function($scope, sources, sortOptions) {
        //
        // sort and filter options
        // two way bindings of source, genres, current genre and sort properties
        // param $scope.source @string
        // param $scope.genres @object
        // param $scope.genre @string
        // param $scope.prop @string
        $scope.sources = sources.all;
        $scope.sources.sort();
        $scope.genreCheckbox = {};
        $scope.sortOptions = sortOptions.all;
        $scope.prop = '-runtime';
        $scope.genres['All'] = true;

        $scope.reset = function() {
          for (var genre in $scope.genres) {
            $scope.genres[genre] = false;
            $scope.genreCheckbox[genre] = false;
          }
          $scope.source = null;
          $scope.search = "";
        }

        $scope.toggleGenre = function(genre) {
          $scope.genres[genre] = !$scope.genres[genre];
          if (genre !== 'All') {
            $scope.genres['All'] = false;
          }
        }

        $scope.sortBy = function(propertyName) {
          $scope.prop = propertyName;
        }

        $scope.setSource = function(source) {
          $scope.source = source;
        }
      }
    }
  });
