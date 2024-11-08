
// frontend/components/CrossChainDashboard.js
import React, { useState, useEffect } from 'react';

const CrossChainDashboard = () => {
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Polygon');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('');
  const [pendingTransfers, setPendingTransfers] = useState([]);

  // Fetch pending transfers
  const fetchPendingTransfers = async () => {
    const response = await fetch('/api/cross-chain/transfers');
    const data = await response.json();
    setPendingTransfers(data);
  };

  // Initiate a cross-chain token transfer
  const initiateTransfer = async () => {
    const response = await fetch('/api/cross-chain/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromChain, toChain, address, amount }),
    });
    const data = await response.json();
    setStatus(data.status);
    fetchPendingTransfers(); // Refresh transfer status
  };

  useEffect(() => {
    fetchPendingTransfers();
  }, []);

  return (
    <div className="cross-chain-dashboard">
      <h2>Cross-Chain Dashboard</h2>

      <div className="transfer-section">
        <h3>Initiate Token Transfer</h3>
        <input
          type="text"
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select onChange={(e) => setFromChain(e.target.value)}>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
          <option value="Solana">Solana</option>
        </select>
        <select onChange={(e) => setToChain(e.target.value)}>
          <option value="Polygon">Polygon</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Solana">Solana</option>
        </select>
        <button onClick={initiateTransfer}>Transfer Tokens</button>
      </div>

      <div className="pending-transfers">
        <h3>Pending Transfers</h3>
        <ul>
          {pendingTransfers.map((transfer, index) => (
            <li key={index}>
              {transfer.amount} tokens from {transfer.fromChain} to {transfer.toChain}
              - Status: {transfer.status}
            </li>
          ))}
        </ul>
      </div>

      {status && <p>{status}</p>}
    </div>
  );
};

export default CrossChainDashboard;
