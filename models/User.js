var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	name: String,
	role: {
		type: String,
		required: true,
		default: 'Keeper'
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);