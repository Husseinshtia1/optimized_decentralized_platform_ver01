
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
const axios = require('axios');

// Mock AI code analysis function - replace with actual AI API call
async function analyzeCode(code) {
    const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt: `Analyze this code: ${code}`,
        model: 'text-davinci-002',
        temperature: 0.5,
        max_tokens: 150,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
    });
    return response.data.choices[0].text.trim();
}

exports.pinCodeWithMetadata = async (req, res) => {
    try {
        const code = req.file.buffer.toString();
        const analysis = await analyzeCode(code);

        const metadata = {
            name: req.body.name || 'Unnamed Code',
            description: `AI-analyzed code with the following summary: ${analysis}`,
            timestamp: new Date().toISOString(),
            version: req.body.version || '1.0',
        };

        const options = {
            pinataMetadata: {
                name: metadata.name,
                keyvalues: metadata,
            },
        };

        const result = await pinata.pinFileToIPFS(req.file.buffer, options);
        res.json({ ipfsHash: result.IpfsHash, analysis });
    } catch (error) {
        console.error('Pinning failed:', error);
        res.status(500).json({ message: 'Failed to pin code to IPFS' });
    }
};
