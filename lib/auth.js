const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.ADMIN_SECRET || 'your-admin-secret-key';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function authenticateAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return false;
  
  const decoded = verifyToken(token);
  return decoded && decoded.role === 'admin';
}

module.exports = { generateToken, verifyToken, authenticateAdmin };