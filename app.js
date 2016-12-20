var express = require('express');
var app = express();
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

app.post('/new', parseUrlJSON, parseUrlEncoded, function(request, response) {
  console.log(request.body);
  var item = {
    title: request.body.title,
    source: request.body.source
  };

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(item, function(err, result) {
      console.log(('Item inserted'));
    });

    db.close();

    response.status(201).redirect('/');
  });
});




module.exports = app;
