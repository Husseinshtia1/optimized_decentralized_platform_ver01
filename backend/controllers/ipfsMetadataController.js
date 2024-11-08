
const axios = require('axios');

exports.tagAndPin = async (req, res) => {
    const { content, name } = req.body;

    try {
        // AI-based metadata generation
        const metadataResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: `Generate tags and description for: ${content}`,
                model: 'text-davinci-002',
                temperature: 0.5,
                max_tokens: 50,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
            }
        );

        const metadata = metadataResponse.data.choices[0].text;

        const pinataResponse = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            {
                name,
                description: metadata,
                content,
            },
            {
                headers: {
                    'pinata_api_key': process.env.PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.PINATA_SECRET_KEY,
                }
            }
        );

        res.json({ ipfsHash: pinataResponse.data.IpfsHash, metadata });
    } catch (error) {
        console.error('Metadata tagging and pinning failed:', error);
        res.status(500).json({ message: 'Failed to tag and pin content' });
    }
};

exports.searchMetadata = async (req, res) => {
    const { query } = req.body;

    try {
        // Mock search logic - replace with a real metadata index
        const results = [
            { name: 'Example File', description: 'AI-generated example metadata' },
        ];

        res.json({ results });
    } catch (error) {
        console.error('Search failed:', error);
        res.status(500).json({ message: 'Search failed' });
    }
};
