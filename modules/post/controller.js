var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');
var PostModel = require('../../model/post.js');
var DraftModel = require('../../model/draft.js');
var tagController = require('../tag/controller.js');

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
    var limit = Number(req.query.limit) || 10;

    if (req.query.tag) {
      PostModel.find({'tags': req.query.tag},function(err, posts) {
        var total = posts.length;

        PostModel.find({'tags': req.query.tag}, null, {sort: {'_id': -1}, limit: limit, skip: (limit * (req.query.page - 1))}, function (err, docs) {
          res.json({
            status: 200,
            message: 'success',
            total: total,
            last_page: Math.ceil(total / limit),
            list: docs
          });
        })
      })
    } else {
      PostModel.find({},function(err, posts) {
        var total = posts.length;

        PostModel.find({}, null, {sort: {'_id': -1}, limit: limit, skip: (limit * (req.query.page - 1))}, function (err, docs) {
          res.json({
            status: 200,
            message: 'success',
            total: total,
            last_page: Math.ceil(total / limit),
            list: docs
          });
        })
      })
    }
  },

// 发布文章
  publish: function(req, res, next) {
    var info = req.body;

    var postEntity = new PostModel({
      title: info.title,
      titleImg: info.titleImg,
      tags : info.tags,
      likesCount : 0,
      commentsCount : 0,
      author: info.author,
      publishedTime: new Date(),
      content: info.content
    });

    tagController.createTag(req, res, next);

    postEntity.save().then(function() {
      DraftModel.remove({'_id': info.id}, function (err, docs) {})

      res.send('文章发布成功！')
    });
  }
}
