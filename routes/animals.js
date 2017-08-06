var api = require('../api/animal_api.js');
var express = require('express');
var router = express.Router();

/* GET /animals */
router.get('/', function(req, res, next) {
	api.findAll()
		.then(function(animals) {
			res.json(animals);
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

router.post('/import', function(req, res, next) {
	var response = [];
	var errors = [];
	console.log('req.body: ' + JSON.stringify(req.body));
	api.importAnimals(req.files.import)
		.then(function(animals) {
			res.json(animals);
		})
		.catch(function(error) {
			console.error(error);
			return next(error);
		});
	/*.forEach( function(element, index) {
		console.log(element);
		element.then(function(animal) {
			response.push(animal);
		})
		.catch(function(error) {
			errors.push(error);
		});
	});*/
});

router.get('/keepers/', function(req, res, next) {
	api.getAllKeepers()
		.then(function(keepers) {
			res.json(keepers);
		})
		.catch(function(error) {
			return next(error);
		});
});


/* GET /animals/:id */
router.get('/:id', function(req, res, next) {
	api.findById(req.params.id)
		.then(function(animal) {
			res.json(animal);
		})
		.catch(function(error) {
			return next(error);
		});
});

router.put('/:id', function(req, res, next) {
	api.findByIdAndUpdate(req.params.id, req.body)
		.then(function(post) {
			res.json(post);
		})
		.catch(function(error) {
			console.error(error);
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

module.exports = router;