const router = require('express').Router();
const Images = require('../controllers/images');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, process.env.IMG_ROUTE);
	},
	filename: function(req, file, cb) {
		cb(
			null,
			Math.random()
				.toString(36)
				.substring(2, 15) + path.extname(file.originalname)
		);
	},
});

const uploads = multer({ storage: storage });

// Middlewares
const { verifyToken, lanCORS } = require('../middlewares/auth');

router.get('/i/:id', cors(), Images.show);
router.post('/upload', [/*verifyToken, */ lanCORS, uploads.single('file')], Images.upload);

module.exports = router;
