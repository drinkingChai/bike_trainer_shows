var express = require('express');
var movies = express();
var omdb = require('omdb');
var imdb = require('imdb-api');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var parseUrlEncoded = bodyParser.urlencoded({ extended: true });

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/bike_trainer_shows';


movies.get('/', function(request, response) {
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

movies.get('/new/:id', function(request, response) {
  imdb.getById(request.params.id).then(function(movie) {
    response.status(200).json({
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdbid: movie.imdbid
    });
  });
});

movies.post('/', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var item = {
    imdbid: request.body.imdbid,
    source: request.body.source,
    blurb: request.body.blurb,
    sourceOther: request.body.sourceOther
  };

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(item, function(err, result) {
      console.log('Item inserted');
    });

    db.close();

    response.status(201).redirect('/');
  });
});

movies.delete('/:id', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').remove({imdbid: request.params.id}, function(err, result) {
      console.log('Item deleted');
    })

    db.close();
  })
});


movies.get('/search/:title', function(request, response) {
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


movies.get('/searchById/:id', function(request, response) {
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
          imdburl: movie.imdburl,
          genres: movie.genres.split(', '),
          runtime: parseInt(movie.runtime, 10),
          source: result.source,
          blurb: result.blurb,
          sourceOther: result.sourceOther
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


movies.get('/exists/:imdbid', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').findOne({imdbid: request.params.imdbid}, function(err, result) {
      response.status(200).json({'exists': result === null ? false : true});
    });
  });
})


module.exports = movies;
