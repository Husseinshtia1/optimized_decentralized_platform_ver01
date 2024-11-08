
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (error) {
        alert('Failed to load user profile');
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        '/api/users/me',
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Profile</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateProfile;
