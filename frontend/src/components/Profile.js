
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert('Failed to load user profile');
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
    </div>
  );
}

export default Profile;
