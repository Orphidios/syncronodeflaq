Game = function (socket) {
	this.socket = socket;
	this.mainCanvas = new Canvas(window.innerWidth - 50, window.innerHeight - 100, "gameCanvas");
	this.eye = new Eye();
	this.mainCanvas.clearCanvas('black');
	this.eye.render(this.mainCanvas);
};

Game.prototype.init = function() {
	this.inputManager = new InputManager ();
	startLoop();
};

Game.prototype.loop = function() {
	this.eye.update();
	this.mainCanvas.clearCanvas('black');
	this.eye.render(this.mainCanvas);
	this.sendInputs();
};

Game.prototype.sendInputs = function() {
	socket.emit('inputPosition', this.inputManager.getInput());
};