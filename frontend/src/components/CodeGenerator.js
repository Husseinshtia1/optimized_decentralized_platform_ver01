
import React, { useState } from 'react';
import axios from 'axios';

function CodeGenerator() {
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [review, setReview] = useState('');

    const generateCode = async () => {
        try {
            const response = await axios.post('/api/ai/generate', { prompt });
            setGeneratedCode(response.data.generatedCode);
            setReview(response.data.review);
        } catch (error) {
            alert('Code generation failed');
        }
    };

    return (
        <div>
            <h2>AI-Assisted Code Generator</h2>
            <textarea
                placeholder="Enter your prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={generateCode}>Generate Code</button>
            <pre>{generatedCode}</pre>
            <h3>Real-Time Code Review</h3>
            <pre>{review}</pre>
        </div>
    );
}

export default CodeGenerator;
