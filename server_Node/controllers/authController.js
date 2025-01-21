const connection = require('../database');
const bcrypt = require('bcryptjs');

const authController = {
  // Client Signup
  clientSignup: async (req, res) => {
    try {
        console.log(req.body);
      const { firstname, lastname, email, password } = req.body;
      
      // Check if client exists
      const [existingClients] = await connection.execute(
        'SELECT * FROM Client WHERE email = ?', 
        [email]
      );

      if (existingClients.length > 0) {
        return res.status(400).json({ error: 'Client already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new client
      const [result] = await connection.execute(
        'INSERT INTO Client (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
        [firstname, lastname, email, hashedPassword]
      );

      // Set session
      req.session.clientId = result.insertId;

      res.status(201).json({ 
        message: 'Client created successfully',
        client: { 
          id: result.insertId, 
          firstname, 
          lastname, 
          email 
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Client Login
  clientLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find client
      const [clients] = await connection.execute(
        'SELECT * FROM Client WHERE email = ?', 
        [email]
      );

      if (clients.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const client = clients[0];

      // Check password
      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session
      req.session.clientId = client.client_id;
      console.log(req.session.clientId);

      res.json({ 
        message: 'Login successful',
        client: { 
          id: client.client_id, 
          firstname: client.firstname, 
          lastname: client.lastname, 
          email: client.email 
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Restaurant Signup
  restaurantSignup: async (req, res) => {
    try {
      const { restaurant_name, phone, email, password } = req.body;
      
      // Check if restaurant exists
      const [existingRestaurants] = await connection.execute(
        'SELECT * FROM Restaurant WHERE email = ?', 
        [email]
      );

      if (existingRestaurants.length > 0) {
        return res.status(400).json({ error: 'Restaurant already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new restaurant
      const [result] = await connection.execute(
        'INSERT INTO Restaurant (restaurant_name, phone, email, password) VALUES (?, ?, ?, ?)',
        [restaurant_name, phone, email, hashedPassword]
      );

      // Set session
      req.session.restaurantId = result.insertId;

      res.status(201).json({ 
        message: 'Restaurant created successfully',
        restaurant: { 
          id: result.insertId, 
          restaurant_name, 
          phone, 
          email 
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Restaurant Login
  restaurantLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find restaurant
      const [restaurants] = await connection.execute(
        'SELECT * FROM Restaurant WHERE email = ?', 
        [email]
      );

      if (restaurants.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const restaurant = restaurants[0];

      // Check password
      const isMatch = await bcrypt.compare(password, restaurant.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session
      req.session.restaurantId = restaurant.restaurant_id;

      res.json({ 
        message: 'Login successful',
        restaurant: { 
          id: restaurant.restaurant_id, 
          restaurant_name: restaurant.restaurant_name, 
          phone: restaurant.phone, 
          email: restaurant.email 
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not log out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  },

  // Check Authentication Status
  checkAuthStatus: (req, res) => {
    if (req.session.clientId) {
      res.json({ 
        isAuthenticated: true, 
        type: 'client', 
        id: req.session.clientId 
      });
    } else if (req.session.restaurantId) {
      res.json({ 
        isAuthenticated: true, 
        type: 'restaurant', 
        id: req.session.restaurantId 
      });
    } else {
      res.json({ isAuthenticated: false });
    }
  }
};

module.exports = authController;