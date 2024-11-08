
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/transactions', protect, async (req, res) => {
  try {
    // Simulate fetching blockchain transactions
    const transactions = [
      { hash: '0x123', timestamp: '2024-10-21', details: 'Contract deployed' },
      { hash: '0x456', timestamp: '2024-10-22', details: 'Software registered' },
    ];
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
