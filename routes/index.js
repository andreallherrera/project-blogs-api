const { Router } = require('express');

const user = require('./user');
const login = require('./login');

const router = Router();

router.use('/user', user);
router.use('/login', login);

module.exports = router;