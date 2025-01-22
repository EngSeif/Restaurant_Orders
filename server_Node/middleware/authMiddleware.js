const authMiddleware = {
    // Client authentication middleware
    clientAuth: (req, res, next) => {

      if (req.session.clientId) {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized client' });
      }
    },
  
    // Restaurant authentication middleware
    restaurantAuth: (req, res, next) => {
      if (req.session.restaurantId) {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized restaurant' });
      }
    }
  };
  
  module.exports = authMiddleware;