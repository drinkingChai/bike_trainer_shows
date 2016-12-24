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

app.get('/movies/new/:id', function(request, response) {
  imdb.getById(request.params.id).then(function(movie) {
    response.status(200).json({
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdbid: movie.imdbid
    });
  });
});

app.post('/movies', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var item = {
    imdbid: request.body.imdbid,
    source: request.body.source,
    blurb: request.body.blurb
  };

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(item, function(err, result) {
      console.log('Item inserted');
    });

    db.close();

    response.status(201).redirect('/');
  });
});

app.delete('/movies/:id', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').remove({imdbid: request.params.id}, function(err, result) {
      console.log('Item deleted');
    })

    db.close();
  })
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
        imdbid: movie.imdb,
        poster: movie.poster
      });
    });
    response.status(200).json(searchResults);
  });

});


app.get('/searchById/:id', function(request, response) {
  imdb.getById(request.params.id).then(function(movie) {
    MongoClient.connect(url, function(err, db) {
      db.collection('movies').findOne({imdbid: request.params.id}, function(err, result) {
        var mov = {
          title: movie.title,
          year: movie.year,
          rating: movie.rating,
          synopsis: movie.plot,
          imdbid: movie.imdbid,
          poster: movie.poster,
          runtime: parseInt(movie.runtime, 10),
          source: result.source,
          blurb: result.blurb
        }
        if (movie.hasOwnProperty('_episodes')) {
          mov.totalseasons = movie.totalseasons;
          movie.episodes().then(function(allEpisodes) {
            mov.runtimePerEp = mov.runtime;
            mov.runtime = allEpisodes.length * mov.runtime;
            mov.totalepisodes = allEpisodes.length;
            response.status(200).json(mov);
          });
        } else {
          response.status(200).json(mov);
        }
      });
      db.close();
    });
  });
});


module.exports = app;
