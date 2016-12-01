var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'blog');

var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
app.use(cookieParser());

var md5 = require('js-md5');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String
});

var UserModel = db.model('User', UserSchema);

module.exports = {

  // 注册
  register: function(req, res, next) {
    var info = req.body;

    UserModel.find({'username': info.username}, function (err, docs) {
      if (!docs[0]) {
        var token = md5(info.username + info.password + new Date().toString());

        var userEntity = new UserModel({
          username: info.username,
          password: md5(info.password),
          token: token
        });

        userEntity.save();

        res.json({
          status: 200,
          message: 'success',
          data: {
            message: '注册成功！'
          }
        });
      } else {
        res.json({
          status: 401,
          message: 'error',
          data: {
            message: '用户名已被占用！'
          }
        });
      }
    });
  },

  // 登录
  login: function(req, res, next) {
    var info = req.body;

    UserModel.find({'username': info.username}, function (err, docs) {
      if (!docs[0]) {
        res.json({
          status: 401,
          message: "error",
          data: {
            message: "用户名或密码错误！"
          }
        });
      } else if (md5(info.password) == docs[0].password) {
        res.json({
          status: 200,
          message: "success",
          data: {
            message: "登录成功！",
            token:  docs[0].token
          }
        });
      } else {
        res.json({
          status: 401,
          message: "error",
          data: {
            message: "用户名或密码错误！"
          }
        });
      }
    });
  },

  // 登录验证
  isLogin: function(req, res, next) {
    var info = req.query;

    UserModel.find({'token': info.token}, function (err, docs) {
      if (!docs[0]) {
        res.json({
          status: 401,
          message: "error",
          data: {
            message: "用户未登录！"
          }
        });
      } else if (info.token == docs[0].token) {
        res.json({
          status: 200,
          message: "success",
          data: {
            message: "用户已登录！",
            token:  docs[0].token
          }
        });
      }
    });
  }

}
