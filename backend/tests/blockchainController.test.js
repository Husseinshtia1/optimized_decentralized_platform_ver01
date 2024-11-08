
// backend/tests/blockchainController.test.js
const { getLatestBlock, sendTransaction } = require('../controllers/blockchainController');

describe('Blockchain Controller', () => {
  it('should retrieve the latest block number', async () => {
    const blockNumber = await getLatestBlock();
    expect(typeof blockNumber).toBe('number');
  });

  it('should send a transaction successfully', async () => {
    const receipt = await sendTransaction(
      '0xSenderAddress',
      '0xReceiverAddress',
      '1000000000000000'
    );
    expect(receipt).toHaveProperty('transactionHash');
  });
});
