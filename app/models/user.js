var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

//plug in for hashing
db.plugin(require('bookshelf-bcrypt'));



var User = db.Model.extend({

  tableName: 'users', 
  bcrypt: { field: 'password' },
  hasTimestamps: true

});

module.exports = User;