const router = require('express').Router();
const Images = require('../controllers/images');
const cors = require('cors');


// Middlewares
const { uploads } = require('../middlewares/files');
//const { verifyToken, lanCORS } = require('../middlewares/auth');

router.get('/images/:id/', cors(), Images.show);
router.post('/images/upload/', [/*verifyToken, lanCORS,*/uploads.single('file')], Images.upload);

module.exports = router;
