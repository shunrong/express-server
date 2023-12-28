var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册 session 中间件
app.use(session({
  name: 'limeSystem',
  secret: 'uriewurou132u',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
  resave: true, // 每次重新设置 session 后，会重新计算过期时间
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/session',
    ttl: 1000 * 60 * 60
  })
}))

// cookie 拦截判断是否登录
app.use((req, res, next) => {
  if (req.url.includes('login')) {
    next()
    return
  }

  if (req.session.user) {
    req.session.myDate = Date.now()
    next()
  } else {
    if (req.url.includes('api')) {
      res.status(401).send({ok: 0})
    } else {
      res.redirect('/login')
    }
  }
})

app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
