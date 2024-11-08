
// backend/controllers/blockchainAnalyticsController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

/**
 * Fetches the transaction history for a given address.
 * @param {string} address - Address to retrieve the transaction history.
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
 * Listens for new transactions in real-time on the blockchain.
 */
const listenToBlockchain = () => {
  web3.eth.subscribe('pendingTransactions', (err, txHash) => {
    if (err) console.error('Error:', err);
    else console.log('New pending transaction:', txHash);
  });
};

module.exports = { getTransactionHistory, listenToBlockchain };
