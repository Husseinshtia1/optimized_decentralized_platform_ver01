
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
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

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
