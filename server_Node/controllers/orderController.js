const db = require('../database');

const orderController = {
  // Place an Order
  orderMeals: async (req, res) => {
    
    try {
      const {meal_id} = req.body;
      const clientId = req.session.clientId;
      const date_of_order = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // Create a new order
      //console.log(meal_id, clientId, date_of_order);
      const [order] = await db.execute(
        'INSERT INTO Orders (client_id, meal_id, date_of_order,status) VALUES (?, ?, ?,?)',
        [clientId, meal_id, date_of_order, 'Pending']
      );

      // Create an array of values to be inserted into the OrderMeal table

      res.status(201).json({ message: 'Order placed successfully', order: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get Orders for a Restaurant
  getRestaurantOrders: async (req, res) => {
    try {
      const restaurantId = req.session.restaurantId;

      const [orders] = await db.execute(
        `SELECT 
          o.order_id, 
          o.status, 
          o.date_of_order, 
          m.meal_name, 
          m.price,
          c.firstname, 
          c.lastname, 
          c.email
        FROM Orders o
        JOIN Meal m ON o.meal_id = m.meal_id
        JOIN Client c ON o.client_id = c.client_id
        WHERE m.restaurant_id = ?
        ORDER BY o.date_of_order DESC`,
        [restaurantId]
      );

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClientOrders: async (req, res) => {
    try {
      const restaurantId = req.session.clientId;

      const [orders] = await db.execute(
        `SELECT 
          o.status, 
          o.date_of_order, 
          m.meal_name, 
          m.price,
        FROM Orders o
        JOIN Meal m ON o.meal_id = m.meal_id
        WHERE m.restaurant_id = ?
        ORDER BY o.date_of_order DESC`,
        [restaurantId]
      );

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Update Order Status
  updateOrderStatus: async (req, res) => {
    try {
      const restaurantId = req.session.restaurantId;
      const { order_id, status } = req.body;

      // Verify order belongs to the restaurant
      const [orderCheck] = await db.execute(
        `SELECT m.restaurant_id 
         FROM Orders o
         JOIN Meal m ON o.meal_id = m.meal_id
         WHERE o.order_id = ?`,
        [order_id]
      );

      if (orderCheck.length === 0 || orderCheck[0].restaurant_id !== restaurantId) {
        return res.status(403).json({ error: 'Unauthorized to update this order' });
      }

      await db.execute(
        'UPDATE Orders SET status = ? WHERE order_id = ?',
        [status, order_id]
      );

      res.json({ 
        message: 'Order status updated successfully',
        order: { order_id, status }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderController;