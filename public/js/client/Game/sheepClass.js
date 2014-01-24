Sheep = function () {
	this.position = new Vector(Math.random()>0.5?-25:825, 550);
	this.speed = -Math.sign(this.position.x)*(Math.random()*200 + 100)|0;
	this.running = true;
	this.captured = false;
	this.beingCaptured = false;
	this.renderColor = 'black';
};

Sheep.prototype.update = function() {
	if (!this.running)
		return;
	if (this.position.x > 900 || this.position.x < -50 || this.position.y < -50) {
		this.running = false;
		var that = this;
		setTimeout(function () {
			that.recycle();
		}, Math.random()*1500 + 250);
	} else if (this.captured) {
		this.position.y -= 250*deltaTime;
	} else {
		var dltPos = this.speed*deltaTime;
		this.position.x += dltPos;
		var rayPos = game.ray.position;
		if ((rayPos != -1)&&(Math.abs(rayPos*800 - this.position.x) < 40 )) {
			this.renderColor = 'blue'
			this.startCapture();
		} else {
			this.renderColor = 'black'
			this.beingCaptured = false;
		}
	}
};

Sheep.prototype.render = function(canvas) {
	canvas.drawBox(this.position.x-20, this.position.y-20, 40, 40, this.renderColor);
};

Sheep.prototype.recycle = function() {
	this.running = true;
	this.beingCaptured = false;
	this.captured = false;
	this.position = new Vector(Math.random()>0.5?-25:825, 550);
	this.speed = -Math.sign(this.position.x)*(Math.random()*200 + 100)|0;
};

Sheep.prototype.startCapture = function() {
	if (!this.beingCaptured) {
		this.beingCaptured = true;
		this.startTimeCapture = new Date();
	} else {
		var t = new Date();
		var deltaT = t - this.startTimeCapture;
		if (deltaT > 500) {
			this.captured = true;
			this.renderColor = 'red';
		}
	}
};