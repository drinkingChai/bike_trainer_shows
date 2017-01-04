var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var MongoClient = require('mongodb').MongoClient;

var jwtSecret = 'oi1q3h4ropiu(*P#240u09)';

var url = 'mongodb://localhost:27017/bike_trainer_shows';

var users = express();

users.use(parseUrlJSON);
users.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/users/login', '/users/new'] }));

var user = {};

users.get('/', function(request, response) {
  response.sendStatus(200);
})

users.post('/login', authenticate, function(request, response) {
  // MongoDb get user
  var token = jwt.sign({
    username: user.username,
  }, jwtSecret);
  response.send({
    user: user,
    token: token
  });
})

users.post('/new', function(request, response) {
  var username = request.body.username,
    password = request.body.password;

  MongoClient.connect(url, function(err, db) {
    db.collection('users').insertOne({
      username: username,
      password: password,
      movies: []
    }, function(err, result) {
      console.log('new user created');
      response.sendStatus(201);
    })
  })
})

users.get('/me', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ username: 'test' }, function(err, result) {
      request.user.movies = result.movies;
      response.send(request.user);
    })
  });
})

function authenticate(request, response, next) {
  var body = request.body;
  if (!body.username || !body.password) {
    response.status(400).end('empty_field');
  }
  // if (body.username !== user.username || body.password != user.password) {
  //   response.status(401).end('wrong_userpass');
  // }
  // check against MongoDB user database
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ username: body.username }, function(err, result) {
      if (result.password === body.password) {
        next();
      } else {
        response.status(401).end('wrong_userpass');
      }
    })
  })
}

module.exports = users;
