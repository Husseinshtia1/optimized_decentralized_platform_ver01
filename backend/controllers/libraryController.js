
const Library = require('../models/libraries/Library');

// Get all libraries
const getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find();
        res.json(libraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLibraries };
