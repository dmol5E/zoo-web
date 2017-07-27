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

router.get('/file', function (req, res, next) {
	api.findAllWithoutParams('-_id')
		.then(function(animals) {
			res.attachment('animal.json');
			res.send(animals);
			res.end();
		})
		.catch(function(error) {
			return next(error);
		});
});

router.post('/', function(req, res, next) {
	console.log('Create Animal');
	api.createAnimal(req.body)
		.then(function(animal) {
			res.json(animal);
		})
		.catch(function(error) {
			return next(error);
		});
});

module.exports = router;