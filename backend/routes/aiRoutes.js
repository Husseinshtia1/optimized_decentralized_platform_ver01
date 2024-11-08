
const express = require('express');
const router = express.Router();
const { generateCode } = require('../controllers/codeGenerationController');

// Endpoint for generating code snippets
router.post('/generate', generateCode);

module.exports = router;
