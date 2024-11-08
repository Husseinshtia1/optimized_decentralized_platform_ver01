
const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Template', TemplateSchema);
