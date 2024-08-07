require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

 const jwt = require("jsonwebtoken");



 const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      req.user = decoded; // Attach decoded user information to the request object
      console.log(decoded)
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Invalid or expired token',
      });
    }
  };
  


// middleware/logger.js
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  module.exports = logger;
  
module.exports={
    
    authMiddleware
}