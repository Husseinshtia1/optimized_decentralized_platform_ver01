
// backend/controllers/codexIntegrationController.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate code snippet based on user prompt.
 * @param {string} prompt - User's input for code generation.
 * @returns {Promise<string>} - Generated code snippet.
 */
const generateCodeSnippet = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt,
      max_tokens: 200,
      temperature: 0.5,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating code:', error);
    return 'Error generating code. Please try again.';
  }
};

/**
 * Perform automated code review.
 * @param {string} code - Code snippet to review.
 * @returns {Promise<string>} - Feedback and suggestions.
 */
const performCodeReview = async (code) => {
  const prompt = `Review the following code and provide feedback:

${code}`;
  return await generateCodeSnippet(prompt);
};

module.exports = { generateCodeSnippet, performCodeReview };
