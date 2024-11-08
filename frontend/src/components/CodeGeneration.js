
import React, { useState } from 'react';
import axios from 'axios';
import './CodeGeneration.css';  // Import the CSS styles

const CodeGeneration = () => {
    const [language, setLanguage] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    const handleGenerateCode = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await axios.post('/api/ai/generate', {
                language,
                prompt,
            });
            setGeneratedCode(response.data.code);
        } catch (err) {
            setError('Error generating code. Please try again.');
        }
    };

    return (
        <div className="code-generation">
            <h2>Code Generation Tool</h2>
            <form onSubmit={handleGenerateCode}>
                <div>
                    <label>Programming Language:</label>
                    <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Prompt:</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Generate Code</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {generatedCode && (
                <div>
                    <h3>Generated Code:</h3>
                    <pre>{generatedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeGeneration;
