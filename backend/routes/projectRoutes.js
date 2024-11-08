
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.route('/').get(protect, getProjects).post(protect, createProject);
router
  .route('/:id')
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
