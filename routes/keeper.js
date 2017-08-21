var express = require('express');
var router = express.Router();
var keeper = require('../api/keeper.js');

router.get('/', function(req, res, next) {
	keeper.getMyAnimals(req.user)
		.then(function(animals) {
			res.json(animals);
		})
		.catch(function(error) {
			return next(error);
		});
});


module.exports = router;