
const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String },
    repository: { type: String },
});

module.exports = mongoose.model('Library', LibrarySchema);
