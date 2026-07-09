const express = require('express');
const { body } = require('express-validator');
const { login, logout, getMe } = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
