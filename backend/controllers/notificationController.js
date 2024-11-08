
const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

exports.createNotification = async (userId, message) => {
  try {
    await Notification.create({ user: userId, message });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};
