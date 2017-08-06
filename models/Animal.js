var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var Keeper = require('./Keeper');

var AnimalSchema = Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	species: String,
	age: Number,
	cage: String,
	keeper: { type: Schema.ObjectId, ref: 'Keeper'}
});

AnimalSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Animal', AnimalSchema);