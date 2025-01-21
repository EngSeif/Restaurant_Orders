const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Client Signup Route

router.post('/client/signup', authController.clientSignup);

// Client Login Route

router.post('/client/login', authController.clientLogin);

// Restaurant Signup Route
router.post('/restaurant/signup', authController.restaurantSignup);

// Restaurant Login Route
router.post('/restaurant/login', authController.restaurantLogin);

// Logout Route (works for both client and restaurant)
router.post('/logout', authController.logout);

// Check Authentication Status Route
router.get('/check-auth', authController.checkAuthStatus);

// Get Current User Profile (Client)
router.get('/client/profile', authMiddleware.clientAuth, async (req, res) => {
  try {
    console.log(`entered client profile`);
    console.log(`client id: ${req.session.clientId}`);

    const db = require('../database');
    const [users] = await db.execute(
      'SELECT client_id, firstname, lastname, email FROM Client WHERE client_id = ?', 
      [req.session.clientId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Current Restaurant Profile
router.get('/restaurant/profile', authMiddleware.restaurantAuth, async (req, res) => {
  try {
    const db = require('../database');
    const [restaurants] = await db.execute(
      'SELECT restaurant_id, restaurant_name, phone, email FROM Restaurant WHERE restaurant_id = ?', 
      [req.session.restaurantId]
    );

    if (restaurants.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurants[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Client Profile
router.put('/client/profile', authMiddleware.clientAuth, async (req, res) => {
  try {
    const db = require('../database');
    const { firstname, lastname, email } = req.body;

    await db.execute(
      'UPDATE Client SET firstname = ?, lastname = ?, email = ? WHERE client_id = ?', 
      [firstname, lastname, email, req.session.clientId]
    );

    res.json({ 
      message: 'Profile updated successfully',
      user: { firstname, lastname, email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Restaurant Profile
router.put('/restaurant/profile', authMiddleware.restaurantAuth, async (req, res) => {
  try {
    const db = require('../config/database');
    const { restaurant_name, phone, email } = req.body;

    await db.execute(
      'UPDATE Restaurant SET restaurant_name = ?, phone = ?, email = ? WHERE restaurant_id = ?', 
      [restaurant_name, phone, email, req.session.restaurantId]
    );

    res.json({ 
      message: 'Profile updated successfully',
      restaurant: { restaurant_name, phone, email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change Password Route for Client
router.post('/client/change-password', authMiddleware.clientAuth, async (req, res) => {
  try {
    const db = require('../database');
    const bcrypt = require('bcryptjs');
    const { currentPassword, newPassword } = req.body;

    // Fetch current user
    const [users] = await db.execute(
      'SELECT password FROM Client WHERE client_id = ?', 
      [req.session.clientId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, users[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.execute(
      'UPDATE Client SET password = ? WHERE client_id = ?', 
      [hashedNewPassword, req.session.clientId]
    );

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change Password Route for Restaurant
router.post('/restaurant/change-password', authMiddleware.restaurantAuth, async (req, res) => {
  try {
    const db = require('../database');
    const bcrypt = require('bcryptjs');
    const { currentPassword, newPassword } = req.body;

    // Fetch current restaurant
    const [restaurants] = await db.execute(
      'SELECT password FROM Restaurant WHERE restaurant_id = ?', 
      [req.session.restaurantId]
    );

    if (restaurants.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, restaurants[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.execute(
      'UPDATE Restaurant SET password = ? WHERE restaurant_id = ?', 
      [hashedNewPassword, req.session.restaurantId]
    );

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;