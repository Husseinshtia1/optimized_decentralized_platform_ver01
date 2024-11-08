
const axios = require('axios');

exports.analyzeProposal = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch proposal content from the database (mocked here)
        const proposal = { id, description: "Implement decentralized AI governance" };

        const analysisResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: `Analyze the following proposal: ${proposal.description}`,
                model: 'text-davinci-002',
                temperature: 0.5,
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const sentimentResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: `Determine the sentiment of this proposal: ${proposal.description}`,
                model: 'text-davinci-002',
                temperature: 0.5,
                max_tokens: 50,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const analysis = analysisResponse.data.choices[0].text;
        const sentiment = sentimentResponse.data.choices[0].text;

        res.json({ analysis, sentiment });
    } catch (error) {
        console.error('Proposal analysis failed:', error);
        res.status(500).json({ message: 'Failed to analyze proposal' });
    }
};
