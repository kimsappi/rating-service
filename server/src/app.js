var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const { authenticationMiddleware } = require('./modules/auth');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var matchesRouter = require('./routes/matches');
var refreshTokenRouter = require('./routes/refreshToken');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// Public routes (no auth)
app.use('/api/auth', authRouter);

// Routes requiring auth
app.use(authenticationMiddleware);
app.use('/api/users', usersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/refreshToken', refreshTokenRouter);

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
  res.json('error');
});

module.exports = app;
