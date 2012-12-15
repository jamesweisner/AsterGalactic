exports.handler = function(socket)
{
	socket.on('disconnect', function()
	{
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
		}
		socket.emit('login', {
			'message': message,
			'player': view.login(player)
		});
		
		socket.on('enterGalaxy', function(sequence, cacheTime)
		{
			var serverTime = +new Date;
			socket.emit('enterGalaxy', view.enterGalaxy(galaxy));
			for(var i = 0; i < AsterGalactic.sectors.length; i++)
			{
				var sector = AsterGalactic.sectors[i];
				socket.emit('updateSector', {
					'sequence': sequence,
					'time': serverTime,
					'sector': sector.updateSector(cacheTime)
				});
			}
		});
		socket.on('scanSector', function(sequence, cacheTime, sectorId)
		{
			var serverTime = +new Date;
			if(!(sectorId in galaxy.sectors))
				return socket.emit('error', { 'message': 'Sector not found.', 'args': [ 'scanSector', cacheTime, sectorId ] });
			socket.emit('scanSector', {
				'sequence': sequence,
				'time': serverTime,
				'system': system.updateSystem(cacheTime) 
			});
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
		socket.on('cancelSendFleet', function(fleetId)
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
		socket.on('toggleInFleet', function(shipId, inFleet)
		{
			
		});
		socket.on('research', function(technologyId)
		{
			
		});
	});
};
