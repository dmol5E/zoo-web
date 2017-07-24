var mongoose = require('mongoose');

var AnimalSchema = mongoose.Schema({
	name: {
		type: String,
		uniquie: true,
		required: true
	},
	kind: String,
	age: Number,
	nourished_at: Date,
	cage: String,
	keeper: [{
		first_name: String,
		last_name: String
	}]
});

module.exports = mongoose.model('Animal', AnimalSchema);