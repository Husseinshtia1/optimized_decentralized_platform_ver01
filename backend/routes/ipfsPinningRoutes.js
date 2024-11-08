
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { pinFileToIPFS } = require('../controllers/ipfsPinningController');

const upload = multer();
router.post('/pin', upload.single('file'), pinFileToIPFS);

module.exports = router;
