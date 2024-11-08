
// backend/controllers/roleManagementController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

const contractABI = [...]; // Replace with the governance smart contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Assigns a governance role to a user.
 * @param {string} address - Ethereum address of the user.
 * @param {string} role - Role to assign ('admin', 'voter', etc.).
 * @returns {Promise<Object>} Transaction receipt.
 */
const assignRole = async (address, role) => {
  const receipt = await contract.methods
    .assignRole(address, role)
    .send({ from: process.env.GOVERNANCE_ADDRESS, gas: 300000 });
  return receipt;
};

/**
 * Revokes a role from a user.
 * @param {string} address - Ethereum address of the user.
 * @param {string} role - Role to revoke.
 * @returns {Promise<Object>} Transaction receipt.
 */
const revokeRole = async (address, role) => {
  const receipt = await contract.methods
    .revokeRole(address, role)
    .send({ from: process.env.GOVERNANCE_ADDRESS, gas: 300000 });
  return receipt;
};

/**
 * Retrieves all assigned roles.
 * @returns {Promise<Array>} List of roles and corresponding users.
 */
const getRoles = async () => {
  const roles = await contract.methods.getRoles().call();
  return roles;
};

module.exports = { assignRole, revokeRole, getRoles };
