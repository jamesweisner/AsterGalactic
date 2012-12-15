function AGSector()
{
	this.id = 0;
	this.location = { 'top': 0, 'left': 0 };
	this.size = { 'width': 0, 'height': 0 };
	this.starsInfo = {
		'time': 0,
		'count': 0,
		'resources': 0,
		'area': 0
	};
	this.playerInfo = {
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
};

AGSector.prototype.updateSector = function(cacheTime)
{
	if(this.id === 0) return {};
	var response = { 'id': this.id };
	if(cacheTime === 0)
	{
		response.location = this.location;
		response.size = this.size;
	}
	if(this.starsInfo.time >= cacheTime)
		response.starsInfo = this.starsInfo;
	if(this.playerInfo.time >= cacheTime)
		response.playerInfo = this.playerInfo;
	if(this.guildInfo.time >= cacheTime)
		response.guildInfo = this.guildInfo;
	if(this.otherInfo.time >= cacheTime)
		response.otherInfo = this.otherInfo;
	return response;
};
