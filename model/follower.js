var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var FollowerSchema = new mongoose.Schema({
  avatar: String,
  bio: String,
  name: String,
  profileUrl: String,
  isReviewed: Boolean,
  reviewUrl: String
});

var FollowerModel = db.model('Follower', FollowerSchema);

module.exports = FollowerModel;
