exports.loadPlayers = function()
{
	var players = {};
	var files = fs.readdirSync(__dirname + '../data/players');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[A-Z\d_]+\.json$/i))
		{
			util.log('Bad player file name: ' + file);
			continue;
		}
		var player = require(__dirname + '../data/players' + file);
		if(player.username != file.substr(0, file.length - 4))
		{
			util.log('Player file name does not agree with contents: ' + file);
			continue;
		}
		players[player.username] = player;
	}
};

exports.loadGuilds = function()
{
	var guilds = {};
	var files = fs.readdirSync(__dirname + '../data/guilds');
	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad guild file name: ' + file);
			continue;
		}
		guild = require(__dirname + '../data/guilds' + file);
		if(guild.id != parseInt(file))
		{
			util.log('Guild file name does not agree with contents: ' + file);
			continue;
		}
		guilds[guild.id] = guild;
		for(username in guild.players)
		{
			guild.members[username] = players[username];
		}
	}
	return guilds;
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
	for(var i = 0; i < sectorFiles.length; i++)
	{
		var file = sectorFiles[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad sector file name: ' + file);
			continue;
		}
		var sector = require(__dirname + '../data/sectors' + file);
		if(sector.id != parseInt(file))
		{
			util.log('Sector file name does not agree with contents: ' + file);
			continue;
		}
		glaaxy.sectors[sector.id] = sector;
		
		// TODO replace usernames with user references (in fleets, for example)
		// TODO resolve any guild references, too
	}
	
	var systemFiles = fs.readdirSync(__dirname + '../data/systems');
	for(var i = 0; i < systemFiles.length; i++)
	{
		var file = systemFiles[i];
		if(!file.match(/^[\d]+\.json$/i))
		{
			util.log('Bad system file name: ' + file);
			continue;
		}
		var system = require(__dirname + '../data/systems' + file);
		if(system.id != parseInt(file))
		{
			util.log('System file name does not agree with contents: ' + file);
			continue;
		}
		glaaxy.sectors[system.sectorId].systems[system.id] = system;
		galaxy.systems[system.id] = system;
		system.sector = galaxy.sectors[system.sectorId];
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

exports.recycleMachine = function()
{
	// TODO 
};

exports.upgradeMachine = function()
{
	// TODO 
};

exports.sendShip = function(machine, planet)
{
	// TODO 
};

exports.cancelSendShip = function()
{
	// TODO 
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
