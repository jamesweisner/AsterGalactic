var util = require('util'); // http://nodejs.org/api/all.html#all_util
var fs   = require('fs');   // http://nodejs.org/api/all.html#all_file_system

exports.galaxy   = {};
exports.players  = {};
exports.guilds   = {};
exports.sectors  = {};
exports.systems  = {};
exports.fleets   = {};
exports.planets  = {};
exports.machines = {};

exports.num_players = 0;
exports.num_guilds  = 0;
exports.num_sectors = 0;
exports.num_systems = 0;

exports.loadGalaxy = function()
{
	try
	{
		exports.galaxy = require(__dirname + '/../data/galaxy.json');
	}
	catch (e)
	{
		util.log('Failed to load galaxy file: galaxy.json');
		process.exit(1);
	}
	if(typeof(exports.galaxy.port) != 'number')
	{
		util.log('Listen port not specified, using default port: 80');
		exports.galaxy.port = 80;
	}
}

exports.loadPlayers = function()
{
	var files = fs.readdirSync(__dirname + '/../data/players/');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[A-Z\d_]+\.json$/i))
		{
			util.log('Bad player file name: ' + file);
			continue;
		}
		try
		{
			var player = require(__dirname + '/../data/players/' + file);
		}
		catch (e)
		{
			util.log('Failed to load player file: ' + file);
			continue;
		}
		if(player.username != file.substr(0, file.length - 5))
		{
			util.log('Player file name does not agree with contents: ' + file);
			continue;
		}
		exports.players[player.username] = player;
		exports.num_players++;
	}
};

exports.loadGuilds = function()
{
	var files = fs.readdirSync(__dirname + '/../data/guilds/');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad guild file name: ' + file);
			continue;
		}
		try
		{
			guild = require(__dirname + '/../data/guilds/' + file);
		}
		catch (e)
		{
			util.log('Failed to load guild file: ' + file);
			continue;
		}
		if(guild.id != file.substr(0, file.length - 5))
		{
			util.log('Guild file name does not agree with contents: ' + file);
			continue;
		}
		exports.guilds[guild.id] = guild;
		exports.num_guilds++;
		
		// Resolve references.
		for(username in guild.members)
		{
			guild.members[username] = players[username];
		}
	}
};

exports.loadSectors = function()
{
	var files = fs.readdirSync(__dirname + '/../data/sectors/');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad sector file name: ' + file);
			continue;
		}
		try
		{
			var sector = require(__dirname + '/../data/sectors/' + file);
		}
		catch (e)
		{
			util.log('Failed to load sector file: ' + file);
			continue;
		}
		if(sector.id != file.substr(0, file.length - 5))
		{
			util.log('Sector file name does not agree with contents: ' + file);
			continue;
		}
		exports.sectors[sector.id] = sector;
		exports.num_sectors++;
		
		// Resolve references.
		// TODO replace usernames with user references (in fleets, for example)
		// TODO resolve any guild references, too
	}
};

exports.loadSystems = function()
{
	var files = fs.readdirSync(__dirname + '/../data/systems/');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad system file name: ' + file);
			continue;
		}
		try
		{
			var system = require(__dirname + '/../data/systems/' + file);
		}
		catch (e)
		{
			util.log('Failed to load system file: ' + file);
			continue;
		}
		if(system.id != file.substr(0, file.length - 5))
		{
			util.log('System file name does not agree with contents: ' + file);
			continue;
		}
		exports.systems[system.id] = system;
		exports.num_systems++;
		
		// Resolve references.
		if(!(system.sectorId in exports.sectors))
		{
			util.log('Could not find sector with ID: ' + system.sectorId);
		}
		system.sector = exports.sectors[system.sectorId];
		system.sector.systems[system.id] = system;
		delete system.sectorId;
		
		// TODO load fleets, planets, machines
		// TODO replace usernames with user references (in machines, for example)
		// TODO resolve any guild references, too
	}

	// TODO resolve any galaxy/sector/system references in players, guilds?
};

exports.savePlayers = function(players)
{
	// TODO save player files, clean all references while saving
};

exports.saveGuilds = function(guilds)
{
	// TODO save guild files, clean all references while saving
};

exports.saveGalaxy = function(galaxy)
{
	// TODO save files for galaxy, sectors, and systems, clean all references while saving
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

exports.sendShip = function(machine, planet)
{
	var time = +new Date;
	var distance = 'TODO';
	var duration = distance / (machine.speed * machine.player.stats.shipSpeedMultiplier);
	machine.mode = 'underway';
	machine.flight = {
		'time': time,
		'duration': duration,
		'timer': setTimeout(function(machine, planet)
		{
			// TODO
		}, Math.floor(duration), machine)
	};
};

exports.cancelSendShip = function()
{
	var time = +new Date;
	var duration = (time - machine.flight.time) * machine.player.stats.cancelSendMultiplier;
	machine.mode = 'returning';
	machine.flight = {
		'time': time,
		'duration': duration,
		'timer': setTimeout(function(machine)
		{
			machine.planet.area.orbit -= machine.size;
			machine.planet.machines[machine.id] = machine;
			// TODO anything else to update?
			delete machine.flight;
		}, Math.floor(duration), machine)
	};
};

exports.toggleInFleet = function(machine, enlisted)
{
	machine.enlisted = enlisted;
};

exports.research = function(player, technologyId)
{
	var time = +new Date;
	var technology = technologies[researchId];
	player.research.pool += player.research.rate * (time - player.research.time);
	player.research.pool -= technology.cost;
	player.research.time = time;
	player.technologies[technologyId] = technology;
	// TODO any special-case things to do for certain technologies?
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
