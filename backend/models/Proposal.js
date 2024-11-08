
const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
