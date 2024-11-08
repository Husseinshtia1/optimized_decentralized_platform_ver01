
// frontend/components/UserManagement.js
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  // Handle new user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Create new user
  const handleCreateUser = async () => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    fetchUsers();
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="user-input">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <button onClick={handleCreateUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
