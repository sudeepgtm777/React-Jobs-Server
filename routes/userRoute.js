const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Check if user is logged in (no error, just status)
router.get('/isLoggedIn', authController.isLoggedIn);

// Protected routes (require login)
router.use(authController.protect);
router.get('/me', userController.getMe, userController.getUser);

router.route('/').get(userController.getAllUsers);

module.exports = router;
