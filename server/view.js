// Send all the information a player needs to see their profile on login.
exports.login = function(player)
{
	if(!player) return {};
	return {
		'username': player.username,
		'guildId': player.guild.id,
		'credits': player.credits,
		'technologies': player.technologies,
		'population': player.population,
		'research': player.research,
		'achievements': player.achievements
	};
};

// Only show which sectors have player and guild in them.
// The client calculates the sector dimensions and locations.
exports.enterGalaxy = function(player)
{
	var sectors = [];
	return {
		'name': model.galaxy.name,
		'numPlayers': model.numPlayers,
		'numGuilds': model.numGuilds,
		'numSectors': model.numSectors,
		'numSystems': model.numSystems,
		'playerSectors': player.hasSectors,
		'guildSectors': player.guild.hasSectors
	};
};

// Show only changed demographic information about the scanned sector.
exports.scanSector = function(sector, time)
{
	var response = { 'id': sector.id };
	// TODO what demographics to show? num_systems, num_fleets? my fleets?
	// Maybe, sum all my demographics in each system?
	return response;
};

// Notice that system name, type, and location can change.
// So, check the cache time against the system's base-data update time.
// The destruction of systems is always sent to all players.
// So, we don't have to worry about sending a delete signal for dead systems.
// Similarly, fleets position is interpolated, so fleets are cached.
// Only if a fleet is turned around does the cache become invalidated.
exports.enterSector = function(player, sector, time)
{
	var systems = {};
	for(var i in sector.systems)
	{
		var system = sector.systems[i];
		if(system.time < time) continue;
		response.systems[i] = {
			'id': system.id,
			'name': system.name,
			'type': system.type,
			'location': system.location,
			'hasPlayer': (player.username in system.players),
			'hasGuild': (player.guild.id in system.guilds)
		};
	}
	var fleets = {};
	for(var i = 0; i < sector.fleets.length; i++)
	{
		var fleet = sector.fleets[i];
		if(fleet.time < time) continue;
		response.fleets[i] = {
			'id': fleet.id,
			'player': fleet.player.name,
			'guild': fleet.player.guild.id,
			'origin': fleet.origin,
			'destination': fleet.destination,
			'speed': fleet.speed,
			'position': fleet.position,
			'mode': fleet.mode
		};
	}
	return {
		'id': sector.id,
		'systems': systems,
		'fleets': fleets
	};
};

exports.newFleet = function(fleet)
{
	var response = {
		'id': fleet.id,
		'player': fleet.player.name,
		'origin': fleet.origin,
		'destination': fleet.destination,
		'speed': fleet.speed,
		'position': fleet.position,
		'mode': fleet.mode
	};
	return response;
};

exports.updateFleet = function(fleet)
{
	var response = {
		'id': fleet.id,
		'speed': fleet.speed,
		'position': fleet.position,
		'mode': fleet.mode
	};
	return response;
};

exports.scanFleet = function(fleet)
{
	response = {
		'id': fleet.id,
		'num_ships': 0,
		'num_class': {},
		'military': 0,
		'mass': 0
	};
	for(var i = 0; i < fleet.ships.length; i++)
	{
		var ship = ships[i];
		response.num_ships++;
		response.num_class[ship.machineClass.id]++;
		response.military += model.militaryPower(ship);
		response.mass += model.getMass(ship);
	}
	return response;
};

exports.scanSystem = function(player, system, time)
{
	// Already known: name, type, location, hasPlayer, hasGuild.
	response = { 'id': system.id };
	if(system.planetsInfo.time >= time) response.planetsInfo = system.planetsInfo;
	return response;
};

exports.enterSystem = function(player, system, time)
{
	var planets = {};
	for(var i in system.planets)
	{
		var planet = system.planets[i];
		if(planet.time < time) continue;
		planets[i] = {
			'id': planet.id,
			'name': planet.name,
			'type': planet.type,
			'orbit': planet.orbit,
			'mass': planet.mass,
			'area': planet.area,
			'player': planet.player.username,
			'guild': planet.player.guild.id
		};
	}
	var ships = {};
	// TODO just attackers, or all ships in orbit, too?
	return {
		'id': system.id,
		'planets': planets,
		'ships': ships
	};
};

exports.scanPlanet = function(player, planet, time)
{
	// TODO
};

exports.enterPlanet = function()
{
	// TODO
};

exports.newMachine = function()
{
	// TODO
};

exports.updateMachine = function()
{
	// TODO
};
