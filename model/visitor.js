var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var VisitorSchema = new mongoose.Schema({
  ip: String,
  createdTime: Date,
  lastLoginTime: Date
});

var VisitorModel = db.model('Visitor', VisitorSchema);

module.exports = VisitorModel;
