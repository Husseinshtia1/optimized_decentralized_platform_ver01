
import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', { email });
      setMessage('Password reset email sent');
    } catch (error) {
      setMessage('Failed to send reset email');
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Email</button>
      <p>{message}</p>
    </form>
  );
}

export default PasswordReset;
