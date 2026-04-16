const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { ROLES } = require('../utils/constants');

const signAccessToken = (id) => jwt.sign({ id, type: 'access' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
const signRefreshToken = (id) => jwt.sign({ id, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
const hashToken = (value) => crypto.createHash('sha256').update(value).digest('hex');

const authPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  entityId: user.entityId
});

const issueTokens = async (user) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();
  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });

  const { accessToken, refreshToken } = await issueTokens(user);
  return res.json({ token: accessToken, refreshToken, user: authPayload(user) });
};

const signup = async (req, res) => {
  const { name, email, password, role, entityId } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) return res.status(409).json({ message: 'User already exists with this email' });

  const normalizedRole = role && Object.values(ROLES).includes(role) ? role : ROLES.EMPLOYEE;
  const user = await User.create({ name, email: email.toLowerCase(), password, role: normalizedRole, entityId: entityId || 'HQ' });
  const { accessToken, refreshToken } = await issueTokens(user);
  return res.status(201).json({ token: accessToken, refreshToken, user: authPayload(user) });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken is required' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (decoded.type !== 'refresh') return res.status(401).json({ message: 'Invalid token type' });

    const user = await User.findById(decoded.id);
    if (!user || user.refreshTokenHash !== hashToken(refreshToken)) return res.status(401).json({ message: 'Invalid refresh token' });

    const token = signAccessToken(user._id);
    return res.json({ token });
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
  req.user.refreshTokenHash = undefined;
  await req.user.save();
  return res.json({ message: 'Logged out' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.json({ message: 'If account exists, reset instructions have been generated' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = hashToken(resetToken);
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  return res.json({ message: 'Password reset token generated', resetToken });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });

  const user = await User.findOne({ resetPasswordToken: hashToken(token), resetPasswordExpires: { $gt: new Date() } });
  if (!user) return res.status(400).json({ message: 'Reset token invalid or expired' });

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res.json({ message: 'Password reset successful' });
};

const me = async (req, res) => res.json({ user: req.user });

module.exports = { login, signup, refresh, logout, forgotPassword, resetPassword, me };
