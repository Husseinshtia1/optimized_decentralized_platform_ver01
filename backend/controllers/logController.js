
const Log = require('../models/Log');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
};

exports.createLog = async (action, user) => {
  try {
    await Log.create({ action, user });
  } catch (error) {
    console.error('Failed to create log:', error);
  }
};
