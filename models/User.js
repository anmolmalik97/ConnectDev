const mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = new schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('user',UserSchema);