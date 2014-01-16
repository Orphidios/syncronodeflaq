var socket = io.connect();
var players = [];
// Tell the server that we create a new room.
socket.emit('newRoom');

// when the server emits 'roomConnect', this listens and executes
socket.on('roomConnect', function (roomId){
	console.log("your are part of the room " + roomId);
	document.getElementById("roomId").innerHTML = roomId;
});

// when the server emits 'newPlayer', this listens and executes
socket.on('newPlayer', function (clientId) {
	players.push(clientId);
	if (players.length > 1) {
		document.getElementById("launch").style.display = "inline";
		document.getElementById('launch').onclick = startGame;
	}
});

// Start the game (2 player needed)
startGame = function () {
	document.getElementById("start").style.display = "none";
	document.getElementById("game").style.display = "inline";
	socket.emit('startGame');
	for(var i=0; i<players.length; i++) {
		var div = document.createElement('div');
		div.style.width = div.style.height = "50px";
		div.style.position = "fixed";
		div.style.top = "250px";
		div.style.left = "500px";
		div.style.backgroundColor = 'black';
		div.id = players[i];
		console.log(players[i]);
		document.getElementById("game").appendChild(div);
	}
};

socket.on('playerAction', function (id) {
	console.log('playerAction client id = ' + id);
	var newTop = (Math.random()*500|0)+250;
	console.log(newTop);
	document.getElementById(id).style.top = newTop+"px";
});

window.onload = function() {

};

window.onunload = function() {
	socket.emit('destroyRoom');
};