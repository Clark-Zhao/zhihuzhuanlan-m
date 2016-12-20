var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');
var DraftModel = require('../../model/draft.js');

module.exports = {

// 获取单篇文章
  draft: function(req, res, next) {
    DraftModel.find({}, function (err, docs) {
      console.log(docs);
      if (docs && docs.length) {
        res.send(docs[0]);
      }else {
        res.send('草稿不存在')
      }
    })
  },

// 保存草稿
  publish: function(req, res, next) {
    var info = req.body;

    DraftModel.findById(info.id, function (err, docs) {

      if (docs) {
        DraftModel.update({_id: info.id}, {$set:{
          'title': info.title,
          'titleImg': info.titleImg,
          'tags': info.tags,
          'author': info.author,
          'publishedTime': new Date(),
          'content': info.content
        }}, function(err){})

        res.send("草稿更新成功！")
      } else {
        var draftEntity = new DraftModel({
          title: info.title,
          titleImg: info.titleImg,
          tags : info.tags,
          author: info.author,
          publishedTime: new Date(),
          content: info.content
        });
        draftEntity.save().then(function() {
          DraftModel.find({}, function (err, docs) {
            if (docs && docs.length) {
              var doc = docs[0];
              res.json({
                id: doc._id
              });
            }
          })
        })
      }
    })
  }
}
