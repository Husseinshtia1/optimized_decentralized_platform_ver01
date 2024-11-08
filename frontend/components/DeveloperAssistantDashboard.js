
// frontend/components/DeveloperAssistantDashboard.js
import React, { useState } from 'react';

const DeveloperAssistantDashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [reviewSnippet, setReviewSnippet] = useState('');
  const [response, setResponse] = useState('');

  // Generate code snippet based on user prompt
  const generateCode = async () => {
    const response = await fetch('/api/codex/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setResponse(data.snippet);
  };

  // Perform automated code review
  const reviewCode = async () => {
    const response = await fetch('/api/codex/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: reviewSnippet }),
    });
    const data = await response.json();
    setResponse(data.feedback);
  };

  return (
    <div className="developer-assistant-dashboard">
      <h2>AI-Powered Developer Assistant</h2>

      <div className="code-generation">
        <h3>Generate Code</h3>
        <textarea
          placeholder="Enter your code prompt..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateCode}>Generate Code</button>
      </div>

      <div className="code-review">
        <h3>Automated Code Review</h3>
        <textarea
          placeholder="Paste your code here for review..."
          onChange={(e) => setReviewSnippet(e.target.value)}
        />
        <button onClick={reviewCode}>Review Code</button>
      </div>

      <div className="response">
        <h3>AI Response</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default DeveloperAssistantDashboard;
