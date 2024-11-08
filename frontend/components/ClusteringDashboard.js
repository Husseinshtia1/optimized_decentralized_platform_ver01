
// frontend/components/ClusteringDashboard.js
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';

const ClusteringDashboard = () => {
  const [dataInput, setDataInput] = useState([1, 2]);
  const [cluster, setCluster] = useState(null);

  // Fetch cluster prediction from backend
  const fetchCluster = async () => {
    const response = await fetch('/api/ai/cluster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: dataInput }),
    });
    const data = await response.json();
    setCluster(data.cluster);
  };

  const chartData = {
    datasets: [
      {
        label: 'User Interactions',
        data: [{ x: dataInput[0], y: dataInput[1] }],
        backgroundColor: cluster === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div className="clustering-dashboard">
      <h2>Clustering Analytics Dashboard</h2>
      <input
        type="number"
        value={dataInput[0]}
        onChange={(e) => setDataInput([+e.target.value, dataInput[1]])}
        placeholder="Interaction 1"
      />
      <input
        type="number"
        value={dataInput[1]}
        onChange={(e) => setDataInput([dataInput[0], +e.target.value])}
        placeholder="Interaction 2"
      />
      <button onClick={fetchCluster}>Predict Cluster</button>
      {cluster !== null && <p>Predicted Cluster: {cluster}</p>}
      <Scatter data={chartData} />
    </div>
  );
};

export default ClusteringDashboard;
