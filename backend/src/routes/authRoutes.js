const express = require('express');
const { login, signup, refresh, logout, forgotPassword, resetPassword, me } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh', refresh);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, me);
router.post('/logout', protect, logout);

module.exports = router;
