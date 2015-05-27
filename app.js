var express = require('express');
var path = require('path');
var config = require( __base+'/server/config/env.js' );
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo' )(session);
var bodyParser = require('body-parser');
var app = express();

// connect database
require( __base + '/server/model/db.js' )();

// setup env.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'secret',
  store:new MongoStore( {
    db:config.db.name,
    username:config.db.user,
    password:config.db.password
  } )
}));

require( __base + '/routes/route.js' )(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
