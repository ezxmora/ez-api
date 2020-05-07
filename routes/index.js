const router = require('express').Router();

router.use('/', require('./images'));
router.use('/', require('./bookmarks'));
router.use('/', require('./users'));
router.use('/', require('./quotes'));

module.exports = router;
