
const { OpenAIApi, Configuration } = require('openai');

// Initialize OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Generate code function
const generateCode = async (req, res) => {
    const { language, prompt } = req.body;

    if (!language || !prompt) {
        return res.status(400).json({ error: 'Language and prompt are required.' });
    }

    try {
        const response = await openai.createCompletion({
            model: 'code-davinci-002',
            prompt: prompt,
            temperature: 0,
            max_tokens: 100,
            stop: ['
'],
        });

        const generatedCode = response.data.choices[0].text;
        res.status(200).json({ code: generatedCode });
    } catch (error) {
        res.status(500).json({ error: 'Error generating code.' });
    }
};

module.exports = { generateCode };
