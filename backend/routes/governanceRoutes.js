
const express = require('express');
const router = express.Router();
const { analyzeProposal } = require('../controllers/governanceAnalysisController');

router.post('/analyze-proposal/:id', analyzeProposal);

module.exports = router;
