
// frontend/components/FederatedLearningDashboard.js
import React, { useState, useEffect } from 'react';

const FederatedLearningDashboard = () => {
  const [nodes, setNodes] = useState([]);
  const [totalReward, setTotalReward] = useState(0);
  const [status, setStatus] = useState('');
  const [trainingData, setTrainingData] = useState({ input: [], labels: [] });

  // Fetch participating nodes
  const fetchNodes = async () => {
    const response = await fetch('/api/federated-learning/nodes');
    const data = await response.json();
    setNodes(data);
  };

  // Start distributed training
  const startTraining = async () => {
    const response = await fetch('/api/federated-learning/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, data: trainingData }),
    });
    const data = await response.json();
    setStatus(data.status);
  };

  // Distribute rewards
  const distributeRewards = async () => {
    const response = await fetch('/api/federated-learning/rewards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalReward }),
    });
    const data = await response.json();
    setStatus(data.status);
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <div className="federated-learning-dashboard">
      <h2>Federated Learning Dashboard</h2>

      <div className="training-section">
        <h3>Start Training</h3>
        <textarea
          placeholder="Enter training data (JSON format)"
          onChange={(e) => setTrainingData(JSON.parse(e.target.value))}
        />
        <button onClick={startTraining}>Start Distributed Training</button>
      </div>

      <div className="reward-section">
        <h3>Distribute Rewards</h3>
        <input
          type="number"
          placeholder="Enter total reward amount"
          onChange={(e) => setTotalReward(Number(e.target.value))}
        />
        <button onClick={distributeRewards}>Distribute Rewards</button>
      </div>

      <div className="nodes-section">
        <h3>Participating Nodes</h3>
        <ul>
          {nodes.map((node, index) => (
            <li key={index}>
              Address: {node.address} - Contributions: {node.contributions}
            </li>
          ))}
        </ul>
      </div>

      {status && <p>{status}</p>}
    </div>
  );
};

export default FederatedLearningDashboard;
