var Keeper = require('../models/Keeper.js');
var Animal = require('../models/Animal.js');
var mongoose = require('mongoose');

exports.findAll = function() {
	return Animal.find({}).populate('keeper');
};

exports.findAllWithoutParams = function(params) {
	return Animal.find({}).select(params).populdate('keeper');
};

exports.findById = function(id) {
	return Animal.findById(id).populate('keeper');
};

exports.createAnimal = function (animalData) {
	var animal = {
		name: animalData.name,
		species: animalData.species,
		age: animalData.age,
		cage: animalData.cage,
	};
	return new Animal(animal).save();
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