angular.module('BikeTrainerShows')
  .service('sortOptions', function() {
    return {
      all: {
        '-runtime': 'Runtime - High to Low',
        'runtime': 'Runtime - Low to High',
        '-rating': 'Rating - High to Low',
        'rating': 'Rating - Low to High',
        '-immersionRating': 'Immersion - High to Low',
        'immersionRating': 'Immersion - Low to High'
      }
    }
  });
