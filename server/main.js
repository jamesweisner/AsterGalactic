var connect = require('connect');   // http://www.senchalabs.org/connect/
var io      = require('socket.io'); // http://socket.io/

var server = connect.createServer(
	connect.favicon(),
	connect.logger(),
	connect.static(__dirname + '../client')
);

server.listen(80);

var socket = io.listen(server);

var protocol = require('./protocol.js');

socket.on('connection', protocol.handler);
