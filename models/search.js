var express = require('express');
var search = express();
var imdb = require('imdb-api');
var omdb = require('omdb');


//
// searches by either id or title
// title search returns multiple results using omdb
// REVIEW: maybe search by partial string by breaking up the string
search.get('/:value/:type', function(request, response) {
  var params = request.params;
  switch (params.type) {
    case 'id':
      imdb.getById(request.params.value).then(function(movie) {
        response.status(200).json({result: movie});
      });
      break;
    case 'title':
      var searchResults = [];
      omdb.search(request.params.value, function(err, result) {
        result.forEach(function(movie) {
          searchResults.push(movie);
        });
        response.status(200).json({result: searchResults});
      });
      break;
    default:
      break;
  }
})


module.exports = search;
