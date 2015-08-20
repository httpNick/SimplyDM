var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session')
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var config = require('./config');

var routes = require('./routes/index');
var steam = require('./routes/steam');
var faq = require('./routes/faq');
var servers = require('./routes/servers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Passport Steam - serialize and deserializeUser
// the user into the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    url: 'mongodb://' + config.db.domain + ':' + config.db.port || '27017' + '/SimplyDM',
    touchAfter: 24 * 3600, // time period in seconds
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  })
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://' + config.db.domain + ':' + config.db.port || '27017' + '/SimplyDM')

app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.signedIn = true
    return next()
  } else {
    res.locals.signedIn = false
    return next()
  }
})

app.use('/', routes);
app.use('/', steam)
app.use('/faq', faq)
app.use('/servers', servers)

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
    res.render('error', {
      message: err.message,
      error: err
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

app.listen(config.port)

module.exports = app;
