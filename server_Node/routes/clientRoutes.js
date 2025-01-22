const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');


// Get Client Profile
router.get('/profile', 
    authMiddleware.clientAuth, 
    clientController.getProfile
);

// Get ALl restaurants
router.get('/restaurants', 
    authMiddleware.clientAuth, 
    clientController.getRestaurants
);

// Update Basic Profile
router.put('/profile', 
    authMiddleware.clientAuth, 
    clientController.updateProfile
);

// Change Password
router.post('/change-password', 
    authMiddleware.clientAuth, 
    clientController.changePassword
);

// Advanced Profile Edit
router.put('/edit-profile', 
    authMiddleware.clientAuth, 
    clientController.editProfile
);

module.exports = router;