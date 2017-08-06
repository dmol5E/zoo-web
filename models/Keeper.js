var mongoose = require('mongoose');

var KeeperSchema = mongoose.Schema({
	first_name: String,
	name: String
});

module.exports = mongoose.model('Keeper', KeeperSchema);