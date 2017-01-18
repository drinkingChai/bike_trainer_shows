angular.module('BikeTrainerShows')
  .factory('Movie', function($resource) {
    return $resource('/movies/:id', {id: '@id'}, {
      'update': {
        method: 'PUT'
      },
      'addcomment': {
        method: 'PUT',
        url: '/movies/addcomment'
      }
    });
  })
  .factory('Search', function($resource) {
    return $resource('/search/:value/:type', {value: '@value', type: '@type'});
  });
