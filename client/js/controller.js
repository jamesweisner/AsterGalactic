function initSocket(socket, username, password)
{
	socket.emit('login', username, password);
	
	socket.on('login', function (data)
	{
		if(data.message != 'success')
		{
			// TODO show error message
		}
	
	});

	socket.on('enterGalaxy', function (data)
	{
		// TODO
	});

	socket.on('scanSector', function (data)
	{
		// TODO
	});

	socket.on('enterSector', function (data)
	{
		// TODO
	});

	socket.on('scanSystem', function (data)
	{
		// TODO
	});

	socket.on('enterSystem', function (data)
	{
		// TODO
	});

	socket.on('scanPlanet', function (data)
	{
		// TODO
	});

	socket.on('enterPlanet', function (data)
	{
		// TODO
	});

	socket.on('sendFleet', function (data)
	{
		// TODO
	});

	socket.on('upgradeMachine', function (data)
	{
		// TODO
	});

	socket.on('setEnlisted', function (data)
	{
		// TODO
	});

	socket.on('research', function (data)
	{
		// TODO
	});
};
