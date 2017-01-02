(function() {
  'use strict';

  angular.module('BikeTrainerShows', ['ngRoute', 'ngResource'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

})();
