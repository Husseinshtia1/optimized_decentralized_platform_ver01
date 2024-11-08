
// frontend/components/EnhancedGovernanceDashboard.js
import React, { useState, useEffect } from 'react';

const EnhancedGovernanceDashboard = () => {
  const [layer1Balance, setLayer1Balance] = useState(0);
  const [layer2Balance, setLayer2Balance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [status, setStatus] = useState('');

  // Fetch token balances for Layer-1 and Layer-2
  const fetchBalances = async () => {
    const response1 = await fetch('/api/token/balance?layer=1');
    const response2 = await fetch('/api/token/balance?layer=2');
    const { balance: layer1 } = await response1.json();
    const { balance: layer2 } = await response2.json();
    setLayer1Balance(layer1);
    setLayer2Balance(layer2);
  };

  // Bridge tokens between Layer-1 and Layer-2
  const bridgeTokens = async (direction) => {
    const response = await fetch(`/api/token/bridge?direction=${direction}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: transferAmount }),
    });
    const data = await response.json();
    setStatus(data.status);
    fetchBalances(); // Refresh balances
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <div className="governance-dashboard">
      <h2>Enhanced Governance Dashboard</h2>

      <div className="balances">
        <h3>Token Balances</h3>
        <p>Layer-1 Balance: {layer1Balance}</p>
        <p>Layer-2 Balance: {layer2Balance}</p>
      </div>

      <div className="bridge-section">
        <h3>Bridge Tokens</h3>
        <input
          type="number"
          placeholder="Enter amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button onClick={() => bridgeTokens('layer1-to-layer2')}>
          Bridge to Layer-2
        </button>
        <button onClick={() => bridgeTokens('layer2-to-layer1')}>
          Bridge to Layer-1
        </button>
      </div>

      {status && <p>{status}</p>}
    </div>
  );
};

export default EnhancedGovernanceDashboard;
