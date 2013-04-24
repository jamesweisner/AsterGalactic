exports.model = false;

function sendResponse(socket, error, result, event, args, sequence, time)
{
	if(error)
	{
		var ip = socket.connection.remoteAddress;
		args.push(socket.player.player_id);
		util.log(ip + ' client error in ' + event + '(' + args.join(', ') + '): ' + error);
	}
	return socket.emit(eventName, {
		'sequence': sequence,
		'time': time,
		'error': error,
		'result': result
	});
}

exports.handler = function(socket)
{
	socket.player = false;
	socket.on('disconnect', function()
	{
		if(!socket.player) return;
		exports.model.logout(socket.player);
		socket.player.socket = false;
		socket.player = false;
	});
	socket.on('login', function(username, password)
	{
		exports.model.login(username, password, socket.connection.remoteAddress, function(error, player)
		{
			socket.player = player;
			socket.emit('login', {
				'message': error ? error : 'success',
				'player': player
			});
			if(error) return; // Login failed, do not listen for authenticated events.
			socket.on('enterGalaxy', function(sequence, cacheTime)
			{
				var timeNow = +new Date;
				exports.model.enterGalaxy(socket.player, cacheTime, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'enterGalaxy', [cacheTime], sequence, timeNow);
				});
			});
			socket.on('scanSystem', function(sequence, system_id, cacheTime)
			{
				var timeNow = +new Date;
				exports.model.scanSystem(socket.player, system_id, cacheTime, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'scanSystem', [system_id, cacheTime], sequence, timeNow);
				});
			});
			socket.on('enterSystem', function(sequence, system_id, cacheTime)
			{
				var timeNow = +new Date;
				exports.model.enterSystem(socket.player, system_id, cacheTime, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'enterSystem', [system_id, cacheTime], sequence, timeNow);
				});
			});
			socket.on('scanPlanet', function(sequence, planet_id, cacheTime)
			{
				var timeNow = +new Date;
				exports.model.scanPlanet(socket.player, planet_id, cacheTime, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'scanPlanet', [planet_id, cacheTime], sequence, timeNow);
				});
			});
			socket.on('enterPlanet', function(sequence, planet_id, cacheTime)
			{
				var timeNow = +new Date;
				exports.model.enterPlanet(socket.player, planet_id, cacheTime, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'enterPlanet', [planet_id, cacheTime], sequence, timeNow);
				});
			});
			socket.on('sendFleet', function(sequence, origin, destination)
			{
				var timeNow = +new Date;
				exports.model.sendFleet(socket.player, origin, destination, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'sendFleet', [origin, destination], sequence, timeNow);
				});
			});
			socket.on('cancelSendFleet', function(sequence, fleet_id)
			{
				var timeNow = +new Date;
				exports.model.cancelSendFleet(socket.player, fleet_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'cancelSendFleet', [fleet_id], sequence, timeNow);
				});
			});
			socket.on('buildMachine', function(sequence, machine_id, machine_class, hull_class, engine_class)
			{
				var timeNow = +new Date;
				exports.model.buildMachine(socket.player, machine_id, machine_class, hull_class, engine_class, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'buildMachine', [machine_id, machine_class, hull_class, engine_class], sequence, timeNow);
				});
			});
			socket.on('cancelBuildMachine', function(sequence, machine_id)
			{
				var timeNow = +new Date;
				exports.model.cancelBuildMachine(socket.player, machine_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'recycleMachine', [machine_id], sequence, timeNow);
				});
			});
			socket.on('recycleMachine', function(sequence, machine_id)
			{
				var timeNow = +new Date;
				exports.model.recycleMachine(socket.player, machine_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'recycleMachine', [machine_id,], sequence, timeNow);
				});
			});
			socket.on('upgradeMachine', function(sequence, machine_id, upgrade_id)
			{
				var timeNow = +new Date;
				exports.model.upgradeMachine(socket.player, machine_id, upgrade_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'upgradeMachine', [machine_id, upgrade_id], sequence, timeNow);
				});
			});
			socket.on('cancelUpgradeMachine', function(sequence, machine_id)
			{
				var timeNow = +new Date;
				exports.model.cancelUpgradeMachine(socket.player, machine_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'cancelUpgradeMachine', [machine_id], sequence, timeNow);
				});
			});
			socket.on('sendShip', function(sequence, machine_id, planet_id)
			{
				var timeNow = +new Date;
				exports.model.sendShip(socket.player, machine_id, planet_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'sendShip', [machine_id, planet_id], sequence, timeNow);
				});
			});
			socket.on('cancelSendShip', function(sequence, machine_id)
			{
				var timeNow = +new Date;
				exports.model.cancelSendShip(socket.player.player_id, machine_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'cancelSendShip', [machine_id], sequence, timeNow);
				});
			});
			socket.on('setEnlisted', function(sequence, machine_id, enlisted)
			{
				var timeNow = +new Date;
				exports.model.setEnlisted(socket.player.player_id, machine_id, enlisted, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'setEnlisted', [machine_id, enlisted], sequence, timeNow);
				});
			});
			socket.on('research', function(sequence, technology_id)
			{
				var timeNow = +new Date;
				exports.model.research(socket.player, technology_id, timeNow, function(error, result)
				{
					sendResponse(socket, error, result, 'research', [technology_id], sequence, timeNow);
				});
			});
		});
	});
};
