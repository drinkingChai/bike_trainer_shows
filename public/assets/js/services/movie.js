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
  .factory('SearchId', function($resource) {
    // rename this
    return $resource('/movies/new/:imdbid', {id: '@imdbid'})
  })
  .factory('SearchById', function($resource) {
    // rename this
    return $resource('/searchById/:id', {id: '@id'});
  });
