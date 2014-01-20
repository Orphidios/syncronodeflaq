// 
// Windows Init 
// 

// Var
var socket = io.connect();
var game = new Game();

//Fonctions de synchronisation d'affichage
window.requestAnimFrame = (
	function(){
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback, element){
			window.setTimeout(callback, 1000 / 1);
		};
	}
)();

window.onEachFrame = function(cb) {
    var _cb = function() { cb(); requestAnimFrame(_cb); };
    _cb();
}

//initialisation du canvas et lancement de la boucle
window.onload = function(){
	// Init game
	game.init();
	
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