
const express = require('express');
const router = express.Router();
const { monitorSession } = require('../middleware/securityMiddleware');

router.post('/monitor', monitorSession, (req, res) => {
    res.json({ message: 'Session activity monitored successfully.' });
});

module.exports = router;
