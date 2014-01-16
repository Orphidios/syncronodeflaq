module.exports = function() {
	'use strict';

	/////////////
	// Imports //
	/////////////
	var	Globals         = require('../Globals')
	,	Utils           = require('../Utils')
	,	RouteModule     = require('../modules/routing');

	/**
	 * @constructor
	 */
	var FrontController = function() {};


	// /**
	//  * Called when the login form is submitted
	//  * @param  {Request} req
	//  * @param  {Response} res
	//  */
	// FrontController.prototype.postLoginAction = function(req, res) {
	// 	if (!req.body.username || !req.body.password) {
	// 		res.render('login', {
	// 			message: { text: Globals.messages.error.LOGIN_FIELDS_EMPTY, error: 1 }
	// 		});
	// 		return;
	// 	}

	// 	// Check if the user exists
	// 	var User = models.User;
	// 	User.findOne({
	// 		username: req.body.username,
	// 		password: req.body.password
	// 	}, onUserQueryComplete);
		
	// 	function onUserQueryComplete (err, data) {
	// 		if (err || data.length == 0) {
	// 			res.render('login', {
	// 				message: { text: Globals.messages.error.USER_NOT_FOUND, error: 1 }
	// 			});
	// 			return;
	// 		}

	// 		// The user is successfully connected
	// 		req.session.user_id = data._id;
	// 		req.session.username = data.username;
	// 		req.session.logged = true;
	// 		RouteModule.redirectHome(req, res);
	// 	}
	// };

	// /**
	//  * Called when the register form is submitted
	//  * @param  {Request} req
	//  * @param  {Response} res
	//  */
	// FrontController.prototype.postRegisterAction = function(req, res) {
	// 	if (req.body.password != req.body.passwordBis) {
	// 		res.render('register', {
	// 			message: { text: Globals.messages.error.REGISTER_PWD_MATCH, error: 1 }
	// 		});
	// 		return;
	// 	}

	// 	if (!req.body.username || !req.body.password || !req.body.passwordBis) {
	// 		res.render('register', {
	// 			message: { text: Globals.messages.error.REGISTER_FIELDS_EMPTY, error: 1 }
	// 		});
	// 		return;
	// 	}
		
	// 	var User = models.User;
	// 	var user = new User({
	// 		username: req.body.username,
	// 		password: req.body.password,
	// 		salt    : Utils.security.createHash(req.body.username + req.body.password)
	// 	});

	// 	// Check if the user doesn't already exist
	// 	models.User.findOne({username: user.username}, onQueryComplete);
	// 	function onQueryComplete (err, data) {
	// 		if (data.length > 0) {
	// 			res.render('register', {
	// 				title  : 'Register',
	// 				message: { text: Globals.messages.error.REGISTER_USERNAME_ALREADY_TAKEN, error: 1 }
	// 			});
	// 			return;
	// 		}

	// 		// Saving the user to DB
	// 		user.save(onUserSaveComplete);
	// 		function onUserSaveComplete (err) {
	// 			if (err) {
	// 				console.log("Error while creating user in Database");
	// 				throw err;
	// 			} else {
	// 				console.log("User created");
	// 			}

	// 			res.render('register', {
	// 				message: { text: Globals.messages.info.USER_REGISTERED_SUCCESS, info: 1 }
	// 			});
	// 		}
	// 	}
	// };

	// *
	//  * Called when the form to create a question is submitted
	//  * @param  {Request} req
	//  * @param  {Response} res
	 
	// FrontController.prototype.postCreateQuestionAction = function(req, res) {
	// 	var questionData = {
	// 		text        : req.body.text,
	// 		rightAnswers: {
	// 			a: req.body.good_answer_1
	// 		},
	// 		wrongAnswers: {
	// 			a: req.body.bad_answer_1,
	// 			b: req.body.bad_answer_2,
	// 			c: req.body.bad_answer_3
	// 		}
	// 	};
		
	// 	if (!questionData.text || !questionData.rightAnswers.a || !questionData.wrongAnswers.a || !questionData.wrongAnswers.b || !questionData.wrongAnswers.c) {
	// 		res.render('createQuestion', {
	// 			message: { text: Globals.messages.error.QUESTION_FORM_FIELDS_EMPTY, error: 1 }
	// 		});
	// 		return;
	// 	}

	// 	var Question = models.Question;
	// 	var newQuestion = new Question(questionData);
	// 	newQuestion.save(onQuestionInsertComplete);
	// 	function onQuestionInsertComplete (err) {
	// 		if (err) {
	// 			console.log("Error while inserting question in Database");
	// 			throw err;
	// 		} else {
	// 			console.log("New question inserted");
	// 		}

	// 		return res.render('createQuestion', {
	// 			message: { text: Globals.messages.info.QUESTION_INSERT_SUCCESS, info: 1 }
	// 		});
	// 	}
	// };

	// /**
	//  * The quizz page
	//  * @param  {Request} req
	//  * @param  {Response} res
	//  */
	// FrontController.prototype.quizzAction = function(req, res) {
	// 	var qIndex = req.params.index;
	// 	if (!qIndex) {
	// 		qIndex = 1;
	// 	} else {
	// 		qIndex = parseInt(qIndex.substr(1));
	// 	}

	// 	var answer = res.body ? res.body.answer : null;
	// 	console.log('answer: ', answer);

	// 	// Check if the index is correct with the player's progression
	// 	var savedQIndex = (req.session && req.session.hasOwnProperty('qIndex')) ? req.session.qIndex : 0;
	// 	if (savedQIndex && qIndex <= savedQIndex) {	// If there was already a progression, but the player tries to access a previous question
	// 		console.log('Return to question 0');
	// 		delete req.session.qIndex;
	// 	} else if (savedQIndex && qIndex > savedQIndex + 1) {	// If the player tries to skip a question
	// 		console.log('Trying to skip question');
	// 	} else {
	// 		req.session.qIndex = qIndex;
	// 	}

	// 	// Retrieve the question from DB
	// 	var Question = models.Question;
	// 	Question.findOne(onQueryComplete);
	// 	function onQueryComplete (err, data) {
	// 		if (data.length == 0 || err) {
	// 			if (err) {
	// 				console.log('Error querying a question.');
	// 			}
	// 			return res.render('quizz', {
	// 				message: { text: Globals.messages.error.NO_QUESTIONS_FOUND, error: 1 }
	// 			});
	// 		}

	// 		console.log('question: ', data);
	// 		return res.render('quizz', {
	// 			question: data
	// 		});
	// 	}

	// };

	return new FrontController();
};