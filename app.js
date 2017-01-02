var express = require('express');
var app = express();

app.use(express.static('public'));

var movies = require('./models/movies');

app.use('/', movies);

module.exports = app;
