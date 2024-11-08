
const express = require('express');
const router = express.Router();
const { monitorBehavior } = require('../middleware/behaviorAuthMiddleware');

router.post('/monitor', monitorBehavior, (req, res) => {
    res.json({ message: 'Behavior data validated. Session continues.' });
});

module.exports = router;
