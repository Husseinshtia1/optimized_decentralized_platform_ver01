
import React, { useState } from 'react';
import axios from 'axios';

function CodeGenerator() {
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const generateCode = async () => {
        try {
            const response = await axios.post('/api/ai/generate', { prompt });
            setGeneratedCode(response.data.generatedCode);
        } catch (error) {
            console.error('Code generation error:', error);
            alert('Code generation failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>AI Code Generator</h2>
            <textarea
                placeholder="Enter a prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={generateCode}>Generate Code</button>
            <pre>{generatedCode}</pre>
        </div>
    );
}

export default CodeGenerator;
