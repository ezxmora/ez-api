const Quotes = require('../models/Quotes');

module.exports = {
	// Gets a quote by its id
	get: (req, res) => {
		Quotes.findOne({ identifier: req.params.id }, (err, quotes) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}

			if (quotes !== null) {
				res.status(200).json({
					ok: true,
					quotes
				});
			} else {
				res.status(404).json({
					ok: false,
					message: 'That quote doesn\'t exist.'
				});
			}
		});
	},

	// Gets a random quote
	random: (req, res) => {
		Quotes.countDocuments().exec(function (err, count) {
			if (err) {
				console.log(err);
			}

			const random = Math.floor(Math.random() * count);
			Quotes.findOne().skip(random).exec(
				function(err, quote) {
					if (err) {
						console.log(err);
					} else {
						res.status(200).json({
							ok: true,
							quote
						});
					}
				}
			);
		});
	},

	// Adds a new quote
	add: (req, res) => {
		Quotes.findOne().sort({ _id: -1 }).exec(function (err, quote){
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			
			let identifier;
			if (quote == null) {
				identifier = 0;
			} else {
				identifier = quote.identifier;
			}
			
			let newQuote = new Quotes({
				quote: req.body.quote,
				author: req.body.author,
				identifier: identifier + 1
			});

			newQuote.save((err, quote) => {
				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				res.status(200).json({
					ok: true,
					quote
				});
			});
		});
	},

	// Modifies a quote
	update: (req, res) => {
		Quotes.findOneAndUpdate({ identifier: req.params.id }, { quote: req.body. quote, author: req.body.author }, (err, quote) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.status(200).json({
				ok: true,
				message: 'The quote has been modified',
				newQuote: {
					author: req.body.author,
					quote: req.body.quote
				},
				oldQuote: quote
			});
		});
	},
};