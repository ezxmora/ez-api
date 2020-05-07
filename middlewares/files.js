const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, process.env.IMG_ROUTE);
	},
	filename: function(req, file, cb) {
		cb(null,
			Math.random()
				.toString(36)
				.substring(2, 15) + path.extname(file.originalname)
		);
	}
});

exports.uploads = multer({ storage: storage,
	fileFilter: function (req, file, cb) {
		if (!['.png', '.mp4', '.gif'].includes(path.extname(file.originalname))) {
			cb(null, false);
		} else {
			cb(null, true);
		}
	}
});
