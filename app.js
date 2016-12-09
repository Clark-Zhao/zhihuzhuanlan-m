var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// 路由
var post = require('./modules/post/route');
var user = require('./modules/user/route');
var follower= require('./modules/follower/route');
var comment= require('./modules/comment/route');
var visitor= require('./modules/visitor/route');

var app = express();


// 连接数据库
// var mongoose = require('mongoose');
// var db = mongoose.createConnection('localhost', 'blog');

// db.on('error', console.error.bind(console, '连接错误：'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// app.use('/', routes);
// app.use('/users', users);
app.use('/api', post);
app.use('/api', user);
app.use('/api', follower);
app.use('/api', comment);
app.use('/api', visitor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      status: err.status,
      message: "用户名或密码错误！"
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
