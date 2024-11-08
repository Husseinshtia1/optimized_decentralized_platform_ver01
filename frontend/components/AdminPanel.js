
// frontend/components/AdminPanel.js
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [wallets, setWallets] = useState([]);
  const [owners, setOwners] = useState(['']);
  const [required, setRequired] = useState(1);
  const [status, setStatus] = useState('');

  // Fetch existing wallets
  const fetchWallets = async () => {
    const response = await fetch('/api/wallets');
    const data = await response.json();
    setWallets(data);
  };

  // Create a new multi-signature wallet
  const createWallet = async () => {
    const response = await fetch('/api/wallets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owners, required }),
    });
    const result = await response.json();
    setStatus(`Wallet Created: ${result.address}`);
    fetchWallets();
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Management Panel</h2>
      <h3>Create Multi-Signature Wallet</h3>
      {owners.map((owner, index) => (
        <input
          key={index}
          type="text"
          value={owner}
          placeholder={`Owner ${index + 1} Address`}
          onChange={(e) => {
            const newOwners = [...owners];
            newOwners[index] = e.target.value;
            setOwners(newOwners);
          }}
        />
      ))}
      <button onClick={() => setOwners([...owners, ''])}>Add Owner</button>
      <input
        type="number"
        value={required}
        min="1"
        max={owners.length}
        onChange={(e) => setRequired(Number(e.target.value))}
      />
      <button onClick={createWallet}>Create Wallet</button>
      <p>{status}</p>
      <h3>Existing Wallets</h3>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.address}>{wallet.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
