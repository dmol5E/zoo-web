var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/zoo')
	.then(() => console.log('Connection to MongoDB succesful.'))
	.catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var animals = require('./routes/animals');
var animal = require('./routes/animal.js');
var expts = require('./routes/export.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
	secret: 'qwerty keyb',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/release', express.static(path.join(__dirname, 'node_modules/angular-ui-grid/')));
app.use('/release', express.static(path.join(__dirname, 'node_modules/ui-select/dist/')));

app.use('/', index);
app.use('/animals', animals);
app.use('/export', expts);
app.use('/animal', isLoggedIn , animal);
app.use('/users', users);

// Passport config
var User = require('./models/User');
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err.stack);
  res.render('error');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

module.exports = app;
