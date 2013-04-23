var util    = require('util');    // http://nodejs.org/api/all.html#all_util
var sqlite3 = require('sqlite3'); // https://github.com/developmentseed/node-sqlite3

var db;

exports.database = function(path, callback)
{
	db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, function(error)
	{
		if(!error) return callback();
		return db = new sqlite3.Database(path, sqlite3.OPEN_CREATE, function(error)
		{
			if(error)
			{
				util.log('Could not create database ' + path);
				process.exit(1);
			}
			util.log('Installing new database ' + path);
			var install = require('./install');
			install.database(db, callback);
		});
	});
}

exports.register = function(username, password, email, ip, callback)
{
	// TODO
	// set technologies achievements to be flag-strings like "00000000"
};

exports.login = function(username, password, ip, callback)
{
	var query = "\
		SELECT player_id, guild_id, creidts, population, research, systems, password\
		FROM player\
		WHERE username = ?\
	";
	db.get(query, [username], function(error, player)
	{
		if(!player)                     return callback(0, 'Player does not exist');
		if(player.password != password) return callback(0, 'Password incorrect.');
		delete player.password;
		db.run('UPDATE player SET online = online + 1 WHERE player_id = ?', [player_id]);
		db.run('INSERT INTO login (player_id, ip) VALUES (?, ?)', [player_id, ip]);
		// TODO inform other guild members that this player has come online?
		return callback(player, null);
	});
};

exports.logout = function(player_id, callback)
{
	db.run('UPDATE player SET online = online - 1 WHERE player_id = ?', [player_id], callback);
};

exports.enterGalaxy = function()
{
	// TODO
};

exports.scanSystem = function()
{
	// TODO return sendError(socket, 'System not found.');
};

exports.enterSystem = function()
{
	// TODO	return sendError(socket, 'System not found.');

};

exports.scanPlanet = function()
{
	// TODO return sendError(socket, 'Planet not found.');
};

exports.enterPlanet = function()
{
	// TODO return sendError(socket, 'Planet not found.');
};

exports.sendFleet = function()
{
	// TODO 
};

exports.cancelSendFleet = function()
{
	// TODO 
};

exports.buildMachine = function()
{
	// TODO 
};

exports.cancelBuildMachine = function()
{
	// TODO 
};

exports.recycleMachine = function(machine)
{
	var time = +new Date;
	var duration = 0;
	switch(machine.mode)
	{
		case 'ready':
			duration = machine.machineClass.buildTime;
			break;
		case 'building':
			duration = time - machine.build.time;
			break;
		case 'upgrading':
			duration = machine.machineClass.buildTime + (time - machine.upgrade.time);
			break;
	}
	duration *= machine.player.stats.recycleMultiplier;
	machine.mode = 'recycling';
	machine.recycle = {
		'time': time,
		'duration': duration,
		'timer': setTimeout(function(machine)
		{
			delete model.machines[machine.id];
			// TODO delete all other references!!!
		}, Math.floor(duration), machine)
	};
};

exports.upgradeMachine = function(machine, upgrade)
{
	var time = +new Date;
	var duration = upgrade.buildTime * machine.player.stats.upgradeMultiplier;
	machine.mode = 'upgrading';
	machine.upgrade = {
		'time': time,
		'duration': duration,
		'timer': setTimeout(function(machine, upgrade)
		{
			machine.upgrades[upgrade.id] = true;
			delete machine.upgrade;
			// TODO any special case stuff?
		}, Math.floor(duration), machine)
	};
};

exports.sendShip = function(playerId, machineId, planetId, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machineId], function(error, ship)
	{
		if(!ship)                      return callback('Ship not found.');
		if(ship.type != 'ship')        return callback('That machine is not a ship.');
		if(ship.player_id != playerId) return callback('You do not own this ship.');
		if(ship.mode != 'ready')       return callback('Ship is not ready to depart.');
		
		return db.get("SELECT * FROM planet WHERE planet_id = ?", [planetId], function(error, planet)
		{
			if(!planet)                            return callback('Destination planet not found.');
			if(planet.system_id != ship.system_id) return callback('Invalid destination planet.');
			// TODO invalid destination if owned by another player and not in PvP system.
			// TODO some destinations invalid? for some ship classes?
			
			// Begin ship flight to destination planet.
			var distance = 'TODO';
			var duration = distance / machine.speed;
			exports.flights[machineId] = setTimeout(function(machine, planet)
			{
				// TODO
				delete exports.flights[machineId];
			}, Math.floor(duration), machine);
			return db.run("\
				UPDATE machine SET\
				mode = 'underway',\
				flight_time = ?\
				WHERE machine_id = ?\
			", [time, machineId], function() { callback(false); });
		});
	});
};

exports.cancelSendShip = function(playerId, machineId, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machineId], function(error, ship)
	{
		if(!ship)                      return callback('Ship not found.');
		if(ship.type != 'ship')        return callback('That machine is not a ship.');
		if(ship.player_id != playerId) return callback('You do not own this ship.');
		if(ship.mode != 'underway')    return callback('Ship is not underway');
		
		// Send ship back to where it came from.
		var duration = (time - machine.flight_time);
		clearTimeout(exports.flights[machineId]);
		delete exports.flights[machineId];
		setTimeout(function()
		{
			db.run("UPDATE machine SET mode = 'ready', flight_time = 0, return_time = 0 WHERE machine_id = ?", [machine_id]);
		}, Math.floor(duration));
		return db.run("UPDATE machine SET mode = 'returning', return_time = ? WHERE machine_id = ?", [time, machineId], function() { callback(false); });
	});
};

exports.setEnlisted = function(playerId, machineId, enlisted, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machineId], function(error, ship)
	{
		if(!ship)                      return callback('Ship not found.');
		if(ship.type != 'ship')        return callback('That machine is not a ship.');
		if(ship.player_id != playerId) return callback('You do not own this ship.');
		if(ship.mode != 'ready')       return callback('Ship is not ready to depart.');
		
		// Toggle ship enlistment in the fleet.
		return db.run("UPDATE machine SET enlisted = ? WHERE machine_id = ?", [enlisted, machineId], function() { callback(false); });
	});
};

exports.research = function(player, technologyId, time, callback)
{
	if(!(technologyId in lib.technologies)) return 'Technology not found.';
	var technology = lib.technologies[technologyId];
	if(player.technologies.charAt(technologyId) == '9')
		return 'Research for this technologys is at maximum level.';
	for(var i in technology.requirements)
		if(player.technologies.charAt(i) < technology.requirements[i])
			return 'Technology prerequisite not met.';
	if('TODO')
		return 'Insufficient research points.';

	// Spend research pool to acquire technology.
	var technology = technologies[researchId];
	player.research.pool += player.research.rate * (time - player.research.time);
	player.research.pool -= technology.cost;
	player.research.time = time;
	player.technologies[technologyId] = technology;
	// TODO any special-case things to do for certain technologies?
	return false;
};

exports.fleetArrives = function()
{
	// TODO 
};

exports.machineFinishes = function()
{
	// TODO 
};

exports.shipArrives = function()
{
	// TODO 
};

// TODO interpolation helper functions like mining, researching, etc.
