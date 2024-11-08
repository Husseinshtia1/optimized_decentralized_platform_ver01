
// frontend/components/Analytics.js
import React, { useEffect, useState } from 'react';

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchData = async () => {
      const analyticsData = [
        { id: 1, metric: 'Users', value: 120 },
        { id: 2, metric: 'Revenue', value: '$4500' },
        { id: 3, metric: 'New Signups', value: 30 },
      ];
      setData(analyticsData);
    };
    fetchData();
  }, []);

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.metric}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
