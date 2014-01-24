SocketConfig = function (socket, game) {
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
	socket.on('newPlayer', function () {
		startGame();
	});

	// when the server emits 'newPlayer', this listens and executes
	socket.on('inputPosition', function (position) {
		game.inputRay(position);
	});

	// Start the game
	startGame = function () {
		startDiv.style.display = "none";
		gameDiv.style.display = "inline";
		socket.emit('startGame');
		startLoop();
	};
}