
// frontend/components/TransactionHistoryDashboard.js
import React, { useState, useEffect } from 'react';

const TransactionHistoryDashboard = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState('');

  // Fetch transaction history for a given address
  const fetchTransactionHistory = async () => {
    const response = await fetch(`/api/transactions?address=${address}`);
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    if (address) fetchTransactionHistory();
  }, [address]);

  return (
    <div className="transaction-history-dashboard">
      <h2>Transaction History Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchTransactionHistory}>Fetch Transactions</button>

      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <p>Hash: {tx.hash}</p>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Value: {tx.value} Wei</p>
          </li>
        ))}
      </ul>
      <p>{status}</p>
    </div>
  );
};

export default TransactionHistoryDashboard;
