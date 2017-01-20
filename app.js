var express = require('express');
var app = express();
var expressJwt = require('express-jwt');

// var jwtSecret = 'oi1q3h4ropiu(*P#240u09)';


app.use(express.static('public'));

var movies = require('./models/movies');
var search = require('./models/search');
var users = require('./models/users');
var email = require('./models/email')
app.use('/movies', movies);
app.use('/search', search);
app.use('/users', users);
app.use('/email', email);

// app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/movies', '/login']}));

module.exports = app;
