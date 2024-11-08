
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = generateToken(user._id);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `Reset your password using this token: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reset email' });
  }
};
