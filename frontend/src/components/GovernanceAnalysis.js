
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GovernanceAnalysis() {
    const [proposals, setProposals] = useState([]);
    const [analysis, setAnalysis] = useState('');
    const [sentiment, setSentiment] = useState('');

    const fetchProposals = async () => {
        const response = await axios.get('/api/governance/proposals');
        setProposals(response.data);
    };

    const analyzeProposal = async (id) => {
        try {
            const response = await axios.post(`/api/ai/analyze-proposal/${id}`);
            setAnalysis(response.data.analysis);
            setSentiment(response.data.sentiment);
        } catch (error) {
            alert('Failed to analyze proposal');
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    return (
        <div>
            <h2>Governance Proposals</h2>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description}
                        <button onClick={() => analyzeProposal(proposal.id)}>
                            Analyze Proposal
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Proposal Analysis</h3>
            <pre>{analysis}</pre>
            <h3>Sentiment Tracking</h3>
            <pre>{sentiment}</pre>
        </div>
    );
}

export default GovernanceAnalysis;
