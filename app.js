var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;
var fileUpload = require('express-fileupload');
var auth = require('./security/authentication');

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost)
	.then(() => console.log('Connection to MongoDB succesful.'))
	.catch((err) => console.error(err));

var index = require('./routes/index');
var animals = require('./routes/animals');
var expts = require('./routes/export.js');
var keeper = require('./routes/keeper.js');

var app = express();

if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger('combined'));
}
app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
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
app.use(fileUpload());

// Binding static sources
app.use(express.static(path.join(__dirname, 'public')));
app.use('/release/bootstrap/', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/release/jquery/', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/release/angular/', express.static(path.join(__dirname, 'node_modules/angular/')));
app.use('/release/angular/route/', express.static(path.join(__dirname, 'node_modules/angular-route/')));
app.use('/release/angular/resource/', express.static(path.join(__dirname, 'node_modules/angular-resource/')));
app.use('/release/angular/sanitize/', express.static(path.join(__dirname, 'node_modules/angular-sanitize/')));
app.use('/release/angular/ui-grid/', express.static(path.join(__dirname, 'node_modules/angular-ui-grid/')));
app.use('/release/angular/animate/', express.static(path.join(__dirname, 'node_modules/angular-animate/')));
app.use('/release/', express.static(path.join(__dirname, 'node_modules/pdfmake/build/')));
app.use('/release/angular/select/', express.static(path.join(__dirname, 'node_modules/ui-select/dist/')));
app.use('/release/angular/touch/', express.static(path.join(__dirname, 'node_modules/angular-touch/')));

// Create routes
app.use('/', index);
app.use(auth.isLoggedIn);
app.use('/keeper', keeper);
//app.use('/zoologist', zoologist);
app.use('/animals', animals);
app.use('/export', expts);

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

module.exports = app;
