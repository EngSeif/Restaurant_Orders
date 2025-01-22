const db = require('../database');

const orderController = {
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