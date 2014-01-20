SocketConfig = function (socket, game) {
	console.log('CALL --> Socket Configuration');

	// get players in game and get div
	var players = game.players
	 ,	startDiv = document.getElementById("start")
	 ,	loadingDiv = document.getElementById("loading")
	 ,	roomIdDiv = document.getElementById("roomId")
	 ,	launchDiv = document.getElementById("launch")
	 ,	gameDiv = document.getElementById("game");

	// Tell the server that we create a new room.
	socket.emit('newRoom');

	// when the server emits 'roomConnect', this listens and executes
	socket.on('roomConnect', function (roomId){
		console.log("MSG : SERVER --> your are part of the room " + roomId);
		startDiv.style.display = 'inline';
		loadingDiv.style.display = 'none';
		roomIdDiv.innerHTML = roomId;
	});

	// when the server emits 'newPlayer', this listens and executes
	socket.on('newPlayer', function (clientId) {
		// Add player to the game
		players.push(clientId);

		// If there is at least 2 player you can start the game
		if (players.length > 0) {
			launchDiv.style.display = "inline";
			launchDiv.onclick = startGame;
		}
	});

	// when the server emits 'newPlayer', this listens and executes
	socket.on('position', function (id, position) {
		console.log('MSG : SERVER --> playerAction client id = ' + id);
		var newLeft = 500 + position*400;
		document.getElementById(id).style.left = newLeft+"px";
	});

	// Start the game (2 player needed)
	startGame = function () {
		startDiv.style.display = "none";
		gameDiv.style.display = "inline";
		socket.emit('startGame');
		for(var i=0; i<players.length; i++) {
			var div = document.createElement('div');
			div.style.width = div.style.height = "50px";
			div.style.position = "fixed";
			div.style.top = "250px";
			div.style.left = "500px";
			div.style.backgroundColor = 'black';
			div.id = players[i];
			gameDiv.appendChild(div);
		}
	};
}