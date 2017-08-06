var api = require('../api/animal_api.js');
var express = require('express');
var router = express.Router();

/* GET /animals/file */
router.get('/', function (req, res, next) {
	console.log("getanimals");
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