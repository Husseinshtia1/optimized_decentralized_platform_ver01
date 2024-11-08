
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        alert('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
