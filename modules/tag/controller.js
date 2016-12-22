var TagModel = require('../../model/tag.js');
var PostModel = require('../../model/post.js');

module.exports = {

  createTag: function(req, res, next) {
    var info = req.body;

    TagModel.find({'name': info.tags}, function(err, docs) {
      if (docs && docs.length) {
        TagModel.update({'name': info.tags}, {"$inc":{"postsCount": 1}}, function(err){});
      } else {
        var tagEntity = new TagModel({
          name: info.tags,
          postsCount: 1
        });
        tagEntity.save()
      }
      res.send();
    })
  },

  postTags: function(req, res, next) {
    TagModel.find({}, null, {sort: {'postsCount': -1}}, function(err,docs) {
      res.send(docs);
    })
  }
}
