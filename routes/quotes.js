const router = require('express').Router();
const Quotes = require('../controllers/quotes');
// const {} = require('../middlewares/auth');

router.get('/quotes/:id/', Quotes.get);
router.get('/quotes/', Quotes.random);
router.post('/quotes/', Quotes.add);
router.patch('/quotes/:id/', Quotes.update);

module.exports = router;