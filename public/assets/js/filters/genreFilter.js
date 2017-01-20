angular.module('BikeTrainerShows')
  .filter('genreFilter', function() {
    //
    // checks if the filter is on
    // then applies the filter
    // param collection @array
    // param input @object
    return function(collection, input) {
      var filterIsOn = function() {
        for (var key in input) {
          if (input[key]) return true;
        }
        return false;
      }

      var newCollection = [];

      if (input && filterIsOn()) {
        for (var i = 0, l = collection.length; i < l; i++) {
          var genres = collection[i].imdbData.genres.split(', ');
          for (var j = 0, m = genres.length; j < m; j++) {
            if (input[genres[j]]) {
              newCollection.push(collection[i]);
              break;
            }
          }
        }

        return newCollection;
      } else {
        return collection;
      }
    }
  });
