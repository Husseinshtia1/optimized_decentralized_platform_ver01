
// backend/controllers/mailgunController.js

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mg = new Mailgun(formData).client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

/**
 * Sends an email notification via Mailgun.
 * @param {string} to - Recipient's email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body content.
 * @returns {Promise<Object>} - Mailgun response object.
 */
const sendEmail = async (to, subject, text) => {
  const domain = process.env.MAILGUN_DOMAIN;
  return await mg.messages.create(domain, {
    from: 'noreply@yourdomain.com',
    to,
    subject,
    text,
  });
};

module.exports = { sendEmail };
