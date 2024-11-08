
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/code-generator">AI Code Generator</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
