function AGGalaxy()
{
	this.id = 0;
	this.name = '';
	this.num_sectors = 0;
	this.num_players = 0;
	this.num_stars = 0;
	this.num_guilds = 0;
};

AGGalaxy.prototype.updateGalaxy = function()
{
	if(this.id === 0) return {};
	return this;
};
