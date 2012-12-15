function AGSystem()
{
	this.id = 0;
	this.sectorId = 0;
	this.name = '';
	this.type = '';
	this.location = { 'x': 0, 'y': 0 };
	this.objectsInfo = {
		'time': 0,
		'count': 0,
		'resources': 0,
		'area': 0
	};
	this.playerInfo = {
		'time': 0,
		'objects': 0,
		'resources': { 'owned': 0, 'rate': 0, 'remaining': 0 },
		'area': {
			'used': { 'ground': 0, 'orbit': 0 },
			'unused': { 'ground': 0, 'orbit': 0 }
		},
		'military': { 'attack': 0, 'defense': 0 },
		'population': 0
	};
	this.guildInfo = {
		'time': 0,
		'systems': 0,
		'resources': { 'owned': 0, 'rate': 0, 'remaining': 0 },
		'area': {
			'used': { 'ground': 0, 'orbit': 0 },
			'unused': { 'ground': 0, 'orbit': 0 }
		},
		'military': { 'attack': 0, 'defense': 0 },
		'population': 0
	};
	this.otherInfo = {
		'time': 0,
		'systems': 0,
		'resources': { 'owned': 0, 'rate': 0, 'remaining': 0 },
		'area': {
			'used': { 'ground': 0, 'orbit': 0 },
			'unused': { 'ground': 0, 'orbit': 0 }
		},
		'military': { 'attack': 0, 'defense': 0 },
		'population': 0
	};
	this.players = [];
};

AGSector.prototype.updateSector = function(cacheTime)
{
	if(this.id === 0) return {};
	var response = { 'id': this.id };
	if(cacheTime === 0)
	{
		response.sectorId = this.galaxyId;
		response.name = this.name;
		response.type = this.type;
		response.location = this.location;
	}
	if(this.objectsInfo.time >= cacheTime)
		response.objectsInfo = this.objectsInfo;
	if(this.playerInfo.time >= cacheTime)
		response.playerInfo = this.playerInfo;
	if(this.guildInfo.time >= cacheTime)
		response.guildInfo = this.guildInfo;
	if(this.otherInfo.time >= cacheTime)
		response.otherInfo = this.otherInfo;
	return response;
};
