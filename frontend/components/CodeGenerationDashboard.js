
// frontend/components/CodeGenerationDashboard.js
import React, { useState } from 'react';

const CodeGenerationDashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Handle code generation request
  const generateCode = async () => {
    const response = await fetch('/api/codex/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setGeneratedCode(data.code);
  };

  return (
    <div className="code-generation-dashboard">
      <h2>AI Code Generation with OpenAI Codex</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for code generation..."
        rows="4"
      />
      <button onClick={generateCode}>Generate Code</button>
      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Code:</h3>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeGenerationDashboard;
