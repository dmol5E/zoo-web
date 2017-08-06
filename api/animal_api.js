var Keeper = require('../models/Keeper.js');
var Animal = require('../models/Animal.js');
var mongoose = require('mongoose');

exports.findAll = function() {
	return Animal.find({}).populate('keeper');
};

exports.findAllWithoutParams = function(params) {
	return Animal.find({}).select(params).populate('keeper');
};

exports.findById = function(id) {
	return Animal.findById(id).populate('keeper');
};

exports.createAnimal = function(animalData) {
	var animal = {
		name: animalData.name,
		species: animalData.species,
		age: animalData.age,
		cage: animalData.cage,
	};
	return new Animal(animal).save();
};

exports.importAnimals = function(animalDataFile) {
	var animalData = JSON.parse(animalDataFile.data);
	var complete = new Promise((resolve, reject) => {
		animalData.forEach(function(element, index) {
			var keeper = element.keeper;
			if ('_id' in element.keeper) {
				var id = element.keeper._id;
				element.keeper = id;
				resolve(Animal.insertMany(animalData));
			} else {
				var keeperData = {
					first_name: element.keeper.first_name,
					name: element.keeper.name
				};
				var newKeeper = new Keeper(keeperData).save();
				newKeeper.then(function(item) {
					element.keeper = item._id;
					resolve(Animal.insertMany(animalData));
				});
			}
		});
	});
	return complete;
};

exports.findByIdAndUpdate = function(id, animalData) {
	var animal = {
		name: animalData.name,
		species: animalData.species,
		age: animalData.age,
		cage: animalData.cage,
		keeper: animalData.keeper
	};
	console.log('Updating Animal' + id + ': ' + animalData.keeper);
	return Animal.findByIdAndUpdate(id, animal);
};

exports.deleteAnimal = function(animalId, animalData) {
	return Animal.findByIdAndRemove(animalId, animalData);
};

exports.getAllKeepers = function() {
	return Keeper.find({});
};