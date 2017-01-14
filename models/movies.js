var express = require('express');
var movies = express();
var imdb = require('imdb-api');
var omdb = require('omdb');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var parseUrlEncoded = bodyParser.urlencoded({ extended: true });

var MongoClient = require('mongodb').MongoClient;

// var url = 'mongodb://localhost:27017/bike_trainer_shows';
var url = 'mongodb://localhost:27017/bike_trainer_shows';


function Movie(imdbData, source, blurb) {
  this.imdbid = imdbData.imdbid;
  this.imdbData = imdbData;
  this.imdbData.runtime = parseInt(this.imdbData.runtime, 10);
  this.hearts = 0;
  this.source = source;
  this.comments = [blurb];
}


// rename to getALL or ALL
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
    response.status(200).json(movie);
  });
});




movies.post('/', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var body = request.body,
    newMovie = new Movie(body.imdbData, body.source, body.blurb);

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(newMovie, function(err, result) {
      console.log('Item inserted');
    });
    response.status(201).redirect('/');
  });

  if (newMovie.imdbData.series) {
    MongoClient.connect(url, function(err, db) {
      imdb.getById(newMovie.imdbid).then(function(result) {
        result.episodes().then(function(episodes) {
          db.collection('movies').update(
            { 'imdbid': newMovie.imdbid },
            { $set: { 'imdbData.runtime' : newMovie.imdbData.runtime * episodes.length }}
          )
          response.status(201).redirect('/');
        })
      })
    });
  }
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
  var searchResults = [];
  omdb.search(request.params.title, function(err, result) {
    result.forEach(function(movie) {
      searchResults.push(movie);
    });
    response.status(200).json(searchResults);
  });

});


movies.get('/searchById/:id', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').findOne({imdbid: request.params.id}, function(err, result) {
      response.status(200).json(result);
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
