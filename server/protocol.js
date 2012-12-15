exports.handler = function(socket)
{
	socket.on('disconnect', function()
	{
		// TODO send player goes offline to others?
	});
	socket.on('loginRequest', function(username, password)
	{
		var message = 'success';
		var player = new Player(); // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
		if(!(username in AsterGalactic.players))
			message = 'Player does not exist';
		else if(AsterGalactic.players[username].password != password)
			message = 'Password incorrect.';
		else
		{
			player = AsterGalactic.players[username];
			// TODO what if the player is already online?
			// TODO whould we inform others that this player has come online?
			socket.player = player;
		}
		socket.emit('loginResponse', {
			'message': message,
			'player': player.loginResponse()
		});
		
		socket.on('loadGalaxy', function(sequence, cache_time)
		{
			var server_time = +new Date;
			socket.emit('updateGalaxy', AsterGalactic.galaxy.updateGalaxy());
			for(var i = 0; i < AsterGalactic.sectors.length; i++)
			{
				var sector = AsterGalactic.sectors[i];
				if(sector.time < cache_time) continue; // Cache is still good.
				socket.emit('updateSector', {
					"sequence": sequence,
					"time": server_time,
					"sector": sector.changes_since(cache_time) // TODO implement sector.changes_since
				});
			}
		});
		socket.on('loadSector', function(sectorId)
		{
			var server_time = +new Date;
		});
		socket.on('loadSystem', function(systemId)
		{
			
		});
		socket.on('loadObject', function(objectId)
		{
			
		});
		socket.on('sendFleet', function(originSystemId, destinationSystemId)
		{
			
		});
		socket.on('buildMachine', function(objectId, machineId, hullId, engineId)
		{
			
		});
		socket.on('cancelBuildMachine', function(machineId)
		{
			
		});
		socket.on('recycleMachine', function(machineId)
		{
			
		});
		socket.on('upgradeMachine', function(machineId, upgradeId)
		{
			
		});
		socket.on('sendShip', function(shipId, destinationObjectId)
		{
			
		});
		socket.on('cancelSendShip', function(machineId)
		{
			
		});
		socket.on('fleetShip', function(shipId, inFleet)
		{
			
		});
		socket.on('research', function(technologyId)
		{
			
		});
	});
};
