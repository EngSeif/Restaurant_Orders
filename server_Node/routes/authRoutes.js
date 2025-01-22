const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Client Signup Route

router.post('/client/signup', authController.clientSignup);

// Client Login Route

router.post('/client/login', authController.clientLogin);

// Restaurant Signup Route
router.post('/restaurant/signup', authController.restaurantSignup);

// Restaurant Login Route
router.post('/restaurant/login', authController.restaurantLogin);

// Logout Route (works for both client and restaurant)
router.post('/logout', authController.logout);

// Check Authentication Status Route
router.get('/check-auth', authController.checkAuthStatus);



module.exports = router;