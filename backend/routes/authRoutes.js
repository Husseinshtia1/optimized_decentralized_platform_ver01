
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { detectFraud } = require('../controllers/fraudDetectionController');

router.post('/register', detectFraud, register);
router.post('/login', login);

module.exports = router;
