var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'oi1q3h4ropiu(*P#240u09)';

var users = express();

users.use(parseUrlJSON);
users.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/users/login'] }));

var user = {
  username: 'test',
  password: 't'
}

users.get('/', function(request, response) {
  response.sendStatus(200);
})

users.post('/login', authenticate, function(request, response) {
  var token = jwt.sign({
    username: user.username,
  }, jwtSecret);
  response.send({
    user: user,
    token: token
  });
})

users.get('/me', function(request, response) {
  response.send(request.user);
})

function authenticate(request, response, next) {
  var body = request.body;
  if (!body.username || !body.password) {
    response.status(400).end('empty_field');
  }
  if (body.username !== user.username || body.password != user.password) {
    response.status(401).end('wrong_userpass');
  }
  next();
}

module.exports = users;
