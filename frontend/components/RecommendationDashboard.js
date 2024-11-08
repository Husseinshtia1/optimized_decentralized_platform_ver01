
// frontend/components/RecommendationDashboard.js
import React, { useState } from 'react';

const RecommendationDashboard = () => {
  const [userInput, setUserInput] = useState([0, 0, 0, 0, 0]);
  const [recommendation, setRecommendation] = useState(null);

  // Handle user input changes
  const handleInputChange = (index, value) => {
    const updatedInput = [...userInput];
    updatedInput[index] = parseFloat(value);
    setUserInput(updatedInput);
  };

  // Fetch recommendation from the backend
  const fetchRecommendation = async () => {
    const response = await fetch('/api/ai/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userInput }),
    });
    const data = await response.json();
    setRecommendation(data.recommendation);
  };

  return (
    <div className="recommendation-dashboard">
      <h2>AI Recommendation Dashboard</h2>
      <p>Enter values for prediction:</p>
      {userInput.map((value, index) => (
        <input
          key={index}
          type="number"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button onClick={fetchRecommendation}>Get Recommendation</button>
      {recommendation !== null && <p>Recommendation Score: {recommendation}</p>}
    </div>
  );
};

export default RecommendationDashboard;
