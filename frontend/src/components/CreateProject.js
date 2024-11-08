
import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/projects',
        { name, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Project created successfully');
    } catch (error) {
      alert('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleCreateProject}>
      <h2>Create New Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Project Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProject;
