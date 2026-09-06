import User from '../models/User.js';
export async function listUsers(req, res) { res.json({ users: await User.find().sort({ createdAt: -1 }) }); }
export async function getUser(req, res) { const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ message: 'User not found' }); res.json({ user }); }
export async function updateUser(req, res) { const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, role: req.body.role }, { new: true, runValidators: true }); if (!user) return res.status(404).json({ message: 'User not found' }); res.json({ user }); }
