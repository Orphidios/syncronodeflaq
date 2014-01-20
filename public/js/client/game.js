Game = function () {
	console.log('CALL --> Game Constructor');
	this.players = [];
	this.mainCanvas = new Canvas(800, 600, "gameCanvas"); 
};

// Call for initialisation;
Game.prototype.init = function() {
	console.log('CALL --> Game init');
};

Game.prototype.loop = function() {
	this.update();
	this.render();
};

Game.prototype.update = function() {
	
};

Game.prototype.render = function() {
	this.mainCanvas.clearCanvas();
	
};