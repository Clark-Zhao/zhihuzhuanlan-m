var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String
});

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;
