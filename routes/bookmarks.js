const router = require('express').Router();
const Bookmarks = require('../controllers/bookmarks');
//const { lanCORS } = require('../middlewares/auth');

router.get('/bookmark/', Bookmarks.get);
router.post('/bookmark/', Bookmarks.add);
router.delete('/bookmark/', Bookmarks.delete);

module.exports = router;