angular.module('BikeTrainerShows')
  .factory('Movie', function($resource) {
    return $resource('/movies/:id', {id: '@id'});
  })
  .factory('Search', function($resource) {
    return $resource('/search/:value/:type', {value: '@value', type: '@type'});
  });
