angular.module('BikeTrainerShows')
  .factory('User', function($resource) {
    return $resource('/users/login');
  });
