var api = require('../api/animal_api.js');
var express = require('express');
var router = express.Router();

/* GET /animals */
router.get('/', function (req, res, next) {
	api.findAll()
		.then(function(animals) {
			res.json(animals);
		})
		.catch(function(error) {
			return next(error);
		});
});

/* GET /animals/:id */
router.get('/:id', function(req, res, next) {
	api.findById()
		.then(function(animal) {
			res.json(animal);
		})
		.catch(function(error) {
			return next(error);
		});
});

/* POST /animals/:id */
router.post('/', function(req, res, next) {
	api.createAnimal(req.body)
		.then(function(animal) {
			res.json(animal);
		})
		.catch(function(error) {
			return next(error);
		});
});

/* DELETE /animals/:id */
router.delete('/:id', function(req, res, next) {
	api.deleteAnimal(req.params.id, req.body)
		.then(function(post) {
			res.json(post);
		})
		.catch(function(error) {
			return next(error);
		});
});

/* GET /animals/file */
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

module.exports = router;