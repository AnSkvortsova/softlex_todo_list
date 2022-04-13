const router = require('express').Router();

const { authAdmin } = require('../controllers/admin');

router.post('/login', authAdmin);

module.exports = router;