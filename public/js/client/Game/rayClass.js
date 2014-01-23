Ray = function () {
	this.targetPos = -1;
	this.position = -1;
	this.speed = 0.5;
	this.startRay = true;
};

Ray.prototype.update = function() {
	if (this.targetPos == -1)
		return;
	var dltPos = this.targetPos-this.position;
	var currSpeed = Math.sign(Math.abs(dltPos)>0.04?dltPos:0)*this.speed;
	var changePos = currSpeed*deltaTime;
	this.position += changePos;
};

Ray.prototype.render = function(canvas) {
	if (this.targetPos == -1)
		return;
	canvas.renderRay(this);
};

Ray.prototype.setPosition = function(targetPos) {
	this.targetPos = targetPos;
	if (this.startRay && targetPos != -1) {
		this.position = targetPos;
		this.startRay = false;
	} else if (targetPos == -1) {
		this.startRay = true;
		this.position = -1;
	}
};