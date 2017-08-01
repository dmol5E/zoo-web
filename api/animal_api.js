var Animal = require('../models/Animal.js');

exports.findAll = function() {
	return Animal.find({});
};

exports.findAllWithoutParams = function(params) {
	return Animal.find({}).select(params);
};

exports.findById = function(id) {
	return Animal.findById(id);
};

exports.createAnimal = function (animalData) {
	var animal = {
		name: animalData.name,
		kind: animalData.kind,
		age: animalData.age,
		cage: animalData.cage,
	};
	return new Animal(animal).save();
};

exports.deleteAnimal = function(animalId, animalData) {
	return Animal.findByIdAndRemove(animalId, animalData);
}