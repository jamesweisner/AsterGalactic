var util       = require('util');            // http://nodejs.org/api/all.html#all_util
var http       = require('http');            // http://nodejs.org/api/http.html#http_http
var io         = require('socket.io');       // http://socket.io/
var connect    = require('connect');         // http://www.senchalabs.org/connect/
var model      = require('./model.js');      // Persistent storage and manipulation of game data.
var view       = require('./view.js');       // Form data objects from game data that are sent by controller.
var controller = require('./controller.js'); // Implementation of socket events, prevents invalid player action.

var version = 0.1;
util.log('AsterGalactic version ' + version + ' is starting up!');

// Cross-link model, view, and controller so they can talk to each other.
controller.model = model;
view.model = model;
controller.view = view;

// Load game data from persistent storage.
model.loadGalaxy();  util.log('Loading the galaxy...');
model.loadPlayers(); util.log('Loaded ' + model.num_players + ' players.');
model.loadGuilds();  util.log('Loaded ' + model.num_guilds  + ' guilds.');
model.loadSectors(); util.log('Loaded ' + model.num_sectors + ' sectors.');
model.loadSystems(); util.log('Loaded ' + model.num_systems + ' systems.');

// Configure the connect app.
var app = connect();
app.use(connect.static(__dirname + '/../client'));

// Begin the HTTP server.
var server = app.listen(model.galaxy.port);
util.log('Listening on port: ' + model.galaxy.port);

// Create game socket and setup its handler, the game controller.
var socket = io.listen(server);
socket.on('connection', controller.handler);
