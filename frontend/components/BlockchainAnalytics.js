
// frontend/components/BlockchainAnalytics.js
import React, { useEffect, useState } from 'react';

const BlockchainAnalytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [address, setAddress] = useState('');

  // Fetch transaction history for the given address
  const fetchTransactionHistory = async () => {
    const response = await fetch(`/api/blockchain/transactions?address=${address}`);
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    if (address) fetchTransactionHistory();
  }, [address]);

  return (
    <div className="blockchain-analytics">
      <h2>Blockchain Analytics</h2>
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchTransactionHistory}>Get Transactions</button>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Value: {tx.value} Wei</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockchainAnalytics;
