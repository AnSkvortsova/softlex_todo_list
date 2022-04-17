const router = require('express').Router();

const { login, auth } = require('../controllers/admin');

router.post('/login', login);
router.post('/auth', auth)

module.exports = router;