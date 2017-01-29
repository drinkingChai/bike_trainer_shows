angular.module('BikeTrainerShows')
  .service('immersionRatings', function() {
    return {
      all: {
        1: 'Background noise',
        2: 'No need to rewind',
        3: 'Dinner and a movie',
        4: 'Losing track of time',
        5: 'Glued to the screen'
      }
    }
  });
