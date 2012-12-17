function sendError(socket, error)
{
	var eventName = caller.name; // TODO probably wrong...
	socket.send({
		'error': error,
		'event': eventName,
		'arguments': caller.arguments
	});
	var ip = socket.connection.remoteAddress;
	var args = caller.arguments.join(', ');
	util.log( + ' client error in ' + eventName + '(' + args + '): ' + error);
};

exports.handler = function(socket)
{
	socket.player = false;
	socket.on('disconnect', function()
	{
		model.offline(socket.player);
		socket.player.socket = false;
		socket.player = false;
		// TODO send player goes offline to others?
	});
	socket.on('login', function(username, password)
	{
		var message = 'success';
		var player = false;
		if(!(username in players))
			message = 'Player does not exist';
		else if(players[username].password != password)
			message = 'Password incorrect.';
		else
		{
			player = players[username];
			// TODO what if the player is already online? kick out the ghost?
			// TODO should we inform others that this player has come online?
			socket.player = player;
			player.socket = socket;
			model.online(player);
		}
		socket.emit('login', {
			'message': message,
			'player': view.login(player)
		});
		
		socket.on('enterGalaxy', function(sequence, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			model.enterGalaxy(socket.player);
			socket.emit('enterGalaxy', {
				'sequence': sequence,
				'time': +new Date,
				'galaxy': view.enterGalaxy(galaxy, time)
			);
		});
		socket.on('scanSector', function(sequence, sectorId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(sectorId in galaxy.sectors)) return sendError(socket, 'Sector not found');
			socket.emit('scanSector', {
				'sequence': sequence,
				'time': +new Date,
				'sector': view.scanSector(galaxy.sectors[sectorId], time)
			});
		});
		socket.on('enterSector', function(sequence, sectorId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(sectorId in galaxy.sectors)) return sendError(socket, 'Sector not found.');
			var sector = galaxy.sectors[sectorId];
			model.enterSector(socket.player, sector);
			socket.emit('enterSector', {
				'sequence': sequence,
				'time': +new Date,
				'sector': view.enterSector(sector, time)
			});
		});
		socket.on('scanSystem', function(sequence, systemId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(systemId in galaxy.systems)) return sendError(socket, 'System not found.');
			socket.emit('scanSystem', {
				'sequence': sequence,
				'time': +new Date,
				'system': view.scanSystem(galaxy.systems[systemId], time);
			});
		});
		socket.on('enterSystem', function(sequence, systemId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(systemId in galaxy.systems)) return sendError(socket, 'System not found.');
			var system = galaxy.systems[systemId];
			model.enterSystem(socket.player, system);
			socket.emit('enterSystem', {
				'sequence': sequence,
				'time': +new Date,
				'system': view.scanSystem(system, time);
			});
		});
		socket.on('scanPlanet', function(sequence, planetId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(planetId in galaxy.planets)) return sendError(socket, 'Planet not found.');
			socket.emit('scanPlanet', {
				'sequence': sequence,
				'time': +new Date,
				'planet': view.scanPlanet(galaxy.planets[planetId], time);
			});
		});
		socket.on('enterPlanet', function(sequence, planetId, time)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(planetId in galaxy.planets)) return sendError(socket, 'Planet not found.');
			var planet = galaxy.planets[planetId];
			model.enterPlanet(player, planet);
			socket.emit('enterPlanet', {
				'sequence': sequence,
				'time': +new Date,
				'planet': view.enterPlanet(planet, time);
			});
		});
		socket.on('sendFleet', function(sequence, originSystemId, destinationSystemId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(originSystemId == destinationSystemId) return sendError(socket, 'Origin must differ from destination.');
			if(!(originSystemId in galaxy.systems)) return sendError(socket, 'Origin system not found.');
			if(!(destinationSystemId in galaxy.systems)) return sendError(socket, 'Destination system not found.');
			var originSystem = galaxy.systems[originSystemId];
			var destinationSystem = galaxy.systems[destinationSystemId];
			if('TODO') return sendError(socket, 'There is already a fleet underway on this vector.');
			if('TODO') return sendError(socket, 'You already have a fleet underway from this system.');
			if('TODO') return sendError(socket, 'You have no fleet-enlisted ships in this system.');
			var fleet = model.sendFleet(player, originSystem, destinationSystem);
			socket.emit('sendFleet', {
				'sequence': sequence,
				'time': +new Date,
				'fleet': view.sendFleet(fleet)
			});
		});
		socket.on('cancelSendFleet', function(fleetId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO
		});
		socket.on('buildMachine', function(planetId, machineId, hullId, engineId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO
		});
		socket.on('cancelBuildMachine', function(machineId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO
		});
		socket.on('recycleMachine', function(machineId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO
		});
		socket.on('upgradeMachine', function(machineId, upgradeId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if('TODO') return sendError(socket, 'Machine not found.');
			var machine = 'TODO';
			if('TODO') return sendError(socket, 'You do not own that machine.');
			if('TODO') return sendError(socket, 'Upgrade not available.');
			if('TODO') return sendError(socket, 'Resources not available.');
			model.upgradeMachine(machine, upgradeId);
			socket.emit('upgradeMachine', {
				'sequence': sequence,
				'time': +new Date,
				'machine': view.upgradeMachine(machine, upgradeId)
			});
		});
		socket.on('cancelUpgradeMachine', function(machineId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			
		});
		socket.on('sendShip', function(shipId, destinationPlanetId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO
		});
		socket.on('cancelSendShip', function(machineId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			// TODO calculate how long it will take to come back
		});
		socket.on('setEnlisted', function(shipId, enlisted)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if(!(shipId in galaxy.ships)) return sendError(socket, 'Ship not found.');
			var ship = galaxy.ships[shipId];
			if(ship.player.username != socket.player.username) return sendError(socket, 'You do not own this ship.');
			if('TODO') return sendError(socket, 'Ship is still under construction.');
			model.setEnlisted(ship, enlisted);
			socket.emit('setEnlisted', {
				'sequence': sequence,
				'time': +new Date,
				'ship': view.setEnlisted(ship)
			});
		});
		socket.on('research', function(sequence, technologyId)
		{
			if(!socket.player) return sendError(socket, 'Please login.');
			if('TODO') return sendError(socket, 'You have already researched this technology.');
			if('TODO') return sendError(socket, 'Technology prerequisite not yet researched.');
			if('TODO') return sendError(socket, 'Insufficient research points.');
			model.research(player, technologyId);
			socket.emit('research', {
				'sequence': sequence,
				'time': +new Date,
				'technology': technologyId
			});
		});
	});
};
