SocketConfig = function (socket, game) {
	socket.emit('tryConnectionMobile');

	// get players in game and get div
	var	submiteCode = document.getElementById("submiteCode")
	 ,	ready = document.getElementById("ready")
	 ,	loading = document.getElementById("loading")
	 ,	codeE = document.getElementById("code")
	 ,	error = document.getElementById("error")
	 ,	errorContain = document.getElementById("errorContain")
	 ,	connect = document.getElementById("connect")
	 ,	connectContain = document.getElementById("connectContain")
	 ,	start = document.getElementById("start")
	 ,	game = document.getElementById("game");

	// When connection is check initialize
	socket.on('connectionOk', function() {
		initialize();
	});

	var initialize = function() {
		// Put js on buttons.
		submiteCode.onclick = SubmiteCode;

		// render code input
		ready.style.display = 'inline';
		loading.style.display = 'none';	
	};

	// Test code if is ok, send him to the server.
	var SubmiteCode = function() {
		var code = codeE.value;
		if (code.length == 4 && code.match(/^\d+$/)) {
			socket.emit('submiteCode', code);
			error.style.display = "none";
		} else {
			error.style.display = "block";
			errorContain.innerHTML = "code can only contain number";
		}
	};

	// Connection is Ok
	socket.on('roomConnect', function(roomId) {
		ready.style.display = 'none';
		connect.style.display = 'block';
		connectContain.innerHTML += " " + roomId;
	});

	// There is no room with this code
	socket.on('roomInvalide', function(roomId) {
		error.style.display = "block";
		errorContain.innerHTML = "No room with this code is created : " + roomId;	
	});

	// start game
	socket.on('startGame', function () {
		start.style.display = "none";
		game.style.display = "inline";
		game.onclick = GameAction;
		window.game.init();
	});

	var GameAction = function () {
		socket.emit('gameAction');
	};
};
