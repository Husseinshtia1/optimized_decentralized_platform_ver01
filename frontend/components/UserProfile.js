
// frontend/components/UserProfile.js
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  // Fetch the user's profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/profiles/${userId}`);
      if (!response.ok) throw new Error('Profile not found');
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Save the updated profile
  const saveProfile = async () => {
    try {
      await fetch(`/api/profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default UserProfile;
