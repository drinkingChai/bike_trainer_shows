angular.module('BikeTrainerShows')
  .factory('Email', function($resource) {
    return $resource('/email/:uniquekey', {uniquekey: '@uniquekey'});
  })
