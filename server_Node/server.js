const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const PORT = 3500;

// Get network address
const networkAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter(details => details.family === 'IPv4' && !details.internal)
  .pop()?.address || 'localhost';

// CORS Configuration
app.use(cors({
    origin: `http://localhost:3000`, // Your React app's URL
    credentials: true
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mealRoutes = require('./routes/mealRoutes');

// // Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/orders', orderRoutes);

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://${networkAddress}:${PORT}`);
});