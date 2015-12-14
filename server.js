var express = require('express');
var http = require('http');
var path = require('path');


var app = express();


var viewfolder = process.env.OPENSHIFT_REPO_DIR+"views";

app.set('views', viewfolder);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.end('Hi there!')
})

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});