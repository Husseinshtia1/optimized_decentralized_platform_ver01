
// backend/controllers/codexController.js
const axios = require('axios');

/**
 * Generates code using OpenAI Codex API based on a given prompt.
 * @param {string} prompt - The prompt for code generation.
 * @returns {Promise<string>} Generated code.
 */
const generateCode = async (prompt) => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'code-davinci-002',
      prompt,
      max_tokens: 100,
      temperature: 0.5,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  return response.data.choices[0].text;
};

module.exports = { generateCode };
