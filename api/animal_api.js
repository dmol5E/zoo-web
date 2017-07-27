var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/zoo')
	.then(() => console.log('Connection to MongoDB succesful.'))
		.catch((err) => console.error(err));
var Animal = require('../models/Animal.js');

exports.findAll = function() {
	return Animal.find({});
};

exports.findAllWithoutParams = function(params) {
	return Animal.find({}).select(params);
}

exports.createAnimal = function (animalData) {
	var animal = {
		name: animalData.name,
		kind: animalData.kind,
		age: animalData.age,
		cage: animalData.cage,
	};
	return new Animal(animal).save();
};