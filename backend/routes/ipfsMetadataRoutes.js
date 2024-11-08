
const express = require('express');
const router = express.Router();
const { tagAndPin, searchMetadata } = require('../controllers/ipfsMetadataController');

router.post('/tag-and-pin', tagAndPin);
router.post('/search', searchMetadata);

module.exports = router;
