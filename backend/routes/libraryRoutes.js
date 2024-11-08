
const express = require('express');
const router = express.Router();
const { getLibraries } = require('../controllers/libraryController');

router.route('/').get(getLibraries);

module.exports = router;
