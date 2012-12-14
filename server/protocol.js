exports.handler = function(socket)
{
	socket.on('disconnect', function()
	{
		
	});
	socket.on('login', function(sessionId)
	{
		socket.on('loadGalaxy', function()
		{
			
		});
		socket.on('loadSector', function(sectorId)
		{
			
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
});
