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

// Only send sector dimensions the first time the player enters the galaxy.
exports.enterGalaxy = function(galaxy, time)
{
	var sectors = [];
	if(time > 0)
	{
		for(var i = 0; i < galaxy.sectors.length; i++)
		{
			var sector = galaxy.sectors[i];
			sectors[i] = {
				'id': sector.id,
				'location': sector.location,
				'size': sector.size
			};
		}
	}
	return {
		'id': galaxy.id,
		'name': galaxy.name,
		'num_sectors': galaxy.sectors.length,
		'num_players': galaxy.players.length,
		'num_systems': galaxy.num_systems,
		'num_guilds': galaxy.guilds.length,
		'sectors': sectors
	};
};

// Show only changed demographic information about the scanned sector.
exports.scanSector = function(sector, time)
{
	var response = { 'id': sector.id };
	if(sector.starsInfo.time  >= time) response.starsInfo  = sector.starsInfo;
	if(sector.playerInfo.time >= time) response.playerInfo = sector.playerInfo;
	if(sector.guildInfo.time  >= time) response.guildInfo  = sector.guildInfo;
	if(sector.otherInfo.time  >= time) response.otherInfo  = sector.otherInfo;
	return response;
};

// Notice that system name, type, and location can change.
// So, check the cache time against the system's base-data update time.
// The destruction of systems is always sent to all players.
// So, we don't have to worry about sending a delete signal for dead systems.
// Similarly, fleets position is interpolated, so fleets are cached.
// Only if a fleet is turned around does the cache become invalidated.
exports.enterSector = function(sector, time)
{
	var response = { 'id': sector.id };
	if(sector.starsInfo.time  >= time) response.starsInfo  = sector.starsInfo;
	if(sector.playerInfo.time >= time) response.playerInfo = sector.playerInfo;
	if(sector.guildInfo.time  >= time) response.guildInfo  = sector.guildInfo;
	if(sector.otherInfo.time  >= time) response.otherInfo  = sector.otherInfo;
	response.systems = [];
	for(var i = 0; i < sector.systems.length; i++)
	{
		var system = sector.systems[i];
		if(system.time < time) continue;
		response.systems[i] = {
			'id': system.id,
			'name': system.name,
			'type': system.type,
			'location': system.location
		};
	}
	response.fleets = [];
	for(var i = 0; i < sector.fleets.length; i++)
	{
		var fleet = sector.fleets[i];
		if(fleet.time < time) continue;
		response.fleets[i] = {
			'id': fleet.id,
			'player': fleet.player.name,
			'origin': fleet.origin,
			'destination': fleet.destination,
			'speed': fleet.speed,
			'timeSent': fleet.timeSent
		};
	}
	return response;
};

exports.newFleet = function()
{
	// TODO
};

exports.updateFleet = function()
{
	// TODO
};

exports.scanFleet = function()
{
	// TODO
};

exports.scanSystem = function()
{
	// TODO
};

exports.enterSystem = function()
{
	// TODO
};

exports.scanPlanet = function()
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
