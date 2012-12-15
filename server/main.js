// Load the game model from disk
var model = require('./model.js');
var players = model.loadPlayers();
var guilds = model.loadGuilds();
var galaxy = model.loadGalaxy();

// Setup the HTTP server
// http://www.senchalabs.org/connect/
var connect = require('connect');
var server = connect.createServer(
	connect.favicon(),
	connect.logger(),
	connect.static(__dirname + '../client')
);
server.listen(80);

// Game views are used by the controller to form packet data
var fs = require('fs');
var view = require('./view.js');

// Create game socket and setup its handler, the game controller
// http://socket.io/
var io = require('socket.io');
var socket = io.listen(server);
var controller = require('./controller.js');
socket.on('connection', controller.handler);
