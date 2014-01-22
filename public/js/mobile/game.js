Game = function (socket) {
	this.socket = socket;
};

Game.prototype.init = function() {
	this.inputManager = new InputManager ();
	startLoop();
};

Game.prototype.loop = function() {
	this.sendInputs();
};

Game.prototype.sendInputs = function() {
	socket.emit('inputPosition', this.inputManager.getInput());
};