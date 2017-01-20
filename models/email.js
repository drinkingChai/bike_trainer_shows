var express = require('express');
var bodyParser = require('body-parser');
var parseUrlJSON = bodyParser.json();
var parseUrlEncoded = bodyParser.urlencoded({ extended: true });
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var randomString = require('randomstring');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// var passwords = require('./passwords.js');

var url = 'mongodb://localhost:27017/bike_trainer_shows';


var email = express();

email.post('/', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var transporterData = {
    service: 'Gmail',
    auth: {
      user: 'wzamanwebsite@gmail.com'
    }
  };

  MongoClient.connect(url, function(err, db) {
    db.collection('passwords').findOne({ name: 'emailpass' }, function(err, result) {
      if (err) {
        throw err;
      }

      transporterData.auth.pass = result.value;

      db.collection('users').findOne({ email: request.body.address }, function(err, result) {
        if (err) {
          throw err;
        } else if (result === null) {
          response.sendStatus(409);
          return;
        }

        var key = randomString.generate(10);

        db.collection('users').update(
          { username: result.username },
          { $set: {
            key: key
           }}
        )

        var testHost = 'localhost:3000';
        var liveHost = 'bts.wasifzaman.net';
        var html = "http://"+hostName+"/#/reset/" + key; // '/reset' from angular route

        var mailOptions = {
          from: 'example@gmail.com', // sender address
          to: request.body.address, // list of receivers
          subject: 'Password reset email', // Subject line
          html: html
        };

        var transporter = nodemailer.createTransport(transporterData);

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            throw error;
          } else {
            console.log('Message sent: ' + info.response);
            response.sendStatus(200);
          };
        });

      })

    })

  })
})


email.post('/:uniquekey', parseUrlJSON, parseUrlEncoded, function(request, response) {
  var body = request.body;

  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({ key: request.params.uniquekey }, function(err, result) {
      if (!result) {
        response.status(409).send({ message: 'key_expired' });
        return;
      } else {
        if (body.newpassword1 !== body.newpassword2 ||
          !body.newpassword1 || !body.newpassword2 ||
           !isComplex(body.newpassword1)) {
          response.status(409).send({ message: 'wrong_userpass' });
          return;
        }

        db.collection('users').update(
          { key: request.params.uniquekey },
          { $set: {
            key: false,
            password: bcrypt.hashSync(body.newpassword1, saltRounds)
          }}
        )
        response.sendStatus(202);
        console.log('password updated');
      }
    })
  })
})


function isComplex(password) {
  // simple for now
  return password.length >= 6;
}

module.exports = email;
