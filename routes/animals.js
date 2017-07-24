var api = require('../api/animal_api.js');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	api.findAll()
		.then(function(animals) {
			res.json(animals);
		})
		.catch(function(error) {
			return next(error);
		});
});

module.exports = router;