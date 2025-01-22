const db = require('../database');
const bcrypt = require('bcryptjs');

const RestaurantController = {
    // Get Restaurant Profile
    getProfile: async (req, res)=> {
        try {
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
    },

    // Update Basic Restaurant Profile
    updateProfile: async (req, res)=> {
        try {
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
    },

    // Change Password
    changePassword: async (req, res)=> {
        try {
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
    },

    // Advanced Profile Edit with Validation
    editProfile: async (req, res)=> {
        try {
            const restaurantId = req.session.restaurantId;
            const { name, email } = req.body;
    
            // Validation and error collection
            const errors = [];
    
            // Validate name if provided
            if (name) {
                // Check name length
                if (name.length < 2) {
                    errors.push('Name must be at least 2 characters long');
                }
                // Optional: Add more name validation rules
            }
    
            // Validate email if provided
            if (email) {
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors.push('Invalid email format');
                }
            }
    
            // Check if any updates are provided
            if (!name && !email) {
                return res.status(400).json({ 
                    error: 'No update fields provided',
                    message: 'Please provide name or email to update'
                });
            }
    
            // If there are validation errors, return them
            if (errors.length > 0) {
                return res.status(400).json({ 
                    error: 'Validation Failed',
                    validationErrors: errors 
                });
            }
    
            // Prepare update query dynamically
            const updateFields = [];
            const queryParams = [];
    
            if (name) {
                updateFields.push('restaurant_name = ?');
                queryParams.push(name);
            }
    
            if (email) {
                // Check if email is already in use
                const [existingEmails] = await db.execute(
                    'SELECT * FROM Restaurant WHERE email = ? AND restaurant_id != ?', 
                    [email, restaurantId]
                );
    
                if (existingEmails.length > 0) {
                    return res.status(400).json({ 
                        error: 'Email already in use',
                        message: 'The provided email is already associated with another restaurant'
                    });
                }
    
                updateFields.push('email = ?');
                queryParams.push(email);
            }
    
            // Add the restaurant ID to the end of params
            queryParams.push(restaurantId);
    
            // Construct the dynamic update query
            const updateQuery = `
                UPDATE Restaurant 
                SET ${updateFields.join(', ')} 
                WHERE restaurant_id = ?
            `;
    
            // Execute the update
            await db.execute(updateQuery, queryParams);
    
            // Fetch and return updated restaurant details
            const [updatedRestaurants] = await db.execute(
                'SELECT restaurant_id, restaurant_name, email FROM Restaurant WHERE restaurant_id = ?', 
                [restaurantId]
            );
    
            res.json({ 
                message: 'Profile updated successfully',
                restaurant: updatedRestaurants[0]
            });
    
        } catch (error) {
            console.error('Profile Update Error:', error);
            res.status(500).json({ 
                error: 'Update failed', 
                message: error.message 
            });
        }
    }
}

module.exports = RestaurantController;