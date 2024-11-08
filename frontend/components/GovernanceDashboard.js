
// frontend/components/GovernanceDashboard.js
import React, { useState, useEffect } from 'react';

const GovernanceDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  // Fetch the token balance for the user
  const fetchTokenBalance = async () => {
    const response = await fetch(`/api/smart-contract/balance?address=${address}`);
    const data = await response.json();
    setTokenBalance(data.balance);
  };

  // Fetch proposals from the smart contract
  const fetchProposals = async () => {
    const response = await fetch('/api/proposals');
    const data = await response.json();
    setProposals(data);
  };

  // Cast a token-weighted vote
  const voteOnProposal = async (id, vote) => {
    const response = await fetch(`/api/smart-contract/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposalId: id, vote, voter: address }),
    });
    const data = await response.json();
    setStatus(`Voted ${vote} on proposal ${id}. Transaction: ${data.txHash}`);
    fetchProposals();
  };

  useEffect(() => {
    if (address) fetchTokenBalance();
    fetchProposals();
  }, [address]);

  return (
    <div className="governance-dashboard">
      <h2>Governance Dashboard</h2>
      <input
        type="text"
        placeholder="Enter your Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <p>Token Balance: {tokenBalance}</p>

      <div className="proposals">
        <h3>Active Proposals</h3>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <h4>{proposal.title}</h4>
              <p>{proposal.description}</p>
              <p>
                Yes: {proposal.votes.yes} | No: {proposal.votes.no}
              </p>
              <button onClick={() => voteOnProposal(proposal.id, 'yes')}>
                Vote Yes
              </button>
              <button onClick={() => voteOnProposal(proposal.id, 'no')}>
                Vote No
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p>{status}</p>
    </div>
  );
};

export default GovernanceDashboard;
