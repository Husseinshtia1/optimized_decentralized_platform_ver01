
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function AdminAnalytics() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        alert('Failed to fetch analytics data');
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Admin Analytics</h2>
      <Line data={data} />
    </div>
  );
}

export default AdminAnalytics;
