
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.generate2FA = async (req, res) => {
    const secret = speakeasy.generateSecret({ name: 'DecentralizedPlatform' });
    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'QR Code generation failed' });
        }
        res.json({ secret: secret.base32, qrCode: data });
    });
};

exports.verify2FA = async (req, res) => {
    const { token, secret } = req.body;
    const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token });
    if (verified) {
        res.json({ message: '2FA Verified' });
    } else {
        res.status(400).json({ message: 'Invalid 2FA token' });
    }
};
