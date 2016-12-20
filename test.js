var request = require('supertest');
var app = require('./app');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bike_trainer_shows';

describe('Request to root path', function() {
  it('Returns HTML format', function(done) {
   request(app)
     .get('/')
     .expect('Content-type', /html/, done);
  });
});

describe('Request all projects', function() {
  it('Returns a status code of 200', function(done) {
    request(app)
      .get('/movies')
      .expect(200, done);
  })
});

describe('Create new entries', function() {
  after(function() {
    MongoClient.connect(url, function(err, db) {
      db.collection('movies').remove();
      db.close();
    });
  });

  it('Redirects back to hom and sends a status code of 302', function(done) {
      request(app)
        .post('/new')
        .type('JSON')
        .send('{"title": "The Incredible Hulk"}')
        .expect(302, done);
  });
});
