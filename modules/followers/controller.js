var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var FollowerSchema = new mongoose.Schema({
  avatar: String,
  bio: String,
  description: String,
  name: String,
  profileUrl: String
});

var FollowerModel = db.model('Follower', FollowerSchema);

module.exports = {

// 获取所有友人
  followers: function(req, res, next) {
    FollowerModel.find({}, null, {sort: {'_id': -1}}, function (err, docs) {
      res.send(docs);
    })
  },

// 提交友人信息
  publish: function(req, res, next) {
    var info = req.body;

    var followerEntity = new FollowerModel({
      avatar: info.avatar,
      bio: info.bio,
      description: info.description,
      name: info.name,
      profileUrl: info.profileUrl
    });

    followerEntity.save()
  }
}
