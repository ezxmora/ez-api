const router = require('express').Router();
const Users = require('../controllers/users');
//const { lanCORS } = require('../middlewares/auth');

router.post('/users/login/', Users.auth);
router.get('/users/qr/', Users.qr);
router.post('/users/add/', Users.add);

module.exports = router;