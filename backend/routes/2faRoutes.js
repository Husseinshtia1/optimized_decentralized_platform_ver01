
const express = require('express');
const router = express.Router();
const { generate2FA, verify2FA } = require('../controllers/2faController');

router.post('/generate', generate2FA);
router.post('/verify', verify2FA);

module.exports = router;
