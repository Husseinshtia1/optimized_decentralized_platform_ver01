
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.username = username || user.username;
    if (password) {
      user.password = password;
    }
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
