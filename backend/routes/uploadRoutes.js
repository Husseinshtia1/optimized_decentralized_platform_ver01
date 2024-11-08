
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadFile } = require('../controllers/uploadController');

router.post('/', protect, uploadFile, (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

module.exports = router;
