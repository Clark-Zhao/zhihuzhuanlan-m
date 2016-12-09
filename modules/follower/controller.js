var FollowerModel = require('../../model/follower.js')

module.exports = {

// 获取所有友人
  followers: function(req, res, next) {
    FollowerModel.find({'isReviewed': true}, null, {sort: {'_id': -1}}, function (err, docs) {
      res.send(docs);
    })
  },

// 提交友人信息
  publish: function(req, res, next) {
    var info = req.body;

    var followerEntity = new FollowerModel({
      avatar: info.avatar,
      bio: info.bio,
      name: info.name,
      profileUrl: info.profileUrl,
      isReviewed: false,
      reviewUrl: info.reviewUrl
    });

    followerEntity.save();

    res.json({
      status: 200,
      message: 'success',
      data: {
        message: '申请友链成功，本站将在72小时之内进行审核，敬请关注！'
      }
    });
  }
}
