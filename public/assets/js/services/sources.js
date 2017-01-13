angular.module('BikeTrainerShows')
  .service('sources', function() {
    return {
      all: [
        "Netflix",
        "Hulu",
        "HBO GO",
        "Amazon",
        "YouTube",
        "Other"
      ]
    }
  });
