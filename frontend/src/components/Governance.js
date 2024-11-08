
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Governance() {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/governance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposals(response.data);
    };
    fetchProposals();
  }, []);

  const createProposal = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      '/api/governance',
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Proposal created');
  };

  const voteOnProposal = async (id, vote) => {
    const token = localStorage.getItem('token');
    await axios.post(
      `/api/governance/${id}/vote`,
      { vote },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Vote submitted');
  };

  return (
    <div>
      <h2>Governance</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createProposal}>Create Proposal</button>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal._id}>
            {proposal.title} - Votes: {proposal.votes}
            <button onClick={() => voteOnProposal(proposal._id, 'yes')}>Yes</button>
            <button onClick={() => voteOnProposal(proposal._id, 'no')}>No</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Governance;
