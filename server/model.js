var util    = require('util');    // http://nodejs.org/api/all.html#all_util
var sqlite3 = require('sqlite3'); // https://github.com/developmentseed/node-sqlite3

var db;
var lib;

// TODO load lib

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
		if(!player)                     return callback('Player does not exist');
		if(player.password != password) return callback('Password incorrect.');
		delete player.password;
		db.run('UPDATE player SET online = online + 1 WHERE player_id = ?', [player_id]);
		db.run('INSERT INTO login (player_id, ip) VALUES (?, ?)', [player_id, ip]);
		// TODO inform other guild members that this player has come online?
		return callback(false, player);
	});
};

exports.logout = function(player_id, callback)
{
	db.run('UPDATE player SET online = online - 1 WHERE player_id = ?', [player_id]);
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

exports.sendFleet = function(player, origin, destination, time, callback)
{
	if(origin == destination) return callback('Origin must differ from destination.');
	if(!(origin in exports.model.systems)) return callback('Origin system not found.');
	if(!(destination in exports.model.systems)) return callback('Destination system not found.');
	if('TODO') return sendError(socket, 'There is already a fleet underway on this vector.');
	if('TODO') return sendError(socket, 'You already have a fleet underway from this system.');
	if('TODO') return sendError(socket, 'You have no fleet-enlisted ships in this system.');
	var fleet = 'TODO';
	return callback(false, fleet);
};

exports.cancelSendFleet = function()
{
	// TODO 
};

exports.buildMachine = function(player, machine_id, machine_class, hull_class, engine_class, time, callback)
{
	if(machine_class && !(machine_class in lib.machine_classes)) return callback('Machine class not found.');
	if(hull_class    && !(hull_class    in lib.hull_classes))    return callback('Hull class not found.');
	if(engine_class  && !(engine_class  in lib.engine_classes))  return callback('Engine class not found.');
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, facility)
	{
		if(!facility)                              return callback('Construction facility not found.');
		if(facility.player_id != player.player_id) return callback('You do not own this construction facility.');
		if('TODO')                                 return callback('Facility cannot build machines the specified class.');
		var cost = addCosts([machine_class.cost, machine_hull.cost, machine_engine.cost]);
		if('TODO') return callback('Insufficient resources.');
		if('TODO') return callback('Insufficient ground space.');
		if('TODO') return callback('You lack the required technology.');
		// TODO
		return callback(false, 'TODO');
	});
};

exports.cancelBuildMachine = function(player, machine_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, machine)
	{
		if(!machine)                              return callback('Machine not found.');
		if(machine.player_id != player.player_id) return callback('You do not own this machine.');
		if(machine.mode != 'building')            return callback('Machine is not under construction.');
		// TODO
		return callback(false, 'TODO');
	});
};

exports.recycleMachine = function(player, machine_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, machine)
	{
		if(!machine)                              return callback('Machine not found.');
		if(machine.player_id != player.player_id) return callback('You do not own this machine.');
		
		// Begin recycling machine.
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
			default:
				return callback('Machine is not ready to be recycled.');
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
		return callback(false, 'TODO');
	});
};

exports.upgradeMachine = function(player, machine_id, upgrade_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, machine)
	{
		if(!machine)                              return callback('Machine not found.');
		if(machine.player_id != player.player_id) return callback('You do not own this machine.');
		if(machine.mode != 'ready')               return callback('Machine is not ready to be upgraded.');
		if('TODO') return callback('Upgrade not available.');
		if('TODO') return callback('Resources not available.');
		
		// Begin upgrade process now.
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
		return callback(false, 'TODO');
	});
};

exports.cancelUpgradeMachine = function(player, machine_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, machine)
	{
		if(!machine)                              return callback('Machine not found.');
		if(machine.player_id != player.player_id) return callback('You do not own this machine.');
		if(machine.mode != 'upgrading')           return callback('Machine is not being upgraded.');
		// TODO
		return callback(false, 'TODO');
	});
};

exports.sendShip = function(player, machine_id, planet_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, ship)
	{
		if(!ship)                       return callback('Ship not found.');
		if(ship.type != 'ship')         return callback('That machine is not a ship.');
		if(ship.player_id != player_id) return callback('You do not own this ship.');
		if(ship.mode != 'ready')        return callback('Ship is not ready to depart.');
		
		return db.get("SELECT * FROM planet WHERE planet_id = ?", [planet_id], function(error, planet)
		{
			if(!planet)                            return callback('Destination planet not found.');
			if(planet.system_id != ship.system_id) return callback('Invalid destination planet.');
			// TODO invalid destination if owned by another player and not in PvP system.
			// TODO some destinations invalid? for some ship classes?
			
			// Begin ship flight to destination planet.
			var distance = 'TODO';
			var duration = distance / machine.speed;
			exports.flights[machine_id] = setTimeout(function(machine, planet)
			{
				// TODO
				delete exports.flights[machine_id];
			}, Math.floor(duration), machine);
			return db.run("\
				UPDATE machine SET\
				mode = 'underway',\
				flight_time = ?\
				WHERE machine_id = ?\
			", [time, machine_id], function()
			{
				callback(false, 'TODO');
			});
		});
	});
};

exports.cancelSendShip = function(player, machine_id, time, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, ship)
	{
		if(!ship)                       return callback('Ship not found.');
		if(ship.type != 'ship')         return callback('That machine is not a ship.');
		if(ship.player_id != player_id) return callback('You do not own this ship.');
		if(ship.mode != 'underway')     return callback('Ship is not underway');
		
		// Send ship back to where it came from.
		var duration = (time - machine.flight_time);
		clearTimeout(exports.flights[machine_id]);
		delete exports.flights[machine_id];
		setTimeout(function()
		{
			db.run("UPDATE machine SET mode = 'ready', flight_time = 0, return_time = 0 WHERE machine_id = ?", [machine_id]);
		}, Math.floor(duration));
		return db.run("UPDATE machine SET mode = 'returning', return_time = ? WHERE machine_id = ?", [time, machine_id], function()
		{
			callback(false, 'TODO');
		});
	});
};

exports.setEnlisted = function(player, machine_id, enlisted, callback)
{
	db.get("SELECT * FROM machine WHERE machine_id = ?", [machine_id], function(error, ship)
	{
		if(!ship)                       return callback('Ship not found.');
		if(ship.type != 'ship')         return callback('That machine is not a ship.');
		if(ship.player_id != player_id) return callback('You do not own this ship.');
		if(ship.mode != 'ready')        return callback('Ship is not ready to depart.');
		
		// Toggle ship enlistment in the fleet.
		return db.run("UPDATE machine SET enlisted = ? WHERE machine_id = ?", [enlisted, machine_id], function()
		{
			callback(false, 'TODO');
		});
	});
};

exports.research = function(player, technology_id, time, callback)
{
	if(!(technology_id in lib.technologies)) return callback('Technology not found.');
	var technology = lib.technologies[technology_id];
	if(player.technologies.charAt(technology_id) == '9')
		return callback('Research for this technologys is at maximum level.');
	for(var i in technology.requirements)
		if(player.technologies.charAt(i) < technology.requirements[i])
			return callback('Technology prerequisite not met.');
	if('TODO')
		return callback('Insufficient research points.');

	// Spend research pool to acquire technology.
	player.research.pool += player.research.rate * (time - player.research.time);
	player.research.pool -= technology.cost;
	player.research.time = time;
	player.technologies[technology_id] = technology;
	// TODO any special-case things to do for certain technologies?
	return callback(false, 'TODO');
};
