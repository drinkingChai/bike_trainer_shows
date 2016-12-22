var express = require('express');
var app = express();
var omdb = require('omdb');
var imdb = require('imdb-api');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var parseUrlEncoded = bodyParser.urlencoded({ extended: true });

var MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));

var url = 'mongodb://localhost:27017/bike_trainer_shows';


// routes
app.get('/', function(request, response) {
  response.send('Ok');
});

app.get('/movies', function(request, response) {
  var result = [];
  MongoClient.connect(url, function(err, db) {
    var allMovies = db.collection('movies').find();
    allMovies.forEach(function(item) {
      result.push(item);
    }, function() {
      db.close();
      response.status(200).json(result);
    });
  });
});

app.post('/movies', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var item = {
    imdbId: request.body.imdbId,
    source: request.body.source
  };

  // omdb.search(item.title, function(err, result) {
  //   result.forEach(function(movie) {
  //     console.log(movie.title, movie.year);
  //   });
  // });

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(item, function(err, result) {
      console.log(('Item inserted'));
    });

    db.close();

    response.status(201).redirect('/');
  });
});


app.get('/search/:title', function(request, response) {
  // console.log(request.params);
  // console.log(request.params.title);

  var searchResults = [];
  omdb.search(request.params.title, function(err, movies) {
    movies.forEach(function(movie) {
      searchResults.push({
        title: movie.title,
        year: movie.year,
        imdbRating: movie.imdb.rating,
        synopsis: movie.plot,
        imdbId: movie.imdb
      });
    });
    // console.log(searchResults);
    response.status(200).json(searchResults);
  });

});

app.get('/searchById/:id', function(request, response) {
  omdb.get(request.params.id, function(err, movie) {
    response.status(200).json({
      title: movie.title,
      year: movie.year,
      imdbRating: movie.imdb.rating,
      synopsis: movie.plot,
      imdbId: movie.imdb
    });
  });
});


module.exports = app;
