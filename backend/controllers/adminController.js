
const User = require('../models/User');

exports.getAnalytics = async (req, res) => {
  try {
    const userCounts = await User.countDocuments();
    const analyticsData = {
      labels: ['Users'],
      datasets: [
        {
          label: 'User Count',
          data: [userCounts],
        },
      ],
    };
    res.json(analyticsData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};
