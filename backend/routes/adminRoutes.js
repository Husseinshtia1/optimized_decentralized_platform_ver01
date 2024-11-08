
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getUsers, deleteUser } = require('../controllers/adminController');

router.route('/users').get(protect, adminOnly, getUsers);
router.route('/users/:id').delete(protect, adminOnly, deleteUser);

module.exports = router;
