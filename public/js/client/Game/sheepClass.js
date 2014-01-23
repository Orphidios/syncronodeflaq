Sheep = function () {
	this.position = new Vector(Math.random()>0.5?-25:825, 550);
	this.speed = -Math.sign(this.position.x)*(Math.random()*200 + 100)|0;
	this.running = true;
	this.renderColor = 'black';
};

Sheep.prototype.update = function() {
	if (!this.running)
		return;
	if (this.position.x > 900 || this.position.x < -50) {
		this.running = false;
		var that = this;
		setTimeout(function () {
			that.recycle();
		}, Math.random()*1500 + 250);
	} else {
		var dltPos = this.speed*deltaTime;
		this.position.x += dltPos;
		var rayPos = game.ray.position;
		if (rayPos != -1) {
			if (Math.abs(rayPos*800 - this.position.x) < 20 ) {
				this.renderColor = 'blue'
			} else {
				this.renderColor = 'black'
			}
		}
	}
};

Sheep.prototype.render = function(canvas) {
	if (!this.running)
		return;
	canvas.drawBox(this.position.x-20, this.position.y-20, 40, 40, this.renderColor);
};

Sheep.prototype.recycle = function() {
	this.running = true;
	this.position = new Vector(Math.random()>0.5?-25:825, 550);
	this.speed = -Math.sign(this.position.x)*(Math.random()*200 + 100)|0;
};