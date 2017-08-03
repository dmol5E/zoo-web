var mongoose = require('mongoose');

var AnimalSchema = mongoose.Schema({
	name: {
		type: String,
		uniquie: true,
		required: true
	},
	species: String,
	age: Number,
	cage: String,
	keeper: {
		first_name: String,
		name: String
	}
});

module.exports = mongoose.model('Animal', AnimalSchema);