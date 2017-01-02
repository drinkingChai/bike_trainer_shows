angular.module('BikeTrainerShows')
  .factory('Movie', function($resource) {
    return $resource('/movies/:id', {id: '@id'});
  })
  .factory('Search', function($resource) {
    return $resource('/movies/search/:title', {title: '@title'}, {
      'get': {
        method: 'GET',
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
    return $resource('/movies/searchById/:id', {id: '@id'});
  })
  .factory('Exists', function($resource) {
    return $resource('/movies/exists/:imdbid', {imdbid: '@imdbid'});
  });
