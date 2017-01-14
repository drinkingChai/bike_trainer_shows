var express = require('express');
var search = express();
var imdb = require('imdb-api');
var omdb = require('omdb');


// gets data from imdb API by imdbid
search.get('/id/:id', function(request, response) {
  imdb.getById(request.params.id).then(function(movie) {
    response.status(200).json(movie);
  });
});


// searches through OMDB API for possible matches to title
search.get('/title/:title', function(request, response) {
  var searchResults = [];
  omdb.search(request.params.title, function(err, result) {
    result.forEach(function(movie) {
      searchResults.push(movie);
    });
    response.status(200).json(searchResults);
  });
});


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
