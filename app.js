var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// token 拦截判断是否登录
app.use((req, res, next) => {
  if (req.url.includes('login')) {
    next()
    return
  }

  const { authorization } = req.headers;
  console.log(req.headers.authorization)
  if (authorization) {
    const payload = JWT.verify(authorization.split(' ')[1])
    if (payload) {
      console.log(payload)
      const { _id, name } = payload
      const newToken = JWT.generate({_id, name})
      res.header('Authorization', newToken)
      next()
    } else {
      res.status(401).send({ok: 0, msg: 'token已过期'})
    }
  } else {
    next()
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
