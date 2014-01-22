module.exports = function(app) {

	/////////////
	// Imports //
	/////////////
	var	Utils           = require('../Utils')
	,	AuthModule      = require('../modules/auth')
	,	RouteModule     = require('../modules/routing')
	,	frontController = require('../controllers/FrontController');

	var routes  = this;

	////////////////
	// GET routes //
	////////////////

	// Homepage
	app.get('/', Utils.renderer('index'));

	// Computer Game Creation
	app.get('/rooms', Utils.renderer('rooms'));

	// Computer Game Creation
	app.get('/mobile', Utils.renderer('indexmobile'));

	app.get('/gyro', Utils.renderer('gyro'));
	/////////////////
	// POST routes //
	/////////////////

	// Mobile request Rooms
	app.post('/', Utils.checkRooms);

	return routes;
}