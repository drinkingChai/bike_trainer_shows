angular.module('BikeTrainerShows')
  .factory('User', function($http, AuthTokenFactory) {
    return {
      login: function(username, password) {
        return $http.post('users/login', {
          username: username,
          password: password
        }).then(function(response) {
          AuthTokenFactory.setToken(response.data.token);
          return response;
        })
      },
      logout: function() {
        AuthTokenFactory.setToken();
      }
    };
  })
  .factory('AuthTokenFactory', function($window) {
    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken: function() {
        return store.getItem(key);
      },
      setToken: function(token) {
        if (token) {
          store.setItem(key, token);
        } else {
          store.removeItem(key);
        }
      }
    }
  });
