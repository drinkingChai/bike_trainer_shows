angular.module('BikeTrainerShows')
  .filter('minutesToHours', function() {
    //
    // convert minutes to every 0.5 hours
    // param minutes @integer
    return function(minutes) {
      var hours = Math.floor(minutes / 60);
      if (minutes % 60 > 45) {
        return hours++;
      } else if (minutes % 60 > 15) {
        return hours += 0.5;
        hours += 0.5;
      } else {
        return hours;
      }
    }
  });
