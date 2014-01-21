// 
// Windows Init 
// 

// Var
var socket = io.connect();
var game = new Game(socket);

//Fonctions de synchronisation d'affichage
window.requestAnimFrame = function(callback, element) {
	window.setTimeout(callback, 1000 / 30);
};

window.onEachFrame = function(cb) {
    var _cb = function() { cb(); requestAnimFrame(_cb); };
    _cb();
};

//initialisation du canvas et lancement de la boucle
window.onload = function(){	
	// Configure socket with game;
	SocketConfig(socket, game);
}

window.onunload = function() {
	socket.emit('destroyRoom');
};

window.startLoop = function()
{
	onEachFrame(loop);
}

loop = function()
{
	game.loop();
}