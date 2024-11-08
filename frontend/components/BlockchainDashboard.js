
// frontend/components/BlockchainDashboard.js
import React, { useState, useEffect } from 'react';

const BlockchainDashboard = () => {
  const [latestBlock, setLatestBlock] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');

  // Fetch the latest block number
  const fetchLatestBlock = async () => {
    const response = await fetch('/api/blockchain/latest-block');
    const data = await response.json();
    setLatestBlock(data.blockNumber);
  };

  // Send a test transaction
  const sendTransaction = async () => {
    try {
      const response = await fetch('/api/blockchain/send-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: '0xSenderAddress',
          to: '0xReceiverAddress',
          value: '1000000000000000', // 0.001 ETH in Wei
        }),
      });
      const result = await response.json();
      setTransactionStatus(`Transaction Successful: ${result.transactionHash}`);
    } catch (error) {
      setTransactionStatus('Transaction Failed');
    }
  };

  useEffect(() => {
    fetchLatestBlock();
  }, []);

  return (
    <div className="blockchain-dashboard">
      <h2>Blockchain Dashboard</h2>
      <p>Latest Block: {latestBlock !== null ? latestBlock : 'Loading...'}</p>
      <button onClick={sendTransaction}>Send Test Transaction</button>
      <p>{transactionStatus}</p>
    </div>
  );
};

export default BlockchainDashboard;
