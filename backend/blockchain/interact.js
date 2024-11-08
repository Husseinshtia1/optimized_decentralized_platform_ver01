
const Web3 = require('web3');
const contractABI = [/* ABI array from compiled contract */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function createSoftware(name, codeHash, fromAddress, privateKey) {
  const tx = contract.methods.createSoftware(name, codeHash);
  const gas = await tx.estimateGas({ from: fromAddress });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(fromAddress);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data,
      gas,
      nonce,
    },
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return receipt;
}

module.exports = { createSoftware };
