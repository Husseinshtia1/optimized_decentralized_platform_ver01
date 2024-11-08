
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProject() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
        setCode(response.data.code);
      } catch (error) {
        alert('Failed to fetch project details');
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/projects/${id}`,
        { name, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Project updated successfully');
      navigate('/projects');
    } catch (error) {
      alert('Failed to update project');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Project</h2>
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
      <button type="submit">Update Project</button>
    </form>
  );
}

export default EditProject;
