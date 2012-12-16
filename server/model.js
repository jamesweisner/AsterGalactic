exports.loadPlayers = function()
{
	var players = {};
	var files = fs.readdirSync(__dirname + '../data/players');
	for(int i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[A-Z\d_]+\.json$/i))
		{
			// TODO log error
			continue;
		}
		players[file.substr(0, file.length - 4)] = require(__dirname + '../data/players' + file);
	}
};

exports.loadGuilds = function()
{
	// TODO load guilds, resolve player references
};

exports.loadGalaxy = function()
{
	var galaxy = requie(galaxy.json);
	if(typeof(galaxy.port) != 'number') galaxy.port = 80;
	galaxy.sectors = [];
	galaxy.systems = [];
	galaxy.fleets = [];
	galaxy.planets = [];
	galaxy.machines = [];
	
	var sectorFiles = fs.readdirSync(__dirname + '../data/sectors');
	for(int i = 0; i < sectorFiles.length; i++)
	{
		var file = sectorFiles[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			// TODO log error
			continue;
		}
		glaaxy.sectors[parseInt(file)] = require(__dirname + '../data/sectors' + file);
		// TODO replace usernames with user references (in fleets, for example)
		// TODO resolve any guild references, too
	}
	
	var systemFiles = fs.readdirSync(__dirname + '../data/systems');
	for(int i = 0; i < systemFiles.length; i++)
	{
		var file = systemFiles[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			// TODO log error
			continue;
		}
		var system = require(__dirname + '../data/systems' + file);
		glaaxy.sectors[system.sectorId].systems[system.id] = system;
		galaxy.systems[system.id] = system;
		// TODO load fleets, planets, machines
		system.sector = galaxy.sectors[system.sectorId];
		delete system.sectorId;
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

exports.recycleMachine = function()
{
	// TODO 
};

exports.upgradeMachine = function()
{
	// TODO 
};

exports.sendShip = function()
{
	// TODO 
};

exports.cancelSendShip = function()
{
	// TODO 
};

exports.toggleInFleet = function()
{
	// TODO 
};

exports.research = function()
{
	// TODO 
};

export.fleetArrives = function()
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
