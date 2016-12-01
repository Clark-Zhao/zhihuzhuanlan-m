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

module.exports = {

// 获取单篇文章
  post: function(req, res, next) {
    PostModel.findById(req.query.id, function (err, docs) {
      res.send(docs);
    })
  },

// 为一篇文章点赞
  likes: function(req, res, next) {
    PostModel.findById(req.query.id, function (err, docs) {
      docs.likesCount++
      docs.save()
      res.json({
        status: 200,
        message: 'success',
        data: {
          message: '点赞成功！'
        }
      });
    })
  },

// 获取文章列表
  posts: function(req, res, next) {
    PostModel.find({}, null, {sort: {'_id': -1}}, function (err, docs) {
      res.send(docs);
    })
  },

// 发布文章
  publish: function(req, res, next) {
    var info = req.body;

    var postEntity = new PostModel({
      title: info.title,
      titleImg: info.titleImg,
      tags : 'javascript',
      likesCount : 0,
      commentsCount : 0,
      author: info.author,
      publishedTime: new Date(),
      content: info.content
    });
    console.log(postEntity);
    postEntity.save()
  }
}
