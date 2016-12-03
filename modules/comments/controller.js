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
  CommentModel,

// 给评论点赞
  like: function(req, res, next) {
    CommentModel.findById(req.query.id, function (err, docs) {
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
// 获取评论
  comments: function(req, res, next) {
    CommentModel.find({post_id: req.query.id}, '-email -ip', {sort: {'_id': -1}}, function (err, docs) {
      res.send(docs);
    })
  },

// 提交评论
  publish: function(req, res, next) {
    var info = req.body;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    var commentEntity = new CommentModel({
      post_id: info.post_id,
      name: info.name,
      avatar: info.avatar,
      toName: info.toName,
      toContent: info.toContent,
      toUrl: info.toUrl,
      email: info.email,
      url: info.url,
      content: info.content,
      createdTime: new Date(),
      likesCount: 0,
      ip: ip
    });

    commentEntity.save()

    CommentModel.find({post_id: info.post_id}, '-email -ip', {sort: {'_id': -1}}, function (err, docs1) {
      PostModel.update({_id: info.post_id}, {$set:{commentsCount: (docs1.length + 1)}}, function(err){})
    })

    res.json({
      status: 200,
      message: 'success',
      data: {
        message: '评论成功！'
      }
    })
  }
}
