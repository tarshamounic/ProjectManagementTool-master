var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');


mongoose.Promise = global.Promise;

//Connecting the local database
//Change the DB name to your local database name
// mongoose.connect('mongodb://localhost/IPDatabase')
//   .then(() => console.log('connection to local database succesful'))
//   .catch((err) => console.error(err));
//mongodb://<dbuser>:<dbpassword>@ds147589.mlab.com:47589/pmtooldb
 mongoose.connect('mongodb://abhijit93:abhijit93@ds147589.mlab.com:47589/pmtooldb')
   .then(() =>  console.log('connection to remote database succesful'))
   .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var sprintRouter = require('./routes/sprint');
var taskRouter = require('./routes/task');
var projectRouter = require('./routes/project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'secretSessionKey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/project', projectRouter);
app.use('/sprint', sprintRouter);
app.use('/task', taskRouter);

//passport configuration for User schema model
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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