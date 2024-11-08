
// frontend/components/GovernanceAutomationDashboard.js
import React, { useState, useEffect } from 'react';

const GovernanceAutomationDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [action, setAction] = useState('');
  const [status, setStatus] = useState('');

  // Fetch all proposals from the backend
  const fetchProposals = async () => {
    const response = await fetch('/api/governance/proposals');
    const data = await response.json();
    setProposals(data);
  };

  // Create a new automated proposal
  const createProposal = async () => {
    const response = await fetch('/api/governance/proposals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await response.json();
    setStatus(`Proposal created: ${data.txHash}`);
    fetchProposals();
  };

  // Execute an approved proposal
  const executeProposal = async (id) => {
    const response = await fetch(`/api/governance/proposals/execute/${id}`, {
      method: 'POST',
    });
    const data = await response.json();
    setStatus(`Proposal executed: ${data.txHash}`);
    fetchProposals();
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="governance-automation-dashboard">
      <h2>Governance Automation Dashboard</h2>

      <div className="create-proposal">
        <h3>Create New Automated Proposal</h3>
        <input
          type="text"
          placeholder="Enter proposal action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <button onClick={createProposal}>Create Proposal</button>
      </div>

      <div className="proposals">
        <h3>Active Proposals</h3>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <h4>Action: {proposal.action}</h4>
              <p>Status: {proposal.status}</p>
              <button onClick={() => executeProposal(proposal.id)}>
                Execute Proposal
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p>{status}</p>
    </div>
  );
};

export default GovernanceAutomationDashboard;
