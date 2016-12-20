var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var DraftSchema = new mongoose.Schema({
  title: String,
  titleImg: String,
  tags : String,
  author: String,
  publishedTime: Date,
  content: String
});

var DraftModel = db.model('Draft', DraftSchema);

module.exports = DraftModel;
