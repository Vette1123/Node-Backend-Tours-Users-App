const { Router } = require('express');
const { login, signup, authenticated } = require('../../controllers/auth');
const router = Router();
router.post('/login', authenticated, login);
router.post('/signup', authenticated, signup);

module.exports = router;
