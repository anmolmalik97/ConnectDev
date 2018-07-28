const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
	user: {
		type: schema.Types.ObjectId,
		ref: 'user'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	comments: [
		{
			user: {
				type: schema.Types.ObjectId,
				ref: 'user'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
				type: Date,
				default: Date.now
			}
});

module.exports = post = mongoose.model('post',postSchema);
