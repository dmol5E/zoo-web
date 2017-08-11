var api = require('../api/animal_api.js');
var express = require('express');
var nodeExcel = require('excel-export');
var router = express.Router();

/* GET /animals/file */
router.get('/', function(req, res, next) {
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

router.get('/xslx', function(req, res, next) {
	api.findAll()
		.then(function(animals) {
			var conf = {};
			conf.stylesXmlFile = './node_modules/excel-export/example/styles.xml';
			conf.name = 'Animals';
			conf.cols = [{
				caption: 'Name',
				type: 'string'
			}, {
				caption: 'Species',
				type: 'string'
			}, {
				caption: 'Age',
				type: 'number'
			}, {
				caption: 'Cage',
				type: 'String'
			}, {
				caption: 'Keeper',
				type: 'String'
			}];
			var animalsData = [];
			animals.forEach(function(animal) {
				animalsData.push([animal.name, animal.species, animal.age, animal.cage, animal.keeper.name + ' ' + animal.keeper.first_name]);
			});
			conf.rows = animalsData;

			var result = nodeExcel.execute(conf);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');
			res.setHeader("Content-Disposition", "attachment; filename=" + "Animals.xlsx");
			res.end(result, 'binary');
		})
		.catch(function(error) {
			return next(error);
		});
});

module.exports = router;