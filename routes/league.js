const router = require('express').Router();
const League = require('../controllers/league');

router.get('/league/sruser/', League.getSR);
router.get('/league/tftuser/', League.getTFT);

module.exports = router;