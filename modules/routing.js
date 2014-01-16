module.exports = (function() {
	'use strict';

	var Route = {};

	Route.redirectHome = function(req, res) {
		return res.redirect('/');
	};

	return Route;
})();