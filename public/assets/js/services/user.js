angular.module('BikeTrainerShows')
  .factory('User', function($http, AuthTokenFactory, $q) {
    return {
      login: function(username, password) {
        return $http.post('users/login', {
          username: username,
          password: password
        }).then(function success(response) {
          AuthTokenFactory.setToken(response.data.token);
          return response;
        }, function error(response) {
          return response.data;
        })
      },
      logout: function() {
        AuthTokenFactory.setToken();
      },
      getUser: function() {
        if (AuthTokenFactory.getToken()) {
          return $http.get('users/me');
        } else {
          return $q.reject({ data: 'client has no auth token' });
        }
      },
      new: function(user) {
        return $http.post('users/new', user)
      },
      addMovie: function(imdbid) {
        return $http.post('users/addmovie', {
          imdbid: imdbid
        });
      },
      removeMovie: function(imdbid) {
        return $http.post('users/removemovie', {
          imdbid: imdbid
        })
      },
      likeMovie: function(imdbid) {
        return $http.put('users/likemovie', {
          imdbid: imdbid
        })
      },
      changePass: function(username, currentPassword, newpassword1, newpassword2) {
        return $http.post('users/changepass', {
          username: username,
          password: currentPassword,
          newpassword1: newpassword1,
          newpassword2: newpassword2
        }).then(function success(response) {
          AuthTokenFactory.setToken(response.data.token);
          return response;
        }, function error(response) {
          response.error = true;
          return response;
        })
      },
      changeEmail: function(username, newemail) {
        return $http.post('users/changeemail', {
          username: username,
          email: newemail
        })
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
  })
  .factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
    return {
      request: function(config) { //addToken
        var token = AuthTokenFactory.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      }
    }
  });
