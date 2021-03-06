#!/bin/env node

// Set up app and DB objects
var express    = require('express');
var stylus     = require('stylus');
var fs         = require('fs');


// Create "express" server.
var express = require("express");
var app     = express();



// Set up the app environment
app.set('views', process.env.OPENSHIFT_REPO_DIR + 'views');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

var methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({ secret: 'your secret here' }));

app.use(stylus.middleware({
  src:  process.env.OPENSHIFT_REPO_DIR + 'views',  // .styl files are located in `views/stylesheets`
  dest: process.env.OPENSHIFT_REPO_DIR + 'public', // .styl resources are compiled `/stylesheets/*.css`
  compile: function(str, path) { // optional, but recommended
return stylus(str)
    .set('filename', path)
    .set('warn', true)
    .set('compress', true);
  }
}));
app.use(express.static(process.env.OPENSHIFT_REPO_DIR + 'public'));


/*  =====================================================================  */
/*  Setup route handlers.  */
/*  =====================================================================  */

// Handler for GET /
app.get('/', function(req, res) {
    res.render('index', { layout: 'layout', title: 'Myapp' });
});



//  Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ipaddr === "undefined") {
   console.warn('No OPENSHIFT_NODEJS_IP environment variable');
}

//  terminator === the termination handler.
function terminator(sig) {
   if (typeof sig === "string") {
      console.log('%s: Received %s - terminating Node server ...',
                  Date(Date.now()), sig);
      process.exit(1);
   }
   console.log('%s: Node server stopped.', Date(Date.now()) );
}

//  Process on exit and signals.
process.on('exit', function() { terminator(); });

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
].forEach(function(element, index, array) {
    process.on(element, function() { terminator(element); });
});

//  And start the app on that interface (and port).
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
               ipaddr, port);
});
