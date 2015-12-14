var express = require('express')
  , http = require('http')
  , path = require('path')


var app = express();


var viewfolder = process.env.OPENSHIFT_REPO_DIR+"views";

app.set('views', viewfolder);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.end('Hi there!')
})

app.listen(8080);