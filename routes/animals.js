var api = require('../api/animal_api.js');
var express = require('express');
var router = express.Router();

var isRoleZoolgist = function(req, res, next) {
	if (!(req.user.role == 'Zoologist')) {
		var error = new Error('Not authorized');
		error.status = 401; // Unauthorized
		return next(error);
	}
	next();
};

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
router.post('/', isRoleZoolgist , function(req, res, next) {
	api.createAnimal(req.body)
		.then(function(animal) {
			res.json(animal);
		})
		.catch(function(error) {
			return next(error);
		});
});

router.post('/import', function(req, res, next) {
	api.importAnimals(req.files.import)
		.then(function(animals) {
			res.json(animals);
		})
		.catch(function(error) {
			console.error(error);
			return next(error);
		});
});

router.get('/keepers/', isRoleZoolgist, function(req, res, next) {
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

router.put('/:id', isRoleZoolgist, function(req, res, next) {
	api.findByIdAndUpdate(req.params.id, req.body)
		.then(function(post) {
			res.json(post);
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

module.exports = router;