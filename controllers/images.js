const Images = require('../models/Images');
const fs = require('fs');

module.exports = {
	show: (req, res) => {
		Images.find(req.params.id, (err, file) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.json({
				ok: true,
				file,
			});
		});
	},

	upload: (req, res) => {
		fs.readFile(req.file.path, function(err, data) {
			if (err) {
				res.status(406).send({
					message: "Sorry, file couldn't be uploaded.",
					filename: req.file.originalname,
					error: err,
				});
			} else {
				res.status(200).send({
					success: true,
					data: {
						message: 'File uploaded successfully.',
						filename: req.file.originalname,
						url: 'Gotta update',
					},
				});
			}
		});
	},
};
