var util       = require('util');            // http://nodejs.org/api/all.html#all_util
var http       = require('http');            // http://nodejs.org/api/http.html#http_http
var io         = require('socket.io');       // http://socket.io/
var connect    = require('connect');         // http://www.senchalabs.org/connect/
var model      = require('./model.js');      // Persistent storage and manipulation of game data.
var view       = require('./view.js');       // Form data objects from game data that are sent by controller.
var controller = require('./controller.js'); // Implementation of socket events, prevents invalid player action.

var version = 0.1;

util.log('AsterGalactic version ' + version);

// Database file name is the first command line argument.
var file = 'galaxy.sqlite3';
if(process.argc > 2) file = process.argv[2];
var path = __dirname + '/../data/' + file;

// Port number is the second command line argument.
var port = parseInt(process.argv[3]);
if(isNaN(port)) port = 80;

// Load game data from persistent storage.
model.database(path, function(port)
{
    util.log('Loaded database ' + path);

    // Cross-link model, view, and controller so they can talk to each other.
    controller.model = model;
    view.model = model;
    controller.view = view;
    
    // Configure the connect app.
    var app = connect();
    app.use(connect.static(__dirname + '/../client'));
    
    // Begin the HTTP server.
    var server = app.listen(port);
    util.log('Listening on port ' + port);
    
    // Create game socket and setup its handler, the game controller.
    var socket = io.listen(server);
    socket.on('connection', controller.handler);
});
