
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

router.route('/me').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
