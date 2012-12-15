function AGPlayer()
{
	this.id = 0;
	this.username = '';
	this.credits = 0;
	this.technologies = [];
	this.population = 0;
	this.research = {
		"value": 0,
		"time": 0
	};
};

AGPlayer.prototype.loginResponse = function()
{
	if(this.id === 0) return {};
	return this;
};

