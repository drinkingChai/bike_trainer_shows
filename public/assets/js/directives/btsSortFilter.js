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
        $scope.sources = sources.all;
        $scope.sources.sort();
        $scope.genreCheckbox = {};
        $scope.sortOptions = sortOptions.all;
        $scope.prop = '-rating';

        $scope.toggleGenre = function(genre) {
          $scope.genres[genre] = !$scope.genres[genre];
        }

        $scope.reset = function() {
          for (var genre in $scope.genres) {
            $scope.genres[genre] = false;
            $scope.genreCheckbox[genre] = false;
          }
          $scope.source = null;
          $scope.search = "";
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
