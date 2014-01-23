Game = function () {
	console.log('CALL --> Game Constructor');
	this.mainCanvas = new Canvas(800, 600, "gameCanvas");
};

// Call for initialisation;
Game.prototype.init = function() {
	console.log('CALL --> Game init');
	this.sheepManager = new SheepManager();
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

Game.prototype.createRay = function() {
	this.ray = new Ray();
};

Game.perSecond = function() {
	Game.time = Game.time || new Date();
	var t = new Date();
	var dt = (t - Game.time) / 1000;
	Game.time = t;
	return dt;
};