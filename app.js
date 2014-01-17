/////////////
// Imports //
/////////////
var Globals  = require('./Globals')
,	express  = require('express');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var config = require('./config')(app, express, io);

// Including a routing system
require('./routes/routes')(app);

// Listening port 3000
server.listen(process.env.PORT || 3000, process.env.IP || "192.168.10.14");