const Bookmarks = require('../models/Bookmarks');

module.exports = {
	// Gets all the bookmarks
	get: (req, res) => {
		Bookmarks.find({}, (err, bookmarks) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.status(200).json({
				ok: true,
				bookmarks
			});
		});
	},

	// Adds a bookmark
	add: (req, res) => {
		let bookmark = new Bookmarks({
			name: req.body.name,
			url: req.body.url
		});

		bookmark.save((err, bookmark) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.status(201).json({
				ok: true,
				bookmark
			});
		});
	},

	// Removes a bookmark by name
	delete: (req, res) => {
		Bookmarks.deleteOne({name: req.body.name}, (err) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
		});

		res.status(200).json({
			ok: true,
			message: 'The bookmark has been deleted'
		});
	}
};