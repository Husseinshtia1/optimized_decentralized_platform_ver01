
// backend/tests/mailgunController.test.js
const { sendEmail } = require('../controllers/mailgunController');

describe('Mailgun Controller', () => {
  it('should send an email successfully', async () => {
    const response = await sendEmail('test@example.com', 'Test Subject', 'Test Body');
    expect(response).toHaveProperty('id'); // Assuming Mailgun returns an ID
  });
});
