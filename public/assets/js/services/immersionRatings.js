angular.module('BikeTrainerShows')
  .service('immersionRatings', function() {
    return {
      all: {
        0: 'Background noise',
        1: 'No need to rewind',
        2: 'Dinner and a movie',
        3: 'Losing track of time',
        4: 'Glued to the screen'
      }
    }
  });
