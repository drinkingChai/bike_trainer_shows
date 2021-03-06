angular.module('BikeTrainerShows')
  .filter('sourceFilter', function() {
    //
    // filters by source
    // param collection @array
    // param input @string
    return function(collection, input) {
      var newCollection = [];

      if (input !== null) {
        for (var i = 0, l = collection.length; i < l; i++) {
          if (collection[i].source === input) {
            newCollection.push(collection[i]);
          }
        }

        return newCollection;
      } else {
        return collection;
      }
    }
  });
