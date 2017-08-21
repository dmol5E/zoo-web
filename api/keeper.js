var Animal = require('../models/Animal.js');


exports.getMyAnimals = function(User) {
	return Animal.find({ keeper: User._id });
};