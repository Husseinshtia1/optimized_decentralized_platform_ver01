
const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, deleteTemplate } = require('../controllers/templateController');

router.route('/').get(getTemplates).post(createTemplate);
router.route('/:id').delete(deleteTemplate);

module.exports = router;
