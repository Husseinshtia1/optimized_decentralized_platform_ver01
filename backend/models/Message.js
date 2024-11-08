
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
