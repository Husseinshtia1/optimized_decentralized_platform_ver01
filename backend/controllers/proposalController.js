
// backend/controllers/proposalController.js
let proposals = []; // In-memory storage for proposals

/**
 * Creates a new proposal.
 * @param {string} title - Title of the proposal.
 * @param {string} description - Description of the proposal.
 * @returns {Object} The created proposal.
 */
const createProposal = (title, description) => {
  const proposal = {
    id: proposals.length + 1,
    title,
    description,
    votes: { yes: 0, no: 0 },
    createdAt: new Date().toISOString(),
  };
  proposals.push(proposal);
  return proposal;
};

/**
 * Casts a vote on a proposal.
 * @param {number} proposalId - ID of the proposal.
 * @param {string} vote - Vote value ('yes' or 'no').
 * @returns {Object} Updated proposal with new vote count.
 */
const voteOnProposal = (proposalId, vote) => {
  const proposal = proposals.find((p) => p.id === proposalId);
  if (!proposal) throw new Error('Proposal not found');

  if (vote === 'yes') proposal.votes.yes += 1;
  else if (vote === 'no') proposal.votes.no += 1;
  else throw new Error('Invalid vote');

  return proposal;
};

/**
 * Retrieves all proposals.
 * @returns {Array<Object>} List of proposals.
 */
const getProposals = () => {
  return proposals;
};

module.exports = { createProposal, voteOnProposal, getProposals };
