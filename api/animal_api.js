var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/zoo')
	.then(() => console.log('Connection to MongoDB succesful.'))
		.catch((err) => console.error(err));
var Animal = require('../models/Animal.js');

exports.findAll = function() {
	return Animal.find({});
};

exports.createAnimal = function (animalData) {
	/**var Animal ({
		name: animalData.name,
		kind: animalData.kind,

	})**/
}