
const Web3 = require('web3');
const contractABI = [/* ABI Array */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.events.SoftwareCreated({}, (error, event) => {
  if (error) {
    console.error('Error listening to events:', error);
  } else {
    console.log('New software created:', event.returnValues);
  }
});

module.exports = contract;
