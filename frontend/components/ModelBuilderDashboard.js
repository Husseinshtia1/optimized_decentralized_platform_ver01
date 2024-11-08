
// frontend/components/ModelBuilderDashboard.js
import React, { useState } from 'react';

const ModelBuilderDashboard = () => {
  const [modelFile, setModelFile] = useState(null);
  const [trainingData, setTrainingData] = useState({ input: [], labels: [] });
  const [cid, setCID] = useState('');
  const [rewardStatus, setRewardStatus] = useState('');

  // Handle model file selection
  const handleFileChange = (e) => {
    setModelFile(e.target.files[0]);
  };

  // Upload the model to IPFS
  const uploadModel = async () => {
    const formData = new FormData();
    formData.append('model', modelFile);

    const response = await fetch('/api/distributed-training/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setCID(data.cid);
  };

  // Distribute the training task to nodes
  const distributeTraining = async () => {
    const response = await fetch(`/api/distributed-training/train?cid=${cid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trainingData),
    });
    const data = await response.json();
    setRewardStatus(data.status);
  };

  return (
    <div className="model-builder-dashboard">
      <h2>AI Model Builder Dashboard</h2>

      <div className="upload-section">
        <h3>Upload AI Model</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadModel}>Upload to IPFS</button>
        {cid && <p>Model CID: {cid}</p>}
      </div>

      <div className="training-section">
        <h3>Distribute Training</h3>
        <textarea
          placeholder="Enter training data (JSON format)"
          onChange={(e) => setTrainingData(JSON.parse(e.target.value))}
        />
        <button onClick={distributeTraining}>Start Training</button>
        {rewardStatus && <p>{rewardStatus}</p>}
      </div>
    </div>
  );
};

export default ModelBuilderDashboard;
