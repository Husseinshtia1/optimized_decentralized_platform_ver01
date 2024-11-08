
// backend/controllers/didController.js
const Web3 = require('web3');
const { v4: uuidv4 } = require('uuid');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

let userDIDs = {}; // In-memory storage for user DIDs

/**
 * Registers a new Decentralized Identity (DID) for a user.
 * @param {string} address - Ethereum address of the user.
 * @returns {Object} The new DID and associated address.
 */
const registerDID = (address) => {
  const did = `did:example:${uuidv4()}`;
  userDIDs[address] = { did, registeredAt: new Date().toISOString() };
  return { address, did };
};

/**
 * Verifies the DID on-chain by interacting with a smart contract.
 * @param {string} address - User's Ethereum address.
 * @returns {Promise<boolean>} Verification status.
 */
const verifyDIDOnChain = async (address) => {
  const contractABI = [...]; // Replace with your smart contract ABI
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const verified = await contract.methods.verifyDID(address).call();
  return verified;
};

/**
 * Retrieves the DID and metadata for a specific address.
 * @param {string} address - User's Ethereum address.
 * @returns {Object} DID data for the user.
 */
const getDID = (address) => {
  return userDIDs[address] || { error: 'DID not found' };
};

module.exports = { registerDID, verifyDIDOnChain, getDID };
