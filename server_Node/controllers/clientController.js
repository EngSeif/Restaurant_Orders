const db = require('../database');
const bcrypt = require('bcryptjs');

const  ClientController = {
    // Get Client Profile
    getProfile:async (req, res) =>{
        try {
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
    },

    // Update Basic Profile
    updateProfile: async  (req, res) =>{
        try {
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
    },

    // Change Password
    changePassword:async (req, res) =>{
        try {
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
    },

    //Get All restaurants for client
    getRestaurants: async (req, res) => {
        try {
            const [restaurants] = await db.execute(
                'SELECT restaurant_name, phone, email FROM Restaurant'
            );
    
            res.json(restaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Advanced Profile Edit with Validation
    editProfile: async (req, res) => {
        try {
            const clientId = req.session.clientId;
            const { firstname, lastname, email } = req.body;
    
            // Validation and error collection
            const errors = [];
    
            // Validate firstname if provided
            if (firstname) {
                if (firstname.length < 2) {
                    errors.push('First name must be at least 2 characters long');
                }
                if (!/^[A-Za-z\s'-]+$/.test(firstname)) {
                    errors.push('First name contains invalid characters');
                }
            }
    
            // Validate lastname if provided
            if (lastname) {
                if (lastname.length < 2) {
                    errors.push('Last name must be at least 2 characters long');
                }
                if (!/^[A-Za-z\s'-]+$/.test(lastname)) {
                    errors.push('Last name contains invalid characters');
                }
            }
    
            // Validate email if provided
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors.push('Invalid email format');
                }
            }
    
            // Check if any updates are provided
            if (!firstname && !lastname && !email) {
                return res.status(400).json({ 
                    error: 'No update fields provided',
                    message: 'Please provide firstname, lastname, or email to update'
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
    
            if (firstname) {
                updateFields.push('firstname = ?');
                queryParams.push(firstname);
            }
    
            if (lastname) {
                updateFields.push('lastname = ?');
                queryParams.push(lastname);
            }
    
            if (email) {
                // Check if email is already in use
                const [existingEmails] = await db.execute(
                    'SELECT * FROM Client WHERE email = ? AND client_id != ?', 
                    [email, clientId]
                );
    
                if (existingEmails.length > 0) {
                    return res.status(400).json({ 
                        error: 'Email already in use',
                        message: 'The provided email is already associated with another client'
                    });
                }
    
                updateFields.push('email = ?');
                queryParams.push(email);
            }
    
            // Add the client ID to the end of params
            queryParams.push(clientId);
    
            // Construct the dynamic update query
            const updateQuery = `
                UPDATE Client 
                SET ${updateFields.join(', ')} 
                WHERE client_id = ?
            `;
    
            // Execute the update
            await db.execute(updateQuery, queryParams);
    
            // Fetch and return updated client details
            const [updatedClients] = await db.execute(
                'SELECT client_id, firstname, lastname, email FROM Client WHERE client_id = ?', 
                [clientId]
            );
    
            res.json({ 
                message: 'Profile updated successfully',
                client: updatedClients[0]
            });
    
        } catch (error) {
            console.error('Client Profile Update Error:', error);
            res.status(500).json({ 
                error: 'Update failed', 
                message: error.message 
            });
        }
    }
}

module.exports = ClientController;