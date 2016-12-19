var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();

var MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));

var url = 'mongodb://localhost:27017/bike_trainer_shows';




// routes
app.get('/', function(request, response) {
  response.send('Ok');
});

app.get('/movies', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    var allMovies = db.collection('movies').find();

    response.sendStatus(200);
    db.close();
  });
});

app.post('/new', parseUrlJSON, function(request, response) {
  var item = {
    title: request.body.title
  };

  MongoClient.connect(url, function(err, db) {
    db.collection('movies').insertOne(item, function(err, result) {
      console.log(('Item inserted'));
    });

    db.close();

    response.sendStatus(201);
  });
});




module.exports = app;
