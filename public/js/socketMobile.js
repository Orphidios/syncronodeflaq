// Connection to the socket
var socket = io.connect();

window.onload = function() {
	console.log('mobile connection');
	// Send a message to server
	socket.emit('tryConnectionMobile');
};

var initialize = function() {
	// Put js on buttons.
	document.getElementById('submiteCode').onclick = SubmiteCode;

	// render code input
	document.getElementById('ready').style.display = 'inline';
	document.getElementById('loading').style.display = 'none';	
};

// When connection is check initialize
socket.on('connectionOk', function() {
	initialize();
});

// Test code if is ok, send him to the server.
var SubmiteCode = function() {
	var code = document.getElementById('code').value;
	if (code.length == 4 && code.match(/^\d+$/)) {
		socket.emit('submiteCode', code);
		document.getElementById('error').style.display = "none";
	} else {
		document.getElementById('error').style.display = "block";
		document.getElementById('errorContain').innerHTML = "code can only contain number";
	}
};

// Connection is Ok
socket.on('roomConnect', function(roomId) {
	document.getElementById('ready').style.display = 'none';
	document.getElementById('connect').style.display = 'block';
	document.getElementById('connectContain').innerHTML += " " + roomId;
});

// There is no room with this code
socket.on('roomInvalide', function(roomId) {
	document.getElementById('error').style.display = "block";
	document.getElementById('errorContain').innerHTML = "No room with this code is created : " + roomId;	
});

// start game
socket.on('startGame', function () {
	document.getElementById('start').style.display = "none";
	document.getElementById('game').style.display = "inline";
	document.getElementById('game').onclick = GameAction;
});

var GameAction = function () {
	socket.emit('gameAction');
};

window.onunload = function() {
	
};