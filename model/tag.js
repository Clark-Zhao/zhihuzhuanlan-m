var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var TagSchema = new mongoose.Schema({
  name: String,
  postsCount: Number
});

var TagModel = db.model('Tag', TagSchema);

module.exports = TagModel;
