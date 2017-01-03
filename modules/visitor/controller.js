var VisitorModel = require('../../model/visitor.js');

module.exports = {

  // 储存游客IP
  getip: function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    VisitorModel.findOne({'ip': ip}, function(err,docs) {
      var visitor_numbers;
      var message;

      if (!docs) {
        var visitorEntity = new VisitorModel({
          ip: ip,
          createdTime: new Date(),
          lastLoginTime: new Date()
        });

        visitorEntity.save();

        message = '欢迎新朋友的到来~';
      } else {
        var lastLoginTime = docs.lastLoginTime
        docs.lastLoginTime = new Date()
        docs.save()
        message = '欢迎光临~此ip上次登录的时间为' + lastLoginTime;
      }

      VisitorModel.find({}, function(err,docs) {
        if (docs && docs.length) {
          visitor_numbers = docs.length;
        } else {
          visitor_numbers = 0;
        }

        res.json({
          status: 200,
          message: "success",
          data: {
            message: message,
            visitor_numbers: visitor_numbers
          }
        });
      });
    })
  }
}
