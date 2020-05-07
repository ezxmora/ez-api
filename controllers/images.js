const Images = require('../models/Images');
const fs = require('fs');

module.exports = {
	// Shows a file by id
	show: (req, res) => {
		Images.find(req.params.id, (err, file) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.status(200).json({
				ok: true,
				file,
			});
		});
	},

	// Uploads a file
	upload: (req, res) => {
		fs.readFile(req.file.path, function(err) {
			if (err) {
				res.status(406).send({
					message: 'Sorry, the file couldn\'t be uploaded.',
					filename: req.file.originalname,
					error: err,
				});
			} else {
				res.status(200).send({
					success: true,
					data: {
						message: 'The file uploaded successfully.',
						filename: req.file.originalname,
						url: 'Gotta update',
					},
				});
			}
		});
	},
};
