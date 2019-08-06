const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	originalFilename: {
		type: String,
		trim: true,
	},
	newFileName: {
		type: String,
		required: true,
	},
	extension: {
		type: String,
		trim: true,
	},
	uploadDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const Images = mongoose.model('Images', ImagesSchema);
ImagesSchema.set('autoIndex', false);

module.exports = Images;
