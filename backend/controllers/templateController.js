
const Template = require('../models/templates/Template');

// Get all templates
const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new template
const createTemplate = async (req, res) => {
    const { name, content } = req.body;
    const template = new Template({ name, content });
    
    try {
        const savedTemplate = await template.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a template by ID
const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTemplate = await Template.findByIdAndDelete(id);
        if (!deletedTemplate) return res.status(404).json({ message: 'Template not found' });
        res.json({ message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTemplates, createTemplate, deleteTemplate };
