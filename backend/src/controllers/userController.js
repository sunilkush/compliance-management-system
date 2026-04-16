const User = require('../models/User');

const listUsers = async (req, res) => {
  const users = await User.find({ entityId: req.entityId }).select('-password').sort({ createdAt: -1 });
  return res.json(users);
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, entityId: req.entityId },
    { role },
    { new: true }
  ).select('-password');

  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

module.exports = { listUsers, updateUserRole };
