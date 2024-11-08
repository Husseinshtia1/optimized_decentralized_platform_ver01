
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User deleted successfully');
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
