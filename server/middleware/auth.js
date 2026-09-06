import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try { const decoded = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(decoded.id); if (!req.user) throw new Error(); next(); }
  catch { return res.status(401).json({ message: 'Invalid or expired token' }); }
}
export function adminOnly(req, res, next) { if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' }); next(); }
export function signToken(user) { return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); }
