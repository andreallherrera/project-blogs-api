const { Router } = require('express');

const user = require('./user');
const login = require('./login');
const categories = require('./categories');

const router = Router();

router.use('/user', user);
router.use('/login', login);
router.use('/categories', categories);

module.exports = router;