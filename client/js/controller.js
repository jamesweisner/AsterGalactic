var socket = io.connect('http://localhost');

socket.on('connect', function()
{
	socket.on('login', function (data)
	{
		if(data.message != 'success')
		{
			// TODO show error message
		}
		
	});
	
	socket.on('enterGalaxy', function (data)
	{
		
	});
	
	socket.on('scanSector', function (data)
	{
		
	});
	
	socket.on('enterSector', function (data)
	{
		
	});
	
	socket.on('scanSystem', function (data)
	{
		
	});
	
	socket.on('enterSystem', function (data)
	{
		
	});
	
	socket.on('scanPlanet', function (data)
	{
		
	});
	
	socket.on('enterPlanet', function (data)
	{
		
	});
	
	socket.on('sendFleet', function (data)
	{
		
	});
	
	socket.on('upgradeMachine', function (data)
	{
		
	});
	
	socket.on('setEnlisted', function (data)
	{
		
	});
	
	socket.on('research', function (data)
	{
		
	});
});
