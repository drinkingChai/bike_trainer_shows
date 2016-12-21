angular.module('BikeTrainerShows')
  .factory('Movie', function($resource) {
    return $resource('/movies/:id', {id: '@id'});
  });
