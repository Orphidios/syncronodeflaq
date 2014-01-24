Game = function () {
	this.mainCanvas = new Canvas(800, 600, "gameCanvas");
	this.sheepManager = new SheepManager();
	this.ray = new Ray();
};

// Call for initialisation;
Game.prototype.init = function() {
	this.sheepManager.init();
};

Game.prototype.loop = function() {
	deltaTime = Game.perSecond();
	this.update();
	this.render(this.mainCanvas);
};

Game.prototype.update = function() {
	this.ray.update();
	this.sheepManager.update();
};

Game.prototype.render = function(canvas) {
	this.mainCanvas.clearCanvas();
	this.ray.render(canvas);
	this.sheepManager.render(canvas);
};

Game.prototype.inputRay = function(position) {
	this.ray.setPosition(position);
};

Game.perSecond = function() {
	Game.time = Game.time || new Date();
	var t = new Date();
	var dt = (t - Game.time) / 1000;
	Game.time = t;
	return dt;
};