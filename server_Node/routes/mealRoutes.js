const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const authMiddleware = require('../middleware/authMiddleware');

// Add New Meal (Restaurant Only)
router.post('/', authMiddleware.restaurantAuth, mealController.addMeal);

// Get Meals (Both Restaurant and Client)
router.get('/', async (req, res, next) => {
    try {
        // Check if either restaurant or client is logged in
        if (req.session.restaurantId) {
            // If restaurant is logged in, use restaurant authentication
            return authMiddleware.restaurantAuth(req, res, () => {
                mealController.getMeals(req, res);
            });
        } else if (req.session.clientId) {
            // If client is logged in, use client authentication
            return authMiddleware.clientAuth(req, res, () => {
                mealController.getMeals(req, res);
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

// Update Meal (Restaurant Only)
//router.put('/', authMiddleware.restaurantAuth, mealController.updateMeal);

// Delete Meal (Restaurant Only)
//router.delete('/:meal_id', authMiddleware.restaurantAuth, mealController.deleteMeal);

module.exports = router;