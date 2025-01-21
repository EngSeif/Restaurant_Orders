const db = require('../config/database');

const mealController = {
  // Get Meals for a Specific Restaurant
  getMealsByRestaurant: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      
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