var express = require('express');
var router = express.Router();
var auth = require('../api/AuthController');
var sec = require('../security/authentication');

router.get('/register', auth.register);

router.post('/register', auth.doRegister);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

router.get('/', sec.isLoggedIn , auth.home);

module.exports = router;
