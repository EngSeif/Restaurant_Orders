const db = require('../database');

const mealController = {
  // Get Meals for a Specific Restaurant
  getMeals: async (req, res) => {
    try {
        let restaurantId;

        // Check if the request is from a restaurant (using session)
        if (req.session.restaurantId) {
        restaurantId = req.session.restaurantId;
        } 
        // Check if a restaurant ID is provided in the request parameters
        else if (req.params.restaurant_id) {
        restaurantId = req.params.restaurant_id;
        } 
      
        const [meals] = await db.execute(
            'SELECT * FROM Meal WHERE restaurant_id = ?', 
            [restaurantId]
        );

        res.json(meals);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
  },

  // Add a New Meal (Restaurant Only)
  addMeal: async (req, res) => {
    try {
      const { meal_name, meal_description, price } = req.body;
      const restaurantId = req.session.restaurantId;

      const [result] = await db.execute(
        'INSERT INTO Meal (meal_name, meal_description, price, restaurant_id) VALUES (?, ?, ?, ?)',
        [meal_name, meal_description, price, restaurantId]
      );

      res.status(201).json({ 
        message: 'Meal added successfully',
        meal: { 
          id: result.insertId, 
          meal_name, 
          meal_description, 
          price 
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = mealController;