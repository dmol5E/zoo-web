var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User.js');

exports.home = function(req, res) {
	if(!req.user) {
		var error = new Error('You are not authorized');
		error.status = 403;
		next(error);
	} else if (req.user.role === 'Zoologist') {
		res.render('zoologist', { user: req.user });
	} else if (req.user.role === 'Keeper') {
		res.render('keeper', { user: req.user });
	}
	//res.render('index', { user: req.user });
};

exports.register = function(req, res) {
	res.render('register');
};

exports.doRegister = function(req, res) {
	User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, function(err, user) {
		if (err) {
			console.error(err);
			return res.render('register', { user: user });
		}

		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	});
};

exports.login = function(req, res) {
	res.render('login');
};

exports.doLogin = function(req, res) {
	passport.authenticate('local')(req, res, function () {
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};