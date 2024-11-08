
// backend/controllers/governanceAutomationController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

const contractABI = [...]; // Replace with smart contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Creates an automated governance proposal.
 * @param {string} action - Description of the automated action.
 * @returns {Promise<Object>} Proposal creation receipt.
 */
const createAutomatedProposal = async (action) => {
  const receipt = await contract.methods
    .createProposal(action)
    .send({ from: process.env.GOVERNANCE_ADDRESS, gas: 300000 });
  return receipt;
};

/**
 * Executes an approved proposal on-chain.
 * @param {number} proposalId - ID of the approved proposal.
 * @returns {Promise<Object>} Transaction receipt.
 */
const executeProposal = async (proposalId) => {
  const receipt = await contract.methods
    .executeProposal(proposalId)
    .send({ from: process.env.GOVERNANCE_ADDRESS, gas: 300000 });
  return receipt;
};

/**
 * Retrieves all proposals with their statuses.
 * @returns {Promise<Array>} List of proposals and their statuses.
 */
const getAllProposals = async () => {
  const proposals = await contract.methods.getProposals().call();
  return proposals;
};

module.exports = { createAutomatedProposal, executeProposal, getAllProposals };
