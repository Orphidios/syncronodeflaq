window.onload = function() {
	// Creation socket and game;
	var socket = io.connect();
	var game = new Game();

	// Init game
	game.init();
	
	// Configure socket for with game;
	SocketConfig(socket, game);
};

window.onunload = function() {
	socket.emit('destroyRoom');
};