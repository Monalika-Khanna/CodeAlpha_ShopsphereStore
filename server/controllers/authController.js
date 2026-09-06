import { OAuth2Client } from 'google-auth-library';
import { signToken } from '../middleware/auth.js';
import User from '../models/User.js';

const safeUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt });
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function register(req, res) { const { name, email, password } = req.body; const user = await User.create({ name, email, password }); res.status(201).json({ token: signToken(user), user: safeUser(user) }); }
export async function login(req, res) { const user = await User.findOne({ email: req.body.email }).select('+password'); if (!user || !(await user.comparePassword(req.body.password))) return res.status(401).json({ message: 'Invalid email or password' }); res.json({ token: signToken(user), user: safeUser(user) }); }
export async function googleLogin(req, res) {
	if (!process.env.GOOGLE_CLIENT_ID) return res.status(503).json({ message: 'Google sign-in is not configured on the server' });
	try {
		const ticket = await googleClient.verifyIdToken({ idToken: req.body.credential, audience: process.env.GOOGLE_CLIENT_ID });
		const profile = ticket.getPayload();
		if (!profile?.email || !profile.email_verified) return res.status(401).json({ message: 'Google account could not be verified' });
		const user = await User.findOneAndUpdate(
			{ email: profile.email },
			{ $setOnInsert: { name: profile.name || profile.email.split('@')[0], email: profile.email } },
			{ upsert: true, new: true }
		);
		res.json({ token: signToken(user), user: safeUser(user) });
	} catch { res.status(401).json({ message: 'Google sign-in failed' }); }
}
export function me(req, res) { res.json({ user: safeUser(req.user) }); }
