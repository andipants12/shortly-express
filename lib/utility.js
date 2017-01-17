var request = require('request');
var User = require('../app/models/user');
var Users = require('../app/collections/users');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};


exports.authUser = function(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    //req.session.error = 'Access denied!';
    res.redirect('/login');
  }
};


exports.createUser = function (req, res, next) {

  new User({username: req.body.username}).fetch().then(function(found) {
    if (found) {
      console.log('this user has already been created');
      res.redirect('/login');
      //add an alert that says 'this user exists. log in'
    } else {

      Users.create({
        username: req.body.username,
        password: req.body.password})
        .then(function(newUser) {
          // res.status(200).send(newUser);
          next();
        });
    }
  });
};


exports.loginUser = function (req, res, next) {

};
/************************************************************/
// Add additional utility functions below
/************************************************************/


