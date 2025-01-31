const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const authMiddleware = require('../middleware/authMiddleware');

// Add New Meal (Restaurant Only)
router.post('/', authMiddleware.restaurantAuth, mealController.addMeal);

// Get Meals (Both Restaurant and Client)
router.get('/:restaurant_id',authMiddleware.clientAuth,mealController.getMeals);
router.get('/', async (req, res, next) => {
    try {
        console.log('router put');
        console.log('router put');
        console.log('router put');
        console.log('router put');
        console.log('router put');
        // Check if either restaurant or client is logged in
        
        if (req.session.restaurantId) {
            // If restaurant is logged in, use restaurant authentication
            return authMiddleware.restaurantAuth(req, res, () => {
                mealController.getMeals(req, res);
            });
        }  else {
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
console.log('router put');
console.log('router put');
console.log('router put');
console.log('router put');
console.log('router put');
router.put('/', authMiddleware.restaurantAuth, async (req, res) => {
    try {
        // Check if meal_id is provided
        if (!req.body.meal_id) {
            return res.status(400).json({ error: 'meal_id is required' });
        }

        return authMiddleware.restaurantAuth(req, res, () => {
            mealController.updateMeal(req, res);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Delete Meal (Restaurant Only)
router.delete('/:meal_id', authMiddleware.restaurantAuth, async (req, res) => {
    try {
        return authMiddleware.restaurantAuth(req, res, () => {
            mealController.deleteMeal(req, res);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;