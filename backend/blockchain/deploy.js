
const Web3 = require('web3');
const { abi, evm } = require('./SoftwareProtocol.json'); // Contract ABI and Bytecode
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying from account:', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '5000000' });

  console.log('Contract deployed at:', result.options.address);
};

deploy();
