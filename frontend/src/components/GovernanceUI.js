
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GovernanceUI() {
    const [proposals, setProposals] = useState([]);
    const [description, setDescription] = useState('');

    const fetchProposals = async () => {
        const response = await axios.get('/api/governance/proposals');
        setProposals(response.data);
    };

    const createProposal = async () => {
        await axios.post('/api/governance/proposals', { description });
        fetchProposals();
    };

    const voteOnProposal = async (id, support) => {
        await axios.post(`/api/governance/proposals/${id}/vote`, { support });
        fetchProposals();
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    return (
        <div>
            <h2>Governance</h2>
            <input
                type="text"
                placeholder="Proposal Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={createProposal}>Create Proposal</button>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description} - Votes For: {proposal.votesFor} - Votes Against: {proposal.votesAgainst}
                        <button onClick={() => voteOnProposal(proposal.id, true)}>Vote For</button>
                        <button onClick={() => voteOnProposal(proposal.id, false)}>Vote Against</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GovernanceUI;
