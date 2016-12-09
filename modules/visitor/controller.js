var VisitorModel = require('../../model/visitor.js');

module.exports = {

  // 储存游客IP
  getip: function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    VisitorModel.findOne({'ip': ip}, function(err,docs) {
      if (!docs) {
        var visitorEntity = new VisitorModel({
          ip: ip,
          createdTime: new Date(),
          lastLoginTime: new Date()
        });

        visitorEntity.save();

        res.send('欢迎新朋友的到来~');
      } else {
        var lastLoginTime = docs.lastLoginTime
        docs.lastLoginTime = new Date()
        docs.save()
        res.send('欢迎光临~此ip上次登录的时间为' + lastLoginTime)
      }
    })
  }
}
