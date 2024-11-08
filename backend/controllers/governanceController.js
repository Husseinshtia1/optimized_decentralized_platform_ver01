
const Proposal = require('../models/Proposal');

exports.createProposal = async (req, res) => {
  try {
    const proposal = await Proposal.create({ ...req.body, creator: req.user.id });
    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create proposal' });
  }
};

exports.voteOnProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

    const vote = req.body.vote === 'yes' ? 1 : -1;
    proposal.votes += vote;
    await proposal.save();

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to vote' });
  }
};
