var version = 0.1;

// Utility for logging.
var util = require('util'); // http://nodejs.org/api/all.html#all_util
util.log('AsterGalactic version ' + version + ' is starting up!');

// Load the game model from disk
var fs = require('fs'); // http://nodejs.org/api/all.html#all_file_system
var model = require('./model.js');
var players = model.loadPlayers();
util.log('Loaded ' + players.length + ' players.');
var guilds = model.loadGuilds();
util.log('Loaded ' + guilds.length + ' guilds.');
var galaxy = model.loadGalaxy();
util.log('Loaded ' + galaxy.sectors.length + ' sectors.')
util.log('Loaded ' + galaxy.systems.length + ' systems.')

// Setup the HTTP server
var connect = require('connect'); // http://www.senchalabs.org/connect/
var server = connect.createServer(
	connect.favicon(),
	connect.logger(),
	connect.static(__dirname + '../client')
);
server.listen(galaxy.port);
util.log('Listening on port ' + galaxy.port + '.');

// Game views are used by the controller to form packet data
var view = require('./view.js');

// Create game socket and setup its handler, the game controller
var io = require('socket.io'); // http://socket.io/
var socket = io.listen(server);
var controller = require('./controller.js');
socket.on('connection', controller.handler);
