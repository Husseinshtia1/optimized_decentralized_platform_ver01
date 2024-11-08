
const User = require('../models/User');

exports.updateReputation = async (userId, points) => {
  try {
    const user = await User.findById(userId);
    user.reputation += points;
    await user.save();
  } catch (error) {
    console.error('Failed to update reputation:', error);
  }
};
