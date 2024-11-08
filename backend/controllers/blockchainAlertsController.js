
// backend/controllers/blockchainAlertsController.js
const Web3 = require('web3');
const nodemailer = require('nodemailer');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

// Set up email notifications (example using nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Sends an alert email for a new blockchain event.
 * @param {string} event - Blockchain event description.
 */
const sendAlert = async (event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'admin@example.com',
    subject: 'Blockchain Event Alert',
    text: `New event detected: ${event}`,
  };
  await transporter.sendMail(mailOptions);
};

/**
 * Subscribes to new block events and sends alerts.
 */
const subscribeToNewBlocks = () => {
  web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
    if (error) {
      console.error('Subscription error:', error);
    } else {
      console.log(`New block received: ${blockHeader.number}`);
      await sendAlert(`New block received: ${blockHeader.number}`);
    }
  });
};

/**
 * Subscribes to pending transactions and logs them.
 */
const subscribeToPendingTransactions = () => {
  web3.eth.subscribe('pendingTransactions', async (error, txHash) => {
    if (error) {
      console.error('Subscription error:', error);
    } else {
      console.log(`New pending transaction detected: ${txHash}`);
      await sendAlert(`New pending transaction detected: ${txHash}`);
    }
  });
};

module.exports = { subscribeToNewBlocks, subscribeToPendingTransactions };
