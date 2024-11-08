
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/blockchain/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        alert('Failed to fetch transaction history');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.hash}>
            {tx.timestamp}: {tx.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
