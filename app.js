var createError = require('http-errors');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var firebase = require('firebase');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');
var validator = require('express-validator');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var session = require("express-session")
app.use(express.static("public"));
app.use(session({ secret: 'mysupersecret', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('dotenv').config();
app.listen(process.env.PORT || 8080);


// view engine setup
var engine = require('ejs-locals');
app.engine('ejs', engine);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// routes
var routes = require('./routes/index');
var login = require('./routes/login');
var messageBoard = require('./routes/messageBoard');
var signup = require('./routes/signup');
var user = require('./routes/user');
app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);
app.use('/user', user);
app.use('/messageBoard', messageBoard);





var contact = require('./routes/contact');
app.use('/contact', contact);


app.get('/search', function (req, res) {
  res.render('search');
})
app.post('/searchlist', function (req, res) {
  console.log(req.body.searchText);
  // 轉址 redirect
  res.redirect('search');
})

app.get('/search2', function (req, res) {
  res.render('search2');
})



// AJAX 版本 
app.post('/search2', function (req, res) {
  console.log(req.body);
  console.log(req.body.list[2]);
  res.send('搓我齁');
})



// router整合
var work = require('./routes/work');
app.use('/work', work);

var routes = require('./routes/index');
app.use('/', routes);



// 增加 body 解析 取得表單資料
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
