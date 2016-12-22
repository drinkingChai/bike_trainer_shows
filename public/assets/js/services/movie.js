angular.module('BikeTrainerShows')
  .factory('Movie', function($resource) {
    return $resource('/movies/:id', {id: '@id'});
  })
  .factory('Search', function($resource) {
    return $resource('/search/:title', {title: '@title'}, {
      'get': {
        method: 'GET',
        // transformResponse: function(data) {
        //   console.log(data);
        // },
        isArray: true
      }
    });
  })
  .factory('SearchById', function($resource) {
    return $resource('/searchById/:id', {id: '@id'});
  });
