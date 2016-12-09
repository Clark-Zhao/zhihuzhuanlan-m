var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var PostSchema = new mongoose.Schema({
  title: String,
  titleImg: String,
  tags : String,
  likesCount : Number,
  commentsCount : Number,
  author: String,
  publishedTime: Date,
  content: String
});

var PostModel = db.model('Post', PostSchema);

module.exports = PostModel;
