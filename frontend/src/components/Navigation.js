
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isAdmin }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default Navigation;
