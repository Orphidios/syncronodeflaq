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
	deltaTime = Game.perSecond();
	this.update();
	this.render(this.mainCanvas);
};

Game.prototype.update = function() {
	for (var i = 0; i < this.players.length; i++ ) {
		this.players[i].update();
	}	
};

Game.prototype.render = function(canvas) {
	this.mainCanvas.clearCanvas();
	for (var i = 0; i < this.players.length; i++ ) {
		this.players[i].render(canvas);
	}		
};

Game.prototype.inputPlayer = function(id, force) {
	var player = this.getPlayerById(id);
	player.applyForce(force);
};

Game.prototype.addPlayer = function(id) {
	this.players.push(new Player(id));
};

Game.prototype.getPlayerById = function(playerId) {
	for (var i = 0; i < this.players.length; i++ ) {
		if(this.players[i].id = playerId)
			return this.players[i];
	}
};

Game.perSecond = function() {
	Game.time = Game.time || new Date();
	var t = new Date();
	var dt = (t - Game.time) / 1000;
	Game.time = t;
	return dt;
};