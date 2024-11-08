
// frontend/components/EnhancedModelBuilderDashboard.js
import React, { useState, useEffect } from 'react';

const EnhancedModelBuilderDashboard = () => {
  const [modelFile, setModelFile] = useState(null);
  const [cid, setCID] = useState('');
  const [versions, setVersions] = useState([]);
  const [review, setReview] = useState('');
  const [rewardStatus, setRewardStatus] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    setModelFile(e.target.files[0]);
  };

  // Upload model version to IPFS
  const uploadModel = async () => {
    const formData = new FormData();
    formData.append('model', modelFile);

    const response = await fetch('/api/collaborative-model/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setCID(data.cid);
    fetchVersionHistory(data.cid);
  };

  // Fetch model version history
  const fetchVersionHistory = async (modelCID) => {
    const response = await fetch(`/api/collaborative-model/versions?cid=${modelCID}`);
    const data = await response.json();
    setVersions(data);
  };

  // Submit a peer review
  const submitReview = async () => {
    const response = await fetch('/api/collaborative-model/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review, cid }),
    });
    const data = await response.json();
    setRewardStatus(`Review submitted with CID: ${data.reviewCID}`);
  };

  return (
    <div className="enhanced-model-builder-dashboard">
      <h2>AI Model Builder Dashboard</h2>

      <div className="upload-section">
        <h3>Upload Model Version</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadModel}>Upload to IPFS</button>
        {cid && <p>Model CID: {cid}</p>}
      </div>

      <div className="version-history">
        <h3>Version History</h3>
        <ul>
          {versions.map((version, index) => (
            <li key={index}>
              Contributor: {version.contributor} - Timestamp: {version.timestamp}
            </li>
          ))}
        </ul>
      </div>

      <div className="review-section">
        <h3>Submit Peer Review</h3>
        <textarea
          placeholder="Enter your review..."
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={submitReview}>Submit Review</button>
      </div>

      {rewardStatus && <p>{rewardStatus}</p>}
    </div>
  );
};

export default EnhancedModelBuilderDashboard;
