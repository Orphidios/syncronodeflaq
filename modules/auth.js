module.exports = (function() {
	'use strict';

	var Auth = {};

	Auth.authorizeGuest = function(req, res, next) {
		if (req.session.hasOwnProperty('user_id')) {
			res.redirect('/');
			return false;
		}
		return next();
	};

	Auth.authorizeLogged = function(req, res, next) {
		if (!req.session.hasOwnProperty('user_id')) {
			res.redirect('/');
			return false;
		}
		return next();
	};

	return Auth;
})();