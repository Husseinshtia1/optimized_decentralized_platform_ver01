
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { pinCodeWithMetadata } = require('../controllers/aiPinningController');

const upload = multer();
router.post('/pin-code', upload.single('file'), pinCodeWithMetadata);

module.exports = router;
