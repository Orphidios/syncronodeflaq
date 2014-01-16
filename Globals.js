module.exports = (function() {
	'use strict';

	var Globals = {
		DB_URL: 'mongodb://localhost/Quizz',
		NB_QUESTIONS: 10,
		messages: {
			error: {
				REGISTER_PWD_MATCH             : 'Passwords do not match!',
				REGISTER_FIELDS_EMPTY          : 'You have to fill all the fields',
				REGISTER_USERNAME_ALREADY_TAKEN: 'Username already taken',
				LOGIN_FIELDS_EMPTY             : 'You have to fill all the fields',
				USER_NOT_FOUND                 : 'User not found',
				QUESTION_FORM_FIELDS_EMPTY     : 'You have to fill all the fields',
				NO_QUESTIONS_FOUND             : 'No questions found in database'
			},
			info: {
				USER_REGISTERED_SUCCESS: 'User successfully registered',
				QUESTION_INSERT_SUCCESS: 'New question added'
			}
		}
	}

	return Globals;
})();