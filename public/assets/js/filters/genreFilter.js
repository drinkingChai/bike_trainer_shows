angular.module('BikeTrainerShows')
  .filter('genreFilter', function() {
    // console.log(MovieIndexController.genres);
    return function(collection, input) {

      // console.log(input);


      var newCollection = [];


      if (input) {
        for (var i = 0, l = collection.length; i < l; i++) {
          var genres = collection[i].genres,
            match = false;

          for (var j = 0, m = genres.length; j < m; j++) {
            // console.log(input[genres[j]], genres[j]);
            if (input[genres[j]]) {
              match = true;
              break;
            }
          }

          if (match) {
            newCollection.push(collection[i]);
          }
          // console.log(collection[i].genres);



          // console.log(collection[i]);
        }

        return newCollection;

      } else {
        return collection;
      }










    }



    // return function(minutes) {
    //   return Math.ceil(minutes / 60) + " hours";
    //   // return Math.floor(minutes / 60) + " hour " + Math.floor((minutes % 60)) + " minutes";
    // }
  });
