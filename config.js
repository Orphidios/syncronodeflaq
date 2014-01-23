module.exports = function(app, express, io) {
	var config = this;

	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');

		// Public folder for the client
		app.use(express.static(__dirname + '/public'));
		
		// Configuring Express for POST and cookies/sessions data
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.session({
			secret: '4facdbfeabc5e6c526bf6a96d9c666686263835c6bf',
			logged: false,
			originalRoute: ''
		}));
		app.use(express.methodOverride());
		app.use(function (req, res, next) {
			res.locals.session = req.session;
			next();
		})

		// Using the router
		app.use(app.router);

		var rooms = {};

		randomId = function() {
			var rID = Math.random()*10000|0;
			rID+="";
			while (rID.length<4) {
				rID = "0" + rID;
			}
			return rID;
		}

		// Usin Socket Io
		io.sockets.on('connection', function (socket) {
		// Client part
			// when the client emits 'newRoom', this listens and executes
			socket.on('newRoom', function() {
				// Create a unique room ID
				var roomId = randomId();
				while (rooms[roomId]) {roomId = randomId();}
				// store the room name in the socket session for this client
				socket.roomId = roomId;
				// Add room to rooms
				rooms[roomId] = [];
				// send client to room
				socket.join(roomId);
				// echo to client they've connected
				socket.emit('roomConnect', roomId);
				console.log("New room with ID : " + roomId);
			});

			socket.on('destroyRoom', function() {
				// Get whitch room we need to destroy
				var roomId = socket.roomId;
				// remove room to rooms
				rooms[roomId] = undefined;
				console.log("destroy room : " + roomId);
			});

			socket.on('startGame', function () {
				socket.broadcast.to(socket.roomId).emit('startGame');
			});


		// Mobile part
			socket.on('submiteCode', function(roomId) {
				if (!!rooms[roomId]) {
					// Code is valid and room exist
					console.log("Code is valid and room exist. Code : " + roomId);
					// store the room name in the socket session for this client
					socket.roomId = roomId;
					// Mobile join the room
					socket.join(roomId);
					// echo to client they're connected
					socket.emit('roomConnect', roomId);
					// Send to room that a new player is connected.
					socket.broadcast.to(roomId).emit('newPlayer');
					console.log("Room ID : " + socket.roomId);
				} else {
					// No room associate with this code
					console.log("No room associate with this code : " + roomId);
					// echo to client they're connected
					socket.emit('roomInvalide', roomId);
				}
			});
			// Syncronise la connection mobile <---> Serveur
			socket.on('tryConnectionMobile', function() {
				console.log("Mobile connection Ok");
				socket.emit('connectionOk');
			});

			socket.on('inputPosition', function (position) {
				socket.broadcast.to(socket.roomId).emit('inputPosition', position);
			});		
		});
	});

	return config;
};
