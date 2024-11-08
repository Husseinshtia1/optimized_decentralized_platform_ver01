
// backend/controllers/userManagementController.js

const express = require('express');
const router = express.Router();

let users = []; // In-memory user storage for demo purposes

/**
 * Get all users with optional pagination.
 * @param {number} page - Current page.
 * @param {number} limit - Items per page.
 * @returns {Array} Paginated list of users.
 */
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);
  res.json(paginatedUsers);
});

/**
 * Create a new user.
 * @param {Object} user - User data.
 * @returns {Object} Created user.
 */
router.post('/', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

/**
 * Update a user by ID.
 * @param {number} id - User ID.
 * @returns {Object} Updated user.
 */
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found.');

  Object.assign(user, req.body);
  res.json(user);
});

/**
 * Delete a user by ID.
 * @param {number} id - User ID.
 * @returns {string} Success message.
 */
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.send('User deleted successfully.');
});

module.exports = router;
