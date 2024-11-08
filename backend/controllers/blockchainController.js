
// backend/controllers/blockchainController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

/**
 * Retrieves the latest block number from the blockchain.
 * @returns {Promise<number>} Latest block number.
 */
const getLatestBlock = async () => {
  const blockNumber = await web3.eth.getBlockNumber();
  return blockNumber;
};

/**
 * Sends a simple transaction on the blockchain.
 * @param {string} from - Sender's address.
 * @param {string} to - Receiver's address.
 * @param {number} value - Amount to transfer (in Wei).
 * @returns {Promise<Object>} Transaction receipt.
 */
const sendTransaction = async (from, to, value) => {
  const receipt = await web3.eth.sendTransaction({
    from,
    to,
    value,
    gas: 21000,
  });
  return receipt;
};

module.exports = { getLatestBlock, sendTransaction };
