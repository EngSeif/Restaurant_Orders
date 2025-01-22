const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');


//post order

router.post('/', authMiddleware.clientAuth, orderController.updateOrderStatus);

// Get Orders
router.get('/', async (req, res, next) => {
    try {
        // Check if either restaurant or client is logged in
        if (req.session.restaurantId) {
            // If restaurant is logged in, use restaurant authentication
            return authMiddleware.restaurantAuth(req, res, () => {
                orderController.getRestaurantOrders(req, res);
            });
        } else if (req.session.clientId) {
            // If client is logged in, use client authentication
            return authMiddleware.clientAuth(req, res, () => {
                orderController.getClientOrders(req, res);
            });
        } else {
            // If no session exists
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Please log in to view meals' 
            });
        }
    } catch (error) {
        next(error);
    }
});
// Update Order Status
router.put('/status', authMiddleware.restaurantAuth, orderController.updateOrderStatus);

module.exports = router;