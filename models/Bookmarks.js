const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarksSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	url: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	}
});

const Bookmarks = mongoose.model('Bookmarks', BookmarksSchema);
BookmarksSchema.set('autoIndex', false);

module.exports = Bookmarks;