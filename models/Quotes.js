const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotesSchema = new Schema({
	quote: {
		type: String,
		trim: true,
		required: true,
	},
	author: {
		type: String,
		trim: true,
		required: true
	},
	identifier: {
		type: Number,
		default: 0,
		min: 0,
		required: true
	}
});

const Quotes = mongoose.model('Quotes', QuotesSchema);
QuotesSchema.set('autoIndex', false);

module.exports = Quotes;