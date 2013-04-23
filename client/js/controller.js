// The controller handles events caught by the web socket.
// Information from the server is trusted to already be sanitized.
// These events can trigger updates to the model, and changes in the view.

AsterGalactic.getSocket = function()
{
	if(AsterGalactic.socket) return AsterGalactic.socket;

	AsterGalactic.socket = io.connect('/');
	
	AsterGalactic.socket.on('login', function(response)
	{
		if(response.message != 'success')
		{
			console.log('login failed: ', response.message);
			// display error message
			// enable login button
			return;
		}
		console.log('logged in as ', response.player);
		AsterGalactic.player = response.player;
		// show home page (player profile?)
	});
	
	AsterGalactic.socket.on('enterGalaxy', function(response)
	{
		AsterGalactic.galaxy = response.galaxy;
		// TODO
	});

	AsterGalactic.socket.on('scanSystem', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('enterSystem', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('scanPlanet', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('enterPlanet', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('sendFleet', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('upgradeMachine', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('setEnlisted', function(response)
	{
		// TODO
	});

	AsterGalactic.socket.on('research', function(response)
	{
		// TODO
	});

	return AsterGalactic.socket;
};
