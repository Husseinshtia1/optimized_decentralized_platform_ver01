
const Web3 = require('web3');
const contractABI = [/* ABI array */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getContractData() {
  const totalSoftware = await contract.methods.softwareCount().call();
  console.log('Total Software Registered:', totalSoftware);
  return totalSoftware;
}

module.exports = { getContractData };
