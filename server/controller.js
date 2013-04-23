exports.model = false;
exports.view = false;

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
		if(!socket.player) return;
		exports.model.logout(socket.player);
		socket.player.socket = false;
		socket.player = false;
	});
	socket.on('login', function(username, password)
	{
		var error = model.login();
		socket.emit('login', {
			'message': error ? error : 'success',
			'player': exports.view.login(player)
		});
		if(error) return; // Login failed, do not listen for authenticated events.
		
		socket.on('enterGalaxy', function(sequence, cacheTime)
		{
			var timeNow = +new Date;
			exports.model.enterGalaxy(socket.player, cacheTime, timeNow, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('enterGalaxy', {
					'sequence': sequence,
					'time': timeNow,
					'galaxy': exports.view.enterGalaxy(socket.player, cacheTime, timeNow)
				});
			});
		});
		socket.on('scanSystem', function(sequence, systemId, cacheTime)
		{
			var timeNow = +new Date;
			exports.model.scanSystem(socket.player, cacheTime, timeNow, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('scanSystem', {
					'sequence': sequence,
					'time': timeNow,
					'system': exports.view.scanSystem(socket.player, cacheTime, timeNow)
				});
			});
		});
		socket.on('enterSystem', function(sequence, system_id, cacheTime)
		{
			var timeNow = +new Date;
			exports.model.enterSystem(socket.player, system_id, cacheTime, timeNow, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('enterSystem', {
					'sequence': sequence,
					'time': timeNow,
					'system': exports.view.enterSystem(socket.player, system_id, cacheTime, timeNow)
				});
			});
		});
		socket.on('scanPlanet', function(sequence, planet_id, cacheTime)
		{
			var timeNow = +new Date;
			exports.model.scanPlanet(socket.player, planet_id, cacheTime, timeNow, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('scanPlanet', {
					'sequence': sequence,
					'time': timeNow,
					'planet': exports.view.scanPlanet(socket.player, planet_id, cacheTime, timeNow)
				});
			});
		});
		socket.on('enterPlanet', function(sequence, planet_id, cacheTime)
		{
			var timeNow = +new Date;
			exports.model.enterPlanet(socket.player, planet_id, cacheTime, timeNow, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('enterPlanet', {
					'sequence': sequence,
					'time': timeNow,
					'planet': exports.view.enterPlanet(socket.player, planet_id, cacheTime, timeNow)
				});
			});
		});
		socket.on('sendFleet', function(sequence, originSystemId, destinationSystemId)
		{
			if(originSystemId == destinationSystemId) return sendError(socket, 'Origin must differ from destination.');
			if(!(originSystemId in exports.model.systems)) return sendError(socket, 'Origin system not found.');
			if(!(destinationSystemId in exports.model.systems)) return sendError(socket, 'Destination system not found.');
			var originSystem = exports.model.systems[originSystemId];
			var destinationSystem = exports.model.systems[destinationSystemId];
			if('TODO') return sendError(socket, 'There is already a fleet underway on this vector.');
			if('TODO') return sendError(socket, 'You already have a fleet underway from this system.');
			if('TODO') return sendError(socket, 'You have no fleet-enlisted ships in this system.');
			var fleet = exports.model.sendFleet(player, originSystem, destinationSystem);
			socket.emit('sendFleet', {
				'sequence': sequence,
				'time': +new Date,
				'fleet': exports.view.sendFleet(fleet)
			});
			return true;
		});
		socket.on('cancelSendFleet', function(fleetId)
		{
			// TODO
			return true;
		});
		socket.on('buildMachine', function(machineId, machineClassId, hullClassId, engineClassId)
		{
			if(!(planetId in exports.model.planets)) return socketError(socket, 'Planet not found.');
			if(!(machineClassId in machineClasses)) return socketError(socket, 'Machine class not found.');
			if(!(hullClassId in hullClasses)) return socketError(socket, 'Hull class not found.');
			if(!(engineClassId in engineClasses)) return socketError(socket, 'Engine class not found.');
			if(!(machineId in exports.model.machines)) return socketError(socket, 'Construction facility not found.');
			var facility = exports.model.machines[machineId];
			if(facility.player.username != socket.player.username) return sendError(socket, 'You do not own this ship.');
			var machine = {
				'class': machineClasses[machineClassId],
				'hull': hullClasses[hullClassId],
				'engine': engineClasses[engineClassId]
			};
			var cost = exports.model.addCosts([machine.class.cost, machine.hull.cost, machine.engine.cost ]);
			if('TODO') return socketError(socket, 'Insufficient resources.');
			if('TODO') return socketError(socket, 'Insufficient orbital or ground space.');
			if('TODO') return socketError(socket, 'You lack the required technology.');
			// TODO
			return true;
		});
		socket.on('cancelBuildMachine', function(machineId)
		{
			if(!(machineId in exports.model.machines)) return sendError(socket, 'Machine not found.');
			var machine = exports.model.machines[machineId];
			if(machine.player.username != socket.player.username) return sendError(socket, 'You do not own this machine.');
			if(machine.mode != 'building') return sendError(socket, 'Machine is not under construction.');
			// TODO
			return true;
		});
		socket.on('recycleMachine', function(sequence, machineId)
		{
			if(!(machineId in exports.model.machines)) return sendError(socket, 'Machine not found.');
			var machine = exports.model.machines[machineId];
			if(machine.player.username != socket.player.username) return sendError(socket, 'You do not own this machine.');
			if(!(machine.mode in ['ready', 'building', 'upgrading'])) return sendError(socket, 'Machine is not ready to be recycled.');
			exports.model.recycleMachine(machine);
			socket.emit('recycleMachine', {
				'seuqence': sequence,
				'time': machine.recycle.time,
				'machineId': machineId
			});
			return true;
		});
		socket.on('upgradeMachine', function(machineId, upgradeId)
		{
			if(!(machineId in exports.model.machines)) return sendError(socket, 'Machine not found.');
			var machine = exports.model.machines[machineId];
			if(machine.player.username != socket.player.username) return sendError(socket, 'You do not own this machine.');
			if(machine.mode != 'ready') return sendError(socket, 'Machine is not ready to be upgraded.');
			if('TODO') return sendError(socket, 'Upgrade not available.');
			if('TODO') return sendError(socket, 'Resources not available.');
			exports.model.upgradeMachine(machine, upgradeId);
			socket.emit('upgradeMachine', {
				'sequence': sequence,
				'time': +new Date,
				'machine': exports.view.upgradeMachine(machine, upgradeId)
			});
			return true;
		});
		socket.on('cancelUpgradeMachine', function(machineId)
		{
			if(!(machineId in exports.model.machines)) return sendError(socket, 'Machine not found.');
			var machine = exports.model.machines[machineId];
			if(machine.player.username != socket.player.username) return sendError(socket, 'You do not own this machine.');
			if(machine.mode != 'ready') return sendError(socket, 'Machine is not being upgraded.');
			// TODO
			return true;
		});
		socket.on('sendShip', function(machineId, planetId)
		{
			var time = +new Date;
			exports.model.sendShip(socket.player, machineId, planetId, time, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('sendShip', {
					'sequence': sequence,
					'time': time
				});
			});
		});
		socket.on('cancelSendShip', function(sequence, machineId)
		{
			var time = +new Date;
			exports.model.cancelSendShip(machineId, socket.player.player_id, time, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('cancelSendShip', {
					'sequence': sequence,
					'time': time
				});
			});
		});
		socket.on('setEnlisted', function(sequence, machineId, enlisted)
		{
			exports.model.setEnlisted(socket.player.player_id, machineId, enlisted, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('setEnlisted', {
					'sequence': sequence
				});
			});
		});
		socket.on('research', function(sequence, technologyId)
		{
			var time = +new Date;
			exports.model.research(socket.player, technologyId, time, function(error)
			{
				if(error) return sendError(socket, error);
				return socket.emit('research', {
					'sequence': sequence,
					'time': time
				});
			});
		});
	});
};
