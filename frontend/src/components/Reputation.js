
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reputation() {
  const [reputation, setReputation] = useState(0);

  useEffect(() => {
    const fetchReputation = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me/reputation', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReputation(response.data.reputation);
      } catch (error) {
        alert('Failed to fetch reputation');
      }
    };
    fetchReputation();
  }, []);

  return (
    <div>
      <h2>Your Reputation</h2>
      <p>{reputation} points</p>
    </div>
  );
}

export default Reputation;
