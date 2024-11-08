
// frontend/components/AIPredictions.js
import React, { useState } from 'react';

const AIPredictions = () => {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);

  // Fetch prediction from the backend
  const fetchPrediction = async () => {
    const response = await fetch(`/api/ai/predict?input=${input}`);
    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="ai-predictions">
      <h2>AI-Powered Predictions</h2>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter value for prediction"
      />
      <button onClick={fetchPrediction}>Get Prediction</button>
      {prediction !== null && <p>Predicted Value: {prediction}</p>}
    </div>
  );
};

export default AIPredictions;
