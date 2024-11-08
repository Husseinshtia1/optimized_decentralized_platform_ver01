
// frontend/components/DIDDashboard.js
import React, { useState } from 'react';

const DIDDashboard = () => {
  const [address, setAddress] = useState('');
  const [did, setDID] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [status, setStatus] = useState('');

  // Register a new DID for the user
  const registerDID = async () => {
    const response = await fetch('/api/did/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    const data = await response.json();
    setDID(data.did);
    setStatus(`DID registered: ${data.did}`);
  };

  // Verify the DID on-chain
  const verifyDID = async () => {
    const response = await fetch(`/api/did/verify?address=${address}`);
    const data = await response.json();
    setVerificationStatus(data.verified ? 'Verified' : 'Not Verified');
  };

  return (
    <div className="did-dashboard">
      <h2>DID Management Dashboard</h2>

      <div className="register-did">
        <h3>Register DID</h3>
        <input
          type="text"
          placeholder="Enter your Ethereum address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={registerDID}>Register DID</button>
        <p>{status}</p>
      </div>

      <div className="verify-did">
        <h3>Verify DID</h3>
        <button onClick={verifyDID}>Verify On-Chain</button>
        <p>Verification Status: {verificationStatus}</p>
      </div>

      {did && (
        <div className="did-info">
          <h3>Your DID</h3>
          <p>{did}</p>
        </div>
      )}
    </div>
  );
};

export default DIDDashboard;
