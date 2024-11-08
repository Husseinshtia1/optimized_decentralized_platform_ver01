
// backend/controllers/smartContractController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

const contractABI = [...]; // Replace with the ABI of the deployed smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Fetches the token balance of a given address.
 * @param {string} address - Ethereum address of the user.
 * @returns {Promise<number>} Token balance.
 */
const getTokenBalance = async (address) => {
  return await contract.methods.balanceOf(address).call();
};

/**
 * Casts a token-weighted vote on a proposal.
 * @param {number} proposalId - ID of the proposal.
 * @param {string} vote - Vote value ('yes' or 'no').
 * @param {string} voter - Ethereum address of the voter.
 * @returns {Promise<Object>} Transaction receipt.
 */
const castTokenVote = async (proposalId, vote, voter) => {
  const tx = await contract.methods.vote(proposalId, vote).send({ from: voter });
  return tx;
};

/**
 * Retrieves the result of a proposal from the smart contract.
 * @param {number} proposalId - ID of the proposal.
 * @returns {Promise<Object>} Proposal result with vote counts.
 */
const getProposalResult = async (proposalId) => {
  return await contract.methods.getProposalResult(proposalId).call();
};

module.exports = { getTokenBalance, castTokenVote, getProposalResult };
