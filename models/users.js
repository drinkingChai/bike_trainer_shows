var express = require('express');
var users = express();
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var MongoClient = require('mongodb').MongoClient;
var statics = require('./statics');
var bcrypt = require('bcrypt');
const saltRounds = 10;


var url = 'mongodb://localhost:27017/bike_trainer_shows';


//
// user constructor
// param username @string
// param email @string
// param name @string
// param password @string
function user(username, email, name, password) {
  this.username = username;
  this.email = email;
  this.name = name;
  this.password = bcrypt.hashSync(password, saltRounds);
  this.likes = [];
  this.watchlist = [];
}


users.use(parseUrlJSON);
// authenticate middleware
users.use(expressJwt({ secret: statics.jwtSecret }).unless({ path: ['/users/login', '/users/new'] }));


users.get('/', function(request, response) {
  response.sendStatus(200);
})


//
// log the user in
users.post('/login', authenticate, function(request, response) {
  var body = request.body;
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({
      username: body.username
    }, function(err, result) {
      var token = jwt.sign({
        username: result.username
      }, statics.jwtSecret);
      response.send({
        user: result,
        token: token
      })
    })
  })
})


//
// create a new user
users.post('/new', function(request, response) {
  var body = request.body;

  if (body.username.indexOf(' ') !== -1 ||
    body.password !== body.password2 ||
    !body.password || !body.password2 ||
     !isComplex(body.password)) {
    console.log('password mismatch or not complex');
    response.sendStatus(406);
    return;
  }

  var newUser = new user(body.username, body.email, body.name, body.password);

  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ username: newUser.username }, function(err, result) {
      if (!result) {
        MongoClient.connect(url, function(err, db) {
          db.collection('users').insertOne(newUser, function(err, result) {
            console.log('new user created');
          });
        })
        response.sendStatus(201);
        return;
      } else {
        response.sendStatus(409);
        return;
      }
    })

    db.close();
  })
})


//
// check if user is logged in and if so, send the user data
users.get('/me', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ username: request.user.username }, function(err, result) {
      response.send(result);
    })
  });
})


//
// add a movie to user watchlist
users.post('/addmovie', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').update(
      { username: request.user.username },
      { $push: { watchlist: request.body.imdbid }
    })
    console.log('movie added');
    response.sendStatus(201);
  })
})


//
// remove a movie from user watchlist
users.post('/removemovie', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').update(
      { username: request.user.username },
      { $pull: { watchlist: request.body.imdbid } }
    )
    console.log('movie removed');
    response.sendStatus(201);
  })
})


//
// like a movie
users.put('/likemovie', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').update(
      { username: request.user.username },
      { $push: { likes: request.body.imdbid } }
    )
    console.log('liked movie');
    response.sendStatus(202);
  })
})


//
// change user password
users.post('/changepass', authenticate, function(request, response) {
  var body = request.body;

  if (body.newpassword1 !== body.newpassword2 ||
    !body.newpassword1 || !body.newpassword2 ||
     !isComplex(body.newpassword1)) {
    console.log('password mismatch or not complex');
    response.sendStatus(406);
    return;
  }

  MongoClient.connect(url, function(err, db) {
    db.collection('users').update(
      { username: request.user.username },
      { $set: { password: bcrypt.hashSync(body.newpassword1, saltRounds) }}
    );
    console.log('password updated');
    db.collection('users').findOne({
      username: request.user.username
    }, function(err, result) {
      var token = jwt.sign({
        username: result.username
      }, statics.jwtSecret);
      response.send({
        user: result,
        token: token
      })
    })
  })
})


//
// change user email
users.post('/changeemail', function(request, response) {
  var body = request.body;

  MongoClient.connect(url, function(err, db) {
    db.collection('users').update(
      { username: request.body.username },
      { $set: { email: request.body.email }}
    );
    console.log('email updated');

    response.sendStatus(202);
    db.close();
  })
})


//
// authenticate middleware
function authenticate(request, response, next) {
  var body = request.body;
  if (!body.username || !body.password) {
    response.status(400).end('empty_field');
    return;
  }
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ username: body.username }, function(err, result) {
      if (result === null) {
        response.status(401).end('wrong_userpass')
      } else if (bcrypt.compareSync(body.password, result.password)) {
        next();
      } else {
        response.status(401).end('wrong_userpass');
      }
    })
  })
}


// complex password checker
function isComplex(password) {
  // simple for now
  return password.length >= 6;
}

module.exports = users;
