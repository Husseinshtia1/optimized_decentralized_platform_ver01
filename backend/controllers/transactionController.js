
// backend/controllers/transactionController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

/**
 * Retrieves the transaction history for a specific Ethereum address.
 * @param {string} address - Ethereum address of the user.
 * @returns {Promise<Array>} List of transactions.
 */
const getTransactionHistory = async (address) => {
  const latestBlock = await web3.eth.getBlockNumber();
  const transactions = [];

  for (let i = latestBlock; i >= latestBlock - 100; i--) {
    const block = await web3.eth.getBlock(i, true);
    block.transactions.forEach((tx) => {
      if (tx.from === address || tx.to === address) {
        transactions.push(tx);
      }
    });
  }
  return transactions;
};

/**
 * Sends token rewards to an address for participation in governance.
 * @param {string} recipient - Ethereum address of the recipient.
 * @param {number} amount - Amount of tokens to send.
 * @returns {Promise<Object>} Transaction receipt.
 */
const sendTokenReward = async (recipient, amount) => {
  const contractABI = [...]; // Replace with your token contract ABI
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const receipt = await contract.methods
    .transfer(recipient, amount)
    .send({ from: process.env.REWARD_SENDER_ADDRESS });
  return receipt;
};

module.exports = { getTransactionHistory, sendTokenReward };
