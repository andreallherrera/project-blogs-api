const { Router } = require('express');

const user = require('./user');
const login = require('./login');
const categories = require('./categories');
const post = require('./blogPost');

const router = Router();

router.use('/user', user);
router.use('/login', login);
router.use('/categories', categories);
router.use('/post', post);

module.exports = router;