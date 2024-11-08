
// backend/controllers/eventListenerController.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));
const fs = require('fs');

const contractABI = [...]; // Replace with the smart contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Logs events to a file for audit purposes.
 * @param {string} message - The message to log.
 */
const logEvent = (message) => {
  const log = `[${new Date().toISOString()}] ${message}
`;
  fs.appendFileSync('events.log', log);
};

/**
 * Listens for ProposalCreated events from the smart contract.
 */
const listenToProposalCreated = () => {
  contract.events.ProposalCreated({}, (error, event) => {
    if (error) {
      console.error('Error listening to ProposalCreated:', error);
      logEvent(`Error: ${error.message}`);
    } else {
      console.log('ProposalCreated event:', event);
      logEvent(`ProposalCreated: ${JSON.stringify(event.returnValues)}`);
    }
  });
};

/**
 * Listens for RoleAssigned events from the smart contract.
 */
const listenToRoleAssigned = () => {
  contract.events.RoleAssigned({}, (error, event) => {
    if (error) {
      console.error('Error listening to RoleAssigned:', error);
      logEvent(`Error: ${error.message}`);
    } else {
      console.log('RoleAssigned event:', event);
      logEvent(`RoleAssigned: ${JSON.stringify(event.returnValues)}`);
    }
  });
};

module.exports = { listenToProposalCreated, listenToRoleAssigned };
