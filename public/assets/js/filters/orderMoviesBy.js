angular.module('BikeTrainerShows')
  .filter('orderMoviesBy', function() {
    //
    // sorts movies
    // param collection @array
    // param input @string
    // if string has minus sign, sorts descending and vice versa
    return function(collection, input) {
      var newCollection = [];

      var orderAscending = function(a, b) {
        return a.imdbData[input] - b.imdbData[input];
      }

      var orderDescending = function(a, b) {
        return b.imdbData[input] - a.imdbData[input];
      }

      if (input !== null) {
        if (input[0] === '-') {
          input = input.slice(1);
          collection.sort(orderDescending);
        } else {
          collection.sort(orderAscending);
        }

        return collection;
      } else {
        return collection;
      }
    }
  });
