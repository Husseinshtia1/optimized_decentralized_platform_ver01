
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id }).populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

exports.sendMessage = async (req, res) => {
  const { recipient, content } = req.body;
  try {
    await Message.create({ sender: req.user.id, recipient, content });
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};
