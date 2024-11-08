
const { Configuration, OpenAIApi } = require('openai');

exports.generateCode = async (req, res) => {
  const { prompt } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt,
      max_tokens: 150,
      temperature: 0,
    });
    res.json({ code: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ message: 'AI code generation failed' });
  }
};
