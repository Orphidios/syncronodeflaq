Player = function (playerId) {
	this.id = playerId;

	this.angularPos = Math.PI/2;
	this.angularSpd = 0;
	this.maxAngSpd = Math.PI;
	this.angularAcc = Math.PI*2;
	this.force = 0;
	this.angTarget = 0;
};

Player.prototype.update = function() {
	this.angTarget = (this.force+0.5) * Math.PI;
	// var dltAngSpd = this.angularAcc*this.force*deltaTime;
	// this.angularSpd = Math.min(this.angularSpd + dltAngSpd, this.maxAngSpd);
	var dltPos = this.angTarget-this.angularPos;
	this.angularSpd = Math.sign(Math.abs(dltPos)>0.07?dltPos:0)*this.maxAngSpd;
	var dltAngPos = this.angularSpd*deltaTime;
	this.angularPos += dltAngPos;
	// if (this.force == 0) {
	// 	this.angularSpd = Math.max(this.angularSpd - this.maxAngSpd*deltaTime, 0);
	// }
};

Player.prototype.render = function(canvas) {
	canvas.renderPlayer(this);
};

Player.prototype.applyForce = function(force) {
	this.force = force;
};