const router = require('express').Router();

const { getTasks, addTask, editTask } = require('../controllers/tasks');

router.get('/', getTasks);
router.post('/create', addTask);
router.post('/edit/:id', editTask);

module.exports = router;