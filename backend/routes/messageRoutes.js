
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMessages, sendMessage } = require('../controllers/messageController');

router.route('/').get(protect, getMessages).post(protect, sendMessage);

module.exports = router;
