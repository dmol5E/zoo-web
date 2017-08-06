var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Keeper = require('./Keeper');

var AnimalSchema = Schema({
	name: {
		type: String,
		uniquie: true,
		required: true
	},
	species: String,
	age: Number,
	cage: String,
	keeper: { type: Schema.ObjectId, ref: 'Keeper'}
});

module.exports = mongoose.model('Animal', AnimalSchema);