
// frontend/components/PublisherDashboard.js
import React, { useState, useEffect } from 'react';

const PublisherDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  // Fetch all proposals
  const fetchProposals = async () => {
    const response = await fetch('/api/proposals');
    const data = await response.json();
    setProposals(data);
  };

  // Create a new proposal
  const createProposal = async () => {
    const response = await fetch('/api/proposals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    setStatus(`Proposal "${data.title}" created successfully!`);
    fetchProposals();
  };

  // Vote on a proposal
  const voteOnProposal = async (id, vote) => {
    await fetch(`/api/proposals/vote/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote }),
    });
    fetchProposals();
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="publisher-dashboard">
      <h2>Publisher Dashboard</h2>

      <div className="create-proposal">
        <h3>Create New Proposal</h3>
        <input
          type="text"
          placeholder="Proposal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Proposal Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createProposal}>Create Proposal</button>
        <p>{status}</p>
      </div>

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
    </div>
  );
};

export default PublisherDashboard;
