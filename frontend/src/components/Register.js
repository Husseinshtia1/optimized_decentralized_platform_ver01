
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password });
      alert('Registration successful');
      window.location.href = '/';
    } catch (error) {
      alert('Registration failed');
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
