
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TemplateManagement = () => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await axios.get('/api/templates');
            setTemplates(response.data);
        };
        fetchTemplates();
    }, []);

    const handleAddTemplate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/templates', newTemplate);
            setTemplates([...templates, response.data]);
            setNewTemplate({ name: '', content: '' });
        } catch (error) {
            console.error('Error adding template', error);
        }
    };

    const handleDeleteTemplate = async (id) => {
        try {
            await axios.delete(`/api/templates/${id}`);
            setTemplates(templates.filter(template => template._id !== id));
        } catch (error) {
            console.error('Error deleting template', error);
        }
    };

    return (
        <div>
            <h2>Template Management</h2>
            <form onSubmit={handleAddTemplate}>
                <input
                    type="text"
                    placeholder="Template Name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Template Content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Add Template</button>
            </form>
            <ul>
                {templates.map(template => (
                    <li key={template._id}>
                        <h3>{template.name}</h3>
                        <pre>{template.content}</pre>
                        <button onClick={() => handleDeleteTemplate(template._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateManagement;
