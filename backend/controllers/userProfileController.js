
// backend/controllers/userProfileController.js

const express = require('express');
const router = express.Router();

let userProfiles = []; // In-memory storage for user profiles

/**
 * Get user profile by ID.
 * @param {number} id - User ID.
 * @returns {Object} User profile.
 */
router.get('/:id', (req, res) => {
  const profile = userProfiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) return res.status(404).send('Profile not found.');
  res.json(profile);
});

/**
 * Update user profile by ID.
 * @param {number} id - User ID.
 * @returns {Object} Updated profile.
 */
router.put('/:id', (req, res) => {
  const profile = userProfiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) return res.status(404).send('Profile not found.');

  Object.assign(profile, req.body);
  res.json(profile);
});

module.exports = router;
