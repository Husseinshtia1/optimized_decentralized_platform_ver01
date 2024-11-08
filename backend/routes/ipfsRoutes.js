
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadToIPFS } = require('../controllers/ipfsController');
const multer = require('multer');

const upload = multer();
router.post('/', protect, upload.single('file'), uploadToIPFS);

module.exports = router;
