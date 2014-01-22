SocketConfig = function (socket, game) {
	console.log('CALL --> Socket Configuration');

	// get players in game and get div
	var	startDiv = document.getElementById("start")
	 ,	loadingDiv = document.getElementById("loading")
	 ,	roomIdDiv = document.getElementById("roomId")
	 ,	launchDiv = document.getElementById("launch")
	 ,	gameDiv = document.getElementById("game");

	// Tell the server that we create a new room.
	socket.emit('newRoom');

	// when the server emits 'roomConnect', this listens and executes
	socket.on('roomConnect', function (roomId){
		startDiv.style.display = 'inline';
		loadingDiv.style.display = 'none';
		roomIdDiv.innerHTML = roomId;
	});

	// when the server emits 'newPlayer', this listens and executes
	socket.on('newPlayer', function (clientId) {
		console.log('newPlayer');
		// Add player to the game
		game.addPlayer(clientId);

		// If there is at least 2 player you can start the game
		if (game.players.length > 0) {
			launchDiv.style.display = "inline";
			launchDiv.onclick = startGame;
		}
	});

	// when the server emits 'newPlayer', this listens and executes
	socket.on('position', function (id, position) {
		game.inputPlayer(id, position);
	});

	// Start the game (2 player needed)
	startGame = function () {
		startDiv.style.display = "none";
		gameDiv.style.display = "inline";
		socket.emit('startGame');
		startLoop();
		console.log('startLoop()');
		// for(var i=0; i<players.length; i++) {
		// 	var div = document.createElement('div');
		// 	div.style.width = div.style.height = "50px";
		// 	div.style.position = "fixed";
		// 	div.style.top = "250px";
		// 	div.style.left = "500px";
		// 	div.style.backgroundColor = 'black';
		// 	div.id = players[i];
		// 	gameDiv.appendChild(div);
		// }
	};
}