// 
// Windows Init 
// 

// Var
var socket = io.connect();
var game = new Game();

Math.sign = function (x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
};

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
	// Configure socket with game;
	SocketConfig(socket, game);
}

window.onunload = function() {
	socket.emit('destroyRoom');
};

window.startLoop = function() {
	// Init game
	game.init();
	onEachFrame(loop);
}

loop = function()
{
	game.loop();
}