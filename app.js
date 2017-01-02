var express = require('express');
var app = express();
var expressJwt = require('express-jwt');

var jwtSecret = 'oi1q3h4ropiu(*P#240u09)';


app.use(express.static('public'));

var movies = require('./models/movies');
var users = require('./models/users');
app.use('/movies', movies);
app.use('/users', users);

// app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/movies', '/login']}));

module.exports = app;
