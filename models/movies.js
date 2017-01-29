var express = require('express');
var movies = express();
var imdb = require('imdb-api');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var parseUrlEncoded = bodyParser.urlencoded({ extended: true });

var MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://localhost:27017/bike_trainer_shows';


//
// movie constructor
// param imdbData @object
// param source @string
// param blurb @string
//
function Movie(imdbData, source, blurb) {
  this.imdbid = imdbData.imdbid;
  this.imdbData = imdbData;
  this.imdbData.runtime = parseInt(this.imdbData.runtime, 10);
  this.hearts = 0;
  this.source = source;
  this.comments = blurb ? [blurb] : [];
  this.immersions = [];
}

//
// comment constructor
// param message @string
// param user @string
// param time @object
//
function Comment(message, user, time) {
  this.message = message;
  this.user = user;
  this.time = time;
}

//
// immersion constructor
// param rating @int
// param user @string
// param time @object
// function Immersion(rating, user, time) {
//   this.rating = rating;
//   this.user = user;
//   this.time = time;
// }
function Immersion(imdbid, rating, time) {
  this.imdbid = imdbid;
  this.rating = rating;
  this.time = time;
}


//
// returns an array of all movies
movies.get('/', function(request, response) {
  var result = [];
  MongoClient.connect(url, function(err, db) {
    var allMovies = db.collection('movies').find();
    allMovies.forEach(function(item) {
      result.push(item);
    }, function() {
      response.status(200).json(result);
      db.close();
    });
  });
});


//
// adds a new movie
// if it's a show, it will update the runtime with the total episodes * runtime
movies.post('/', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var body = request.body,
  newMovie = new Movie(body.imdbData, body.source, body.blurb);

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(newMovie, function(err, result) {
      console.log('Item inserted');
    });
    response.sendStatus(201);
    db.close();
  });

  if (newMovie.imdbData.series) {
    MongoClient.connect(url, function(err, db) {
      imdb.getById(newMovie.imdbid).then(function(result) {
        result.episodes().then(function(episodes) {
          db.collection('movies').update(
            { 'imdbid': newMovie.imdbid },
            { $set: { 'imdbData.runtime' : newMovie.imdbData.runtime * episodes.length }}
          )

          db.close();
        })
      })
    });
  }
});


//
// fetches from local database by taking imdbid as param id
movies.get('/:id', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').findOne({imdbid: request.params.id}, function(err, result) {
      response.status(200).json(result);
    });

    db.close();
  });
});


//
// deletes movie from the local database
// REVIEW: not implemented yet
movies.delete('/:id', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').remove({imdbid: request.params.id}, function(err, result) {
      console.log('Item deleted');
    })

    db.close();
  })
});


//
// add a heart to the movie
movies.put('/', parseUrlJSON, parseUrlEncoded, function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('movies').update(
      { imdbid: request.body.imdbid },
      { $inc: { hearts: 1 }}
    )

    db.close();
  })
})


//
// adds a comment
movies.put('/addcomment', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var imdbid = request.body.imdbid,
    comment = request.body.newComment;

  if (comment.message.length === 0) {
    response.sendStatus(406);
    return;
  }

  var newComment = new Comment(comment.message, comment.user, comment.time);

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').update(
      { imdbid: imdbid },
      { $push: { comments: newComment }}
    )

    console.log('comment added');
    response.sendStatus(200);
    db.close();
  })
})


//
// add immersion rating
movies.put('/addimmersion', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var imdbid = request.body.imdbid,
    newImmersion = request.body.newImmersion;

  var newImmersion = new Immersion(newImmersion.rating, newImmersion.user, newImmersion.time);

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').findOne(
      { imdbid: imdbid },
      function(err, result) {
        var immersions = result.immersions;

        if (immersions.length === 0) immersions.push(newImmersion);
        for (var i = 0, l = immersions.length; i < l; ++i) {
          if (immersions[i].user === newImmersion.user) {
            immersions[i] = newImmersion;
            break;
          }
          if (i + 1 === l) {
            immersions.push(newImmersion);
          }
        }

        MongoClient.connect(url, function(err, db) {
          db.collection('movies').update(
            { imdbid: imdbid },
            { $set: { immersions: immersions }}
          )
        })
      }
    )

    console.log('immersion added');
    response.sendStatus(200);
    db.close();
  })
})


module.exports = movies;
