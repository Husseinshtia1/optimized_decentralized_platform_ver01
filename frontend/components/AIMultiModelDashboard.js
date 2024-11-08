
// frontend/components/AIMultiModelDashboard.js
import React, { useState } from 'react';

const AIMultiModelDashboard = () => {
  const [classificationInput, setClassificationInput] = useState([0, 0, 0, 0]);
  const [clusteringInput, setClusteringInput] = useState([0, 0]);
  const [classificationResult, setClassificationResult] = useState(null);
  const [clusteringResult, setClusteringResult] = useState(null);

  // Handle input changes
  const handleInputChange = (index, value, type) => {
    const input = type === 'classification' ? [...classificationInput] : [...clusteringInput];
    input[index] = parseFloat(value);
    type === 'classification' ? setClassificationInput(input) : setClusteringInput(input);
  };

  // Fetch classification prediction
  const fetchClassification = async () => {
    const response = await fetch('/api/ai/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: classificationInput }),
    });
    const data = await response.json();
    setClassificationResult(data.result);
  };

  // Fetch clustering prediction
  const fetchClustering = async () => {
    const response = await fetch('/api/ai/cluster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: clusteringInput }),
    });
    const data = await response.json();
    setClusteringResult(data.result);
  };

  return (
    <div className="ai-multi-model-dashboard">
      <h2>AI Multi-Model Dashboard</h2>

      <div>
        <h3>Classification Model</h3>
        {classificationInput.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value, 'classification')}
          />
        ))}
        <button onClick={fetchClassification}>Get Classification</button>
        {classificationResult && <p>Classification Result: {classificationResult}</p>}
      </div>

      <div>
        <h3>Clustering Model</h3>
        {clusteringInput.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value, 'clustering')}
          />
        ))}
        <button onClick={fetchClustering}>Get Clustering</button>
        {clusteringResult && <p>Clustering Result: {clusteringResult}</p>}
      </div>
    </div>
  );
};

export default AIMultiModelDashboard;
