const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Get Restaurant Profile
router.get('/profile', 
    authMiddleware.restaurantAuth, 
    restaurantController.getProfile
);

// Update Basic Restaurant Profile
router.put('/profile', 
    authMiddleware.restaurantAuth, 
    restaurantController.updateProfile
);

// Change Password
router.post('/edit-password', 
    authMiddleware.restaurantAuth, 
    restaurantController.changePassword
);

// Advanced Profile Edit
router.put('/edit-profile', 
    authMiddleware.restaurantAuth, 
    restaurantController.editProfile
);

module.exports = router;