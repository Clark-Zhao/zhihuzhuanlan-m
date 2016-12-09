var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var CommentSchema = new mongoose.Schema({
  post_id: String,
  name: String,
  avatar: String,
  toName: String,
  toContent: String,
  toUrl: String,
  email: String,
  url: String,
  content: String,
  createdTime: Date,
  likesCount: Number,
  ip: String
});

var CommentModel = db.model('Comment', CommentSchema);

module.exports = CommentModel;
